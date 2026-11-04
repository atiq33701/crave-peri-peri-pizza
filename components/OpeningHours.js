import { site } from "@/app/site";

export default function OpeningHours() {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-neutral-700 text-white">
          <tr>
            <th className="px-4 py-3 font-semibold">Day</th>
            <th className="px-4 py-3 font-semibold">Opening Hours</th>
          </tr>
        </thead>
        <tbody>
          {site.hours.map((row) => (
            <tr key={row.day} className="border-t border-neutral-200">
              <td className="px-4 py-3 font-semibold">{row.day}</td>
              <td className="px-4 py-3">{row.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
