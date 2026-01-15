import { Client } from "@/lib/data/types";

interface HeaderProps {
  client: Client;
}

export default function Header({ client }: HeaderProps) {
  return (
    <div className="flex items-start gap-8 mb-8">
      {/* Client Header Zone - LEFT ~65% */}
      <div className="flex items-start gap-6 flex-grow">
        {/* Large Portrait */}
        {client.photo && (
          <div className="relative flex-shrink-0">
            <div className="w-36 h-36 rounded-full overflow-hidden soft-border-cyan glow-cyan">
              <img
                src={client.photo}
                alt={client.name}
                className="w-full h-full object-cover"
              />
            </div>
            {client.panicIndicator && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-donna-red rounded-full animate-pulse glow-red"></div>
            )}
          </div>
        )}

        {/* Client Information */}
        <div className="flex-grow pt-2">
          <h1 className="font-heading text-4xl font-semibold text-donna-text-primary mb-3">
            {client.name}
          </h1>
          <p className="font-body text-base text-donna-text-secondary mb-2">
            {client.profession}
          </p>
          <p className="font-body text-sm text-donna-text-tertiary">
            Age {client.age} • {client.relationshipDuration} year{client.relationshipDuration !== 1 ? "s" : ""} relationship
          </p>
        </div>
      </div>

      {/* Priority Score Block - RIGHT ~35% */}
      <div className="flex-shrink-0 text-right pt-2">
        {/* Large Priority Score - The system verdict */}
        <div className="mb-2">
          <div className="font-heading text-7xl font-bold text-donna-cyan glow-cyan-strong leading-none">
            {client.priorityScore}
          </div>
          <div className="font-heading text-xs uppercase tracking-wider text-donna-text-tertiary mt-3">
            Priority Score
          </div>
        </div>

        {/* Panic Indicator if active */}
        {client.panicIndicator && (
          <div className="mt-4 flex items-center justify-end gap-2">
            <div className="w-2 h-2 bg-donna-red rounded-full animate-pulse"></div>
            <span className="font-heading text-sm uppercase tracking-wide text-donna-red">
              PANIC
            </span>
          </div>
        )}

        {/* Advisory subtext */}
        <div className="mt-6 font-body text-xs text-donna-text-tertiary leading-relaxed">
          Advisory only. Not directive.
        </div>
      </div>
    </div>
  );
}
