import { Client } from "@/lib/data/types";

interface HeaderProps {
  client: Client;
}

export default function Header({ client }: HeaderProps) {
  const priorityLevel = client.priorityScore >= 80 ? "high" : client.priorityScore >= 60 ? "medium" : "low";

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-8">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-6">
          {client.photo && (
            <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-200">
              <img
                src={client.photo}
                alt={client.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-slate-900">{client.name}</h1>
              {client.panicIndicator && (
                <div className="flex items-center gap-2 bg-red-50 px-3 py-1 rounded-full">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  <span className="text-sm font-medium text-red-700">Panic Indicator</span>
                </div>
              )}
            </div>
            <p className="text-lg text-slate-600 mb-1">{client.profession}</p>
            <p className="text-sm text-slate-500">
              Age {client.age} • {client.relationshipDuration} year{client.relationshipDuration !== 1 ? "s" : ""} relationship
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-3 justify-end mb-1">
            <span className="text-4xl font-bold text-navy">{client.priorityScore}</span>
            <div className={`w-4 h-4 rounded-full ${
              priorityLevel === "high" ? "bg-red-500" :
              priorityLevel === "medium" ? "bg-yellow-500" :
              "bg-green-500"
            }`}></div>
          </div>
          <p className="text-sm text-slate-500">Priority Score</p>
        </div>
      </div>

      {/* Advisory Disclaimer */}
      <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
        <p className="text-xs text-slate-600 leading-relaxed">
          <strong>Advisory Notice:</strong> This intelligence file is for informational purposes only. All recommendations are advisory in nature. Final investment decisions and client communications remain the sole responsibility of the assigned wealth manager. This tool does not execute trades or contact clients directly.
        </p>
      </div>
    </div>
  );
}
