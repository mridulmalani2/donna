import { Client } from "@/lib/data/types";

interface HeaderProps {
  client: Client;
}

// Generate a single-sentence "why now" message based on client data
function generateWhyNowMessage(client: Client): string {
  const { panicIndicator, priorityBreakdown, redFlagMovements, communications } = client;

  // Priority 1: Panic indicator
  if (panicIndicator) {
    return "Client showing elevated anxiety requiring immediate attention.";
  }

  // Priority 2: Red flag movements
  if (redFlagMovements && redFlagMovements.length > 0) {
    const highSeverity = redFlagMovements.filter(m => m.severity === "high");
    if (highSeverity.length > 0) {
      return `${highSeverity.length} critical asset movement${highSeverity.length > 1 ? 's' : ''} detected in portfolio.`;
    }
  }

  // Priority 3: Overdue check-in
  if (priorityBreakdown.overdueCheckIn && priorityBreakdown.overdueCheckInDays) {
    return `Check-in overdue by ${priorityBreakdown.overdueCheckInDays} days—relationship at risk.`;
  }

  // Priority 4: Recent negative sentiment
  const recentNegative = communications.slice(0, 3).filter(c => c.sentiment === "negative");
  if (recentNegative.length >= 2) {
    return "Recent communications show negative sentiment trend.";
  }

  // Default: High-value relationship
  return "High-value relationship requiring proactive engagement.";
}

export default function Header({ client }: HeaderProps) {
  const whyNowMessage = generateWhyNowMessage(client);

  return (
    <div className="mb-12 bg-gradient-to-b from-donna-bg-secondary to-transparent rounded-lg border border-donna-cyan/20 p-8 glow-cyan">
      {/* HERO FOCUS ZONE */}
      <div className="flex flex-col items-center text-center gap-6 mb-8">
        {/* Client Photo with Panic Indicator */}
        {client.photo && (
          <div className="relative flex-shrink-0">
            <div className="w-32 h-32 rounded-full overflow-hidden soft-border-cyan glow-cyan">
              <img
                src={client.photo}
                alt={client.name}
                className="w-full h-full object-cover"
              />
            </div>
            {client.panicIndicator && (
              <div className="absolute -top-1 -right-1 w-8 h-8 bg-donna-red rounded-full animate-pulse glow-red border-4 border-donna-bg-primary"></div>
            )}
          </div>
        )}

        {/* Client Name */}
        <h1 className="font-heading text-3xl font-semibold text-donna-text-primary">
          {client.name}
        </h1>

        {/* DOMINANT PRIORITY SCORE */}
        <div className="my-4">
          <div className="font-heading text-9xl font-bold text-donna-cyan glow-cyan-strong leading-none tracking-tight">
            {client.priorityScore}
          </div>
          <div className="font-heading text-xs uppercase tracking-widest text-donna-text-tertiary mt-4">
            Priority Score
          </div>
        </div>

        {/* Panic Indicator Badge */}
        {client.panicIndicator && (
          <div className="flex items-center gap-2 bg-donna-red/10 border border-donna-red/30 rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-donna-red rounded-full animate-pulse"></div>
            <span className="font-heading text-sm uppercase tracking-wide text-donna-red font-semibold">
              PANIC MODE ACTIVE
            </span>
          </div>
        )}

        {/* WHY NOW - Single sentence explanation */}
        <div className="max-w-2xl">
          <p className="font-body text-lg text-donna-text-primary leading-relaxed">
            {whyNowMessage}
          </p>
        </div>
      </div>

      {/* Muted metadata - visually secondary */}
      <div className="flex items-center justify-center gap-6 pt-6 border-t border-donna-text-tertiary/10">
        <span className="font-body text-xs text-donna-text-tertiary">
          {client.profession}
        </span>
        <span className="font-body text-xs text-donna-text-tertiary">•</span>
        <span className="font-body text-xs text-donna-text-tertiary">
          Age {client.age}
        </span>
        <span className="font-body text-xs text-donna-text-tertiary">•</span>
        <span className="font-body text-xs text-donna-text-tertiary">
          {client.relationshipDuration} year{client.relationshipDuration !== 1 ? "s" : ""} relationship
        </span>
      </div>

      {/* Advisory disclaimer - minimized */}
      <div className="mt-4 text-center font-body text-xs text-donna-text-tertiary/60">
        Advisory only. Not directive.
      </div>
    </div>
  );
}
