import AdminClient from "./AdminClient";

export const metadata = { title: "Shop Orders", robots: { index: false, follow: false } };

export default function AdminPage() {
  return <AdminClient />;
}
