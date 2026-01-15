"use client";

import { useState } from "react";
import { ClientSummary } from "@/lib/data/types";
import PriorityCard from "./PriorityCard";
import { useTranslation } from "@/lib/context/LanguageContext";

interface ClientListProps {
  clients: ClientSummary[];
}

export default function ClientList({ clients }: ClientListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPanic, setFilterPanic] = useState<boolean | null>(null);
  const { t } = useTranslation();

  const filteredClients = clients.filter((client) => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPanic = filterPanic === null || client.panicIndicator === filterPanic;
    return matchesSearch && matchesPanic;
  });

  const featuredClient = filteredClients[0]; // Highest priority
  const otherClients = filteredClients.slice(1);

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder={t.searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-3 bg-donna-bg-secondary/50 soft-border-cyan rounded-lg
                     font-body text-donna-text-primary placeholder-donna-text-tertiary
                     focus:outline-none focus:bg-donna-bg-tertiary transition-smooth"
        />
        <div className="flex gap-2">
          <button
            onClick={() => setFilterPanic(null)}
            className={`px-4 py-2 rounded-lg font-heading font-medium transition-smooth ${
              filterPanic === null
                ? "bg-donna-cyan text-donna-bg-primary"
                : "bg-donna-bg-secondary text-donna-text-secondary hover:bg-donna-bg-tertiary"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterPanic(true)}
            className={`px-4 py-2 rounded-lg font-heading font-medium transition-smooth flex items-center gap-2 ${
              filterPanic === true
                ? "bg-donna-cyan text-donna-bg-primary"
                : "bg-donna-bg-secondary text-donna-text-secondary hover:bg-donna-bg-tertiary"
            }`}
          >
            <span className="w-2 h-2 bg-donna-red rounded-full"></span>
            Panic
          </button>
          <button
            onClick={() => setFilterPanic(false)}
            className={`px-4 py-2 rounded-lg font-heading font-medium transition-smooth ${
              filterPanic === false
                ? "bg-donna-cyan text-donna-bg-primary"
                : "bg-donna-bg-secondary text-donna-text-secondary hover:bg-donna-bg-tertiary"
            }`}
          >
            Stable
          </button>
        </div>
      </div>

      {/* Results count */}
      <div className="font-body text-sm text-donna-text-tertiary">
        Showing {filteredClients.length} of {clients.length} clients
      </div>

      {filteredClients.length === 0 ? (
        <div className="text-center py-16 font-body text-donna-text-secondary">
          No clients found matching your criteria
        </div>
      ) : (
        <div className="space-y-6">
          {/* Featured Client - Takes up significant visual space */}
          {featuredClient && (
            <div className="mb-8">
              <h3 className="font-heading text-xs uppercase tracking-wider text-donna-text-tertiary mb-4">
                Highest Priority
              </h3>
              <PriorityCard client={featuredClient} variant="featured" />
            </div>
          )}

          {/* Other Clients - Compact list */}
          {otherClients.length > 0 && (
            <div>
              <h3 className="font-heading text-xs uppercase tracking-wider text-donna-text-tertiary mb-4">
                Other Clients
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {otherClients.map((client) => (
                  <PriorityCard key={client.id} client={client} variant="compact" />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
