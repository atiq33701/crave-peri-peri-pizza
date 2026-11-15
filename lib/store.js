// Order storage.
//   - MongoDB: set MONGODB_URI (and optionally MONGODB_DB, default "crave"). Works on Vercel
//     with a free MongoDB Atlas cluster. Orders go in the "orders" collection.
//   - On the live site: set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN
//     (or KV_REST_API_URL and KV_REST_API_TOKEN from Vercel's storage tab).
//   - While developing on your own computer: orders are saved to .data/orders.json.
// Serverless hosts (like Vercel) cannot keep files, so the live site needs the first option.

import fs from "fs";
import path from "path";

function redisConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return url && token ? { url, token } : null;
}

function mongoConfigured() {
  return Boolean(process.env.MONGODB_URI);
}

export function storeMode() {
  if (mongoConfigured()) return "mongodb";
  return redisConfig() ? "redis" : "file";
}

// One shared connection, reused between requests (important on serverless hosts).
async function mongoOrders() {
  if (!globalThis._craveMongo) {
    const { MongoClient } = await import("mongodb");
    const client = new MongoClient(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 8000 });
    globalThis._craveMongo = client.connect().then((c) => {
      const col = c.db(process.env.MONGODB_DB || "crave").collection("orders");
      col.createIndex({ createdAt: -1 }).catch(() => {});
      return col;
    });
    globalThis._craveMongo.catch(() => {
      globalThis._craveMongo = null;
    });
  }
  return globalThis._craveMongo;
}

const fromMongo = (doc) => {
  if (!doc) return null;
  const { _id, ...rest } = doc;
  return rest;
};

async function redis(commands) {
  const { url, token } = redisConfig();
  const response = await fetch(`${url}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(commands),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Order database error (${response.status})`);
  const results = await response.json();
  return results.map((r) => {
    if (r.error) throw new Error(r.error);
    return r.result;
  });
}

const FILE = path.join(process.cwd(), ".data", "orders.json");

function readFile() {
  try {
    return JSON.parse(fs.readFileSync(FILE, "utf8"));
  } catch {
    return {};
  }
}

function writeFile(data) {
  fs.mkdirSync(path.dirname(FILE), { recursive: true });
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

export async function saveOrder(order) {
  if (mongoConfigured()) {
    const col = await mongoOrders();
    await col.insertOne({ _id: order.id, ...order });
    return order;
  }
  if (redisConfig()) {
    await redis([
      ["SET", `order:${order.id}`, JSON.stringify(order)],
      ["LPUSH", "orders", order.id],
    ]);
    return order;
  }
  const data = readFile();
  data[order.id] = order;
  writeFile(data);
  return order;
}

export async function getOrder(id) {
  if (!/^[a-f0-9]{24}$/.test(String(id))) return null;
  if (mongoConfigured()) {
    const col = await mongoOrders();
    return fromMongo(await col.findOne({ _id: String(id) }));
  }
  if (redisConfig()) {
    const [raw] = await redis([["GET", `order:${id}`]]);
    return raw ? JSON.parse(raw) : null;
  }
  return readFile()[id] || null;
}

export async function listOrders(limit = 100) {
  if (mongoConfigured()) {
    const col = await mongoOrders();
    const docs = await col.find({}).sort({ createdAt: -1 }).limit(limit).toArray();
    return docs.map(fromMongo);
  }
  if (redisConfig()) {
    const [ids] = await redis([["LRANGE", "orders", 0, limit - 1]]);
    if (!ids || ids.length === 0) return [];
    const results = await redis(ids.map((id) => ["GET", `order:${id}`]));
    return results.filter(Boolean).map((raw) => JSON.parse(raw));
  }
  return Object.values(readFile())
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, limit);
}

export async function updateOrder(id, patch) {
  const order = await getOrder(id);
  if (!order) return null;
  const updated = { ...order, ...patch, updatedAt: new Date().toISOString() };
  if (mongoConfigured()) {
    const col = await mongoOrders();
    await col.replaceOne({ _id: String(id) }, { _id: String(id), ...updated });
  } else if (redisConfig()) {
    await redis([["SET", `order:${id}`, JSON.stringify(updated)]]);
  } else {
    const data = readFile();
    data[id] = updated;
    writeFile(data);
  }
  return updated;
}
