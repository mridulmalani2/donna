import { RedFlagMovement } from "@/lib/data/types";
import { formatDate } from "@/lib/data/clients";

interface RedFlagMovementsProps {
  movements?: RedFlagMovement[];
}

export default function RedFlagMovements({ movements }: RedFlagMovementsProps) {
  if (!movements || movements.length === 0) {
    return null;
  }

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-donna-red/10 border-donna-red/30";
      case "medium":
        return "bg-donna-amber/10 border-donna-amber/30";
      case "low":
        return "bg-donna-blue/10 border-donna-blue/30";
      default:
        return "bg-donna-bg-tertiary border-donna-text-tertiary/20";
    }
  };

  const getSeverityTextColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-donna-red";
      case "medium":
        return "text-donna-amber";
      case "low":
        return "text-donna-blue";
      default:
        return "text-donna-text-secondary";
    }
  };

  return (
    <div className="bg-donna-red/5 rounded-lg p-6 border border-donna-red/20">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 bg-donna-red rounded-full animate-pulse"></div>
        <h2 className="font-heading text-base uppercase tracking-wider text-donna-red">
          Red-Flag Asset Movements
        </h2>
      </div>
      <div className="space-y-3">
        {movements.map((movement, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border ${getSeverityStyles(movement.severity)}`}
          >
            <div className="flex items-start justify-between mb-2">
              <span className={`font-heading text-xs font-semibold uppercase tracking-wide ${getSeverityTextColor(movement.severity)}`}>
                {movement.severity} Severity
              </span>
              <span className="font-body text-xs text-donna-text-tertiary">{formatDate(movement.date)}</span>
            </div>
            <p className="font-body text-sm text-donna-text-primary font-medium mb-2">{movement.description}</p>
            {movement.impact && (
              <p className="font-body text-xs text-donna-text-secondary">
                <strong className="font-heading">Impact:</strong> {movement.impact}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
