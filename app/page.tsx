'use client';

import Link from 'next/link';
import LanguageToggle from "@/components/LanguageToggle";
import { useTranslation } from "@/lib/context/LanguageContext";

export default function LandingPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-donna-bg-primary flex flex-col">
      {/* Header - Minimal */}
      <header className="px-8 py-6 border-b border-donna-text-tertiary/10">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl font-semibold text-donna-text-primary">
              {t.appName}
            </h1>
            <p className="font-body text-xs text-donna-text-tertiary mt-1">
              {t.appSubtitle}
            </p>
          </div>
          <LanguageToggle />
        </div>
      </header>

      {/* Main Action Zones */}
      <main className="flex-1 flex items-center justify-center px-8 py-16">
        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* 1. MANAGE CLIENTS - Primary, Largest */}
            <Link
              href="/clients"
              className="lg:col-span-2 group relative bg-donna-bg-secondary/20 hover:bg-donna-bg-secondary/40 border border-donna-text-tertiary/20 hover:border-donna-cyan/30 rounded-lg p-12 transition-smooth overflow-hidden"
            >
              {/* Subtle background pattern */}
              <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-donna-cyan to-transparent pointer-events-none" />

              <div className="relative z-10">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-donna-cyan/10 mb-4">
                    <svg className="w-7 h-7 text-donna-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h2 className="font-heading text-3xl font-semibold text-donna-text-primary mb-3">
                    Manage Clients
                  </h2>
                  <p className="font-body text-sm text-donna-text-secondary">
                    View, prioritise, and act on your client base.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-donna-cyan font-heading text-sm group-hover:gap-3 transition-all">
                  <span>Open Dashboard</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* 2. PROSPECTION - Dynamic, Opportunity-focused */}
            <Link
              href="/prospection"
              className="group relative bg-gradient-to-br from-donna-bg-secondary/30 to-donna-bg-secondary/10 hover:from-donna-bg-secondary/50 hover:to-donna-bg-secondary/30 border border-donna-text-tertiary/20 hover:border-donna-cyan/40 rounded-lg p-10 transition-smooth overflow-hidden"
            >
              {/* Animated gradient hint */}
              <div className="absolute inset-0 bg-gradient-to-br from-donna-cyan/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              <div className="relative z-10">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-donna-cyan/15 mb-4">
                    <svg className="w-6 h-6 text-donna-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h2 className="font-heading text-2xl font-semibold text-donna-text-primary mb-3">
                    Prospection
                  </h2>
                  <p className="font-body text-xs text-donna-text-secondary leading-relaxed">
                    Active referral opportunities from your client network.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-donna-cyan font-heading text-sm group-hover:gap-3 transition-all">
                  <span>View Opportunities</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* 3. CRM - Neutral, Operational */}
            <Link
              href="/crm"
              className="lg:col-span-3 group relative bg-donna-bg-secondary/10 hover:bg-donna-bg-secondary/25 border border-donna-text-tertiary/15 hover:border-donna-text-tertiary/30 rounded-lg p-10 transition-smooth"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-donna-text-tertiary/10">
                    <svg className="w-6 h-6 text-donna-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="font-heading text-2xl font-semibold text-donna-text-primary mb-2">
                      CRM
                    </h2>
                    <p className="font-body text-xs text-donna-text-tertiary">
                      Relationship records, notes, and interaction history.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-donna-text-secondary group-hover:text-donna-text-primary font-heading text-sm group-hover:gap-3 transition-all">
                  <span>Open CRM</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

          </div>
        </div>
      </main>

      {/* Footer - Minimal */}
      <footer className="px-8 py-4 border-t border-donna-text-tertiary/10">
        <div className="max-w-screen-xl mx-auto">
          <p className="font-body text-xs text-donna-text-tertiary text-center">
            Private Wealth Management Intelligence Platform
          </p>
        </div>
      </footer>
    </div>
  );
}
