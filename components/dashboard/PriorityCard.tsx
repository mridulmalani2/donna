import Link from "next/link";
import { ClientSummary } from "@/lib/data/types";
import { formatCurrency, formatDate } from "@/lib/data/clients";

interface PriorityCardProps {
  client: ClientSummary;
  variant?: "featured" | "compact";
}

export default function PriorityCard({ client, variant = "compact" }: PriorityCardProps) {
  const isFeatured = variant === "featured";

  if (isFeatured) {
    return (
      <Link href={`/client/${client.id}`}>
        <div className="relative bg-depth-2 rounded-lg p-8 transition-smooth cursor-pointer hover:bg-donna-bg-tertiary group">
          {/* Subtle glow border */}
          <div className="absolute inset-0 rounded-lg soft-border-cyan opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none"></div>

          <div className="flex items-start gap-6">
            {/* Large Avatar */}
            {client.photo && (
              <div className="relative flex-shrink-0">
                <div className="w-24 h-24 rounded-full overflow-hidden soft-border-cyan glow-cyan">
                  <img
                    src={client.photo}
                    alt={client.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {client.panicIndicator && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-donna-red rounded-full animate-pulse glow-red"></div>
                )}
              </div>
            )}

            {/* Client Info */}
            <div className="flex-grow">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-heading text-3xl font-semibold text-donna-text-primary mb-2 flex items-center gap-3">
                    {client.name}
                    {client.panicIndicator && (
                      <span className="font-heading text-xs uppercase tracking-wider px-3 py-1 bg-donna-red/20 text-donna-red rounded-full">
                        PANIC
                      </span>
                    )}
                  </h2>
                  <p className="font-body text-sm text-donna-text-secondary mb-1">
                    {client.profession}
                  </p>
                </div>

                {/* Large Priority Score */}
                <div className="text-right">
                  <div className="font-heading text-6xl font-bold text-donna-cyan glow-cyan-strong">
                    {client.priorityScore}
                  </div>
                  <div className="font-heading text-xs uppercase tracking-wider text-donna-text-tertiary mt-1">
                    Priority
                  </div>
                </div>
              </div>

              {/* Stats Row */}
              <div className="flex items-center gap-8 mt-6">
                <div>
                  <div className="font-heading text-xs uppercase tracking-wider text-donna-text-tertiary mb-1">
                    AUM
                  </div>
                  <div className="font-heading text-xl font-semibold text-donna-text-primary">
                    {formatCurrency(client.totalAUM)}
                  </div>
                </div>
                <div>
                  <div className="font-heading text-xs uppercase tracking-wider text-donna-text-tertiary mb-1">
                    Last Contact
                  </div>
                  <div className="font-body text-sm text-donna-text-secondary">
                    {formatDate(client.lastContactDate)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Compact variant
  return (
    <Link href={`/client/${client.id}`}>
      <div className="relative bg-donna-bg-secondary/50 rounded-lg p-4 transition-smooth cursor-pointer hover:bg-donna-bg-tertiary group">
        {/* Subtle left accent on hover */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-donna-cyan opacity-0 group-hover:opacity-100 transition-smooth rounded-l-lg"></div>

        <div className="flex items-center gap-4">
          {/* Compact Avatar */}
          {client.photo && (
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 rounded-full overflow-hidden soft-border-cyan">
                <img
                  src={client.photo}
                  alt={client.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {client.panicIndicator && (
                <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-donna-red rounded-full"></div>
              )}
            </div>
          )}

          {/* Client Info */}
          <div className="flex-grow min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-heading text-base font-medium text-donna-text-primary truncate">
                {client.name}
              </h3>
              {client.panicIndicator && (
                <span className="font-heading text-xs uppercase text-donna-red">
                  PANIC
                </span>
              )}
            </div>
            <p className="font-body text-xs text-donna-text-secondary truncate">
              {client.profession}
            </p>
          </div>

          {/* Priority Score */}
          <div className="text-right flex-shrink-0">
            <div className="font-heading text-2xl font-bold text-donna-cyan">
              {client.priorityScore}
            </div>
          </div>
        </div>

        {/* Additional Info Row */}
        <div className="flex items-center gap-6 mt-3 pt-3 border-t border-donna-text-tertiary/10">
          <div className="flex-1">
            <div className="font-body text-xs text-donna-text-tertiary">
              {formatCurrency(client.totalAUM)}
            </div>
          </div>
          <div className="flex-shrink-0">
            <div className="font-body text-xs text-donna-text-tertiary">
              {formatDate(client.lastContactDate)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
