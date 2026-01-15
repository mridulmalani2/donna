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

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder={t.searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent"
        />
        <div className="flex gap-2">
          <button
            onClick={() => setFilterPanic(null)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterPanic === null
                ? "bg-navy text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterPanic(true)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              filterPanic === true
                ? "bg-navy text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            Panic
          </button>
          <button
            onClick={() => setFilterPanic(false)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterPanic === false
                ? "bg-navy text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Stable
          </button>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-slate-600">
        Showing {filteredClients.length} of {clients.length} clients
      </div>

      {/* Client grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <PriorityCard key={client.id} client={client} />
        ))}
      </div>

      {filteredClients.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          No clients found matching your criteria
        </div>
      )}
    </div>
  );
}
