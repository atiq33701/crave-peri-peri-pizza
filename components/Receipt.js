import { formatPence } from "@/lib/menuData";

// Receipt layout for printing (fits an 80mm receipt printer).
export default function Receipt({ order }) {
  const when = new Date(order.createdAt).toLocaleString("en-GB", { timeZone: "Europe/London", dateStyle: "short", timeStyle: "short" });
  return (
    <div style={{ width: "76mm", fontFamily: "monospace", fontSize: "12px", color: "#000", lineHeight: 1.35 }}>
      <div style={{ textAlign: "center", fontWeight: "bold", fontSize: "16px" }}>CRAVE</div>
      <div style={{ textAlign: "center" }}>45a Leeming St, Mansfield NG18 1NB</div>
      <div style={{ textAlign: "center" }}>01623 761144</div>
      <hr style={{ border: 0, borderTop: "1px dashed #000", margin: "6px 0" }} />
      <div style={{ fontWeight: "bold", fontSize: "15px" }}>{order.number} - {order.fulfilment === "delivery" ? "DELIVERY" : "COLLECTION"}</div>
      <div>{when}</div>
      <hr style={{ border: 0, borderTop: "1px dashed #000", margin: "6px 0" }} />
      {order.lines.map((line, index) => {
        const groups = {};
        for (const opt of line.options) (groups[opt.group] ||= []).push(opt.label);
        return (
          <div key={index} style={{ marginBottom: "5px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
              <span>{line.qty} x {line.name}</span>
              <span>{formatPence(line.lineTotalPence)}</span>
            </div>
            {Object.entries(groups).map(([group, labels]) => (
              <div key={group} style={{ paddingLeft: "8px" }}>{group}: {labels.join(", ")}</div>
            ))}
          </div>
        );
      })}
      <hr style={{ border: 0, borderTop: "1px dashed #000", margin: "6px 0" }} />
      <div style={{ display: "flex", justifyContent: "space-between" }}><span>Subtotal</span><span>{formatPence(order.subtotalPence)}</span></div>
      {order.deliveryFeePence > 0 && <div style={{ display: "flex", justifyContent: "space-between" }}><span>Delivery</span><span>{formatPence(order.deliveryFeePence)}</span></div>}
      <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "15px" }}><span>TOTAL</span><span>{formatPence(order.totalPence)}</span></div>
      <div style={{ fontWeight: "bold", marginTop: "4px" }}>
        {order.payment.method === "card" ? `PAID BY CARD${order.payment.last4 ? ` (**** ${order.payment.last4})` : ""}` : "CASH - COLLECT PAYMENT"}
      </div>
      <hr style={{ border: 0, borderTop: "1px dashed #000", margin: "6px 0" }} />
      <div style={{ fontWeight: "bold" }}>{order.customer.name}</div>
      <div>{order.customer.phone}</div>
      {order.fulfilment === "delivery" && (
        <div>{order.customer.address}, {order.customer.town} {order.customer.postcode}</div>
      )}
      {order.customer.notes && <div style={{ marginTop: "4px" }}>NOTE: {order.customer.notes}</div>}
    </div>
  );
}
