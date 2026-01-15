'use client';

import Link from 'next/link';
import { getAllClientsSummary, getClientStats } from "@/lib/data/clients";
import ClientList from "@/components/dashboard/ClientList";
import MacroStatsBar from "@/components/dashboard/MacroStatsBar";
import LanguageToggle from "@/components/LanguageToggle";
import { useTranslation } from "@/lib/context/LanguageContext";

export default function ClientsPage() {
  const clients = getAllClientsSummary();
  const stats = getClientStats();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-donna-bg-primary">
      {/* Header Bar */}
      <header className="bg-donna-bg-secondary/30 backdrop-blur-sm border-b border-donna-text-tertiary/10">
        <div className="max-w-screen-2xl mx-auto px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="text-donna-text-tertiary hover:text-donna-cyan transition-smooth"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <div>
                <h1 className="font-heading text-2xl font-semibold text-donna-text-primary">
                  {t.appName}
                </h1>
                <p className="font-body text-sm text-donna-text-tertiary mt-0.5">
                  {t.appSubtitle}
                </p>
              </div>
            </div>
            <LanguageToggle />
          </div>
        </div>
      </header>

      {/* Macro Stats Bar */}
      <MacroStatsBar
        totalClients={stats.totalClients}
        totalAUM={stats.totalAUM}
        panicClients={stats.panicClients}
        avgPriorityScore={stats.avgPriorityScore}
      />

      {/* Main Content Area */}
      <div className="max-w-screen-2xl mx-auto px-8 pb-16">
        {/* Priority Dashboard Section Title */}
        <div className="mb-8">
          <h2 className="font-heading text-xl font-semibold text-donna-text-primary mb-2">
            {t.dashboardTitle}
          </h2>
          <p className="font-body text-sm text-donna-text-secondary">
            {t.dashboardSubtitle}
          </p>
        </div>

        {/* Client Prioritization List */}
        <ClientList clients={clients} />
      </div>
    </div>
  );
}
