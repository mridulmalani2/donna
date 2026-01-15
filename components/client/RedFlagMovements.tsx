import { RedFlagMovement } from "@/lib/data/types";
import { formatDate } from "@/lib/data/clients";

interface RedFlagMovementsProps {
  movements?: RedFlagMovement[];
}

export default function RedFlagMovements({ movements }: RedFlagMovementsProps) {
  if (!movements || movements.length === 0) {
    return null;
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  return (
    <div className="bg-white rounded-lg border border-red-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
        <h2 className="text-xl font-semibold text-red-900">Red-Flag Asset Movements</h2>
      </div>
      <div className="space-y-4">
        {movements.map((movement, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border ${getSeverityColor(movement.severity)}`}
          >
            <div className="flex items-start justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wide">
                {movement.severity} Severity
              </span>
              <span className="text-xs opacity-75">{formatDate(movement.date)}</span>
            </div>
            <p className="text-sm font-medium mb-2">{movement.description}</p>
            {movement.impact && (
              <p className="text-xs opacity-75">
                <strong>Impact:</strong> {movement.impact}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
