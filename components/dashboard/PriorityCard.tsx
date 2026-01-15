import Link from "next/link";
import { ClientSummary } from "@/lib/data/types";
import { formatCurrency, formatDate } from "@/lib/data/clients";

interface PriorityCardProps {
  client: ClientSummary;
}

export default function PriorityCard({ client }: PriorityCardProps) {
  const priorityLevel = client.priorityScore >= 80 ? "high" : client.priorityScore >= 60 ? "medium" : "low";

  return (
    <Link href={`/client/${client.id}`}>
      <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            {client.photo && (
              <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-200">
                <img
                  src={client.photo}
                  alt={client.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                {client.name}
                {client.panicIndicator && (
                  <span className="inline-block w-2 h-2 bg-red-500 rounded-full" title="Panic indicator"></span>
                )}
              </h3>
              <p className="text-sm text-slate-600">{client.profession}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 justify-end">
              <span className="text-2xl font-bold text-navy">{client.priorityScore}</span>
              <div className={`w-3 h-3 rounded-full ${
                priorityLevel === "high" ? "bg-red-500" :
                priorityLevel === "medium" ? "bg-yellow-500" :
                "bg-green-500"
              }`}></div>
            </div>
            <p className="text-xs text-slate-500 mt-1">Priority Score</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
          <div>
            <p className="text-xs text-slate-500 mb-1">Assets Under Management</p>
            <p className="text-lg font-semibold text-slate-900">{formatCurrency(client.totalAUM)}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">Last Contact</p>
            <p className="text-sm text-slate-700">{formatDate(client.lastContactDate)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
