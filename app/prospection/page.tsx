'use client';

import Link from 'next/link';
import { useState } from 'react';
import { getAllClientsSummary } from "@/lib/data/clients";
import { getClientById } from "@/lib/data/clients";
import { NetworkConnection } from "@/lib/data/types";

interface ProspectionOpportunity extends NetworkConnection {
  sourceClientId: string;
  sourceClientName: string;
}

export default function ProspectionPage() {
  const [selectedOpportunity, setSelectedOpportunity] = useState<ProspectionOpportunity | null>(null);

  // Gather all prospection opportunities from all clients
  const allClients = getAllClientsSummary();
  const opportunities: ProspectionOpportunity[] = [];

  allClients.forEach(clientSummary => {
    const fullClient = getClientById(clientSummary.id);
    if (fullClient?.prospectionNetwork) {
      fullClient.prospectionNetwork.connections.forEach(connection => {
        opportunities.push({
          ...connection,
          sourceClientId: fullClient.id,
          sourceClientName: fullClient.name,
        });
      });
    }
  });

  // Sort by connection strength (highest first)
  opportunities.sort((a, b) => b.connectionStrength - a.connectionStrength);

  return (
    <div className="min-h-screen bg-donna-bg-primary">
      {/* Header */}
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
                  Prospection
                </h1>
                <p className="font-body text-sm text-donna-text-tertiary mt-0.5">
                  Active Referral Opportunities
                </p>
              </div>
            </div>
            <div className="font-body text-sm text-donna-text-secondary">
              <span className="font-heading font-semibold text-donna-cyan">{opportunities.length}</span> opportunities
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-screen-2xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Opportunities List */}
          <div className="lg:col-span-2 space-y-3">
            {opportunities.map((opportunity) => {
              const isSelected = selectedOpportunity?.id === opportunity.id;

              return (
                <button
                  key={`${opportunity.sourceClientId}-${opportunity.id}`}
                  onClick={() => setSelectedOpportunity(isSelected ? null : opportunity)}
                  className={`w-full text-left bg-donna-bg-secondary/20 hover:bg-donna-bg-secondary/40 rounded-lg border transition-smooth p-6 ${
                    isSelected
                      ? 'border-donna-cyan/50 glow-cyan'
                      : 'border-donna-text-tertiary/20 hover:border-donna-cyan/30'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-heading text-lg font-semibold text-donna-text-primary">
                          {opportunity.name}
                        </h3>
                        {/* Connection Strength */}
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-20 bg-donna-bg-tertiary rounded-full overflow-hidden">
                            <div
                              className="h-full bg-donna-cyan rounded-full"
                              style={{ width: `${opportunity.connectionStrength * 10}%` }}
                            />
                          </div>
                          <span className="font-heading text-xs font-medium text-donna-cyan">
                            {opportunity.connectionStrength}/10
                          </span>
                        </div>
                      </div>
                      <p className="font-body text-sm text-donna-text-secondary mb-1">
                        {opportunity.role}
                      </p>
                      <p className="font-body text-xs text-donna-text-tertiary">
                        <span className="font-heading font-medium">Source:</span>{' '}
                        <Link
                          href={`/client/${opportunity.sourceClientId}`}
                          className="text-donna-cyan hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {opportunity.sourceClientName}
                        </Link>
                        {' '}({opportunity.relationshipToClient})
                      </p>
                    </div>
                    <svg
                      className={`w-5 h-5 text-donna-text-tertiary flex-shrink-0 transition-transform ${
                        isSelected ? 'rotate-90' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>

                  {/* Trigger Event - Why Now */}
                  {opportunity.triggerEvent && (
                    <div className="p-3 bg-donna-cyan/5 border border-donna-cyan/20 rounded mb-3">
                      <p className="font-heading text-xs uppercase tracking-wide text-donna-cyan mb-1">
                        Why Now
                      </p>
                      <p className="font-body text-xs text-donna-text-secondary leading-relaxed">
                        {opportunity.triggerEvent}
                      </p>
                    </div>
                  )}

                  {/* Suggested Next Step */}
                  {isSelected && opportunity.suggestedNextStep && (
                    <div className="pt-3 border-t border-donna-text-tertiary/20 mt-3">
                      <p className="font-heading text-xs uppercase tracking-wide text-donna-text-tertiary mb-1">
                        Suggested Action
                      </p>
                      <p className="font-body text-xs text-donna-text-primary leading-relaxed">
                        {opportunity.suggestedNextStep}
                      </p>
                    </div>
                  )}
                </button>
              );
            })}

            {opportunities.length === 0 && (
              <div className="bg-donna-bg-secondary/10 rounded-lg border border-donna-text-tertiary/20 p-12 text-center">
                <p className="font-body text-sm text-donna-text-tertiary">
                  No active prospection opportunities at this time.
                </p>
              </div>
            )}
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 bg-donna-bg-secondary/20 rounded-lg border border-donna-text-tertiary/20 p-6">
              {selectedOpportunity ? (
                <div className="space-y-6">
                  {/* Selected Opportunity Detail */}
                  <div>
                    <p className="font-heading text-xs uppercase tracking-wide text-donna-text-tertiary mb-3">
                      Opportunity Detail
                    </p>
                    <h3 className="font-heading text-xl font-semibold text-donna-text-primary mb-2">
                      {selectedOpportunity.name}
                    </h3>
                    <p className="font-body text-sm text-donna-text-secondary mb-4">
                      {selectedOpportunity.role}
                    </p>
                  </div>

                  {/* Relationship Context */}
                  <div className="pt-4 border-t border-donna-text-tertiary/20">
                    <p className="font-heading text-xs uppercase tracking-wide text-donna-text-tertiary mb-2">
                      Relationship to Client
                    </p>
                    <p className="font-body text-xs text-donna-text-secondary leading-relaxed">
                      {selectedOpportunity.relationshipToClient}
                    </p>
                  </div>

                  {/* Connection Strength */}
                  <div className="pt-4 border-t border-donna-text-tertiary/20">
                    <p className="font-heading text-xs uppercase tracking-wide text-donna-text-tertiary mb-2">
                      Connection Strength
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-donna-bg-tertiary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-donna-cyan rounded-full"
                          style={{ width: `${selectedOpportunity.connectionStrength * 10}%` }}
                        />
                      </div>
                      <span className="font-heading text-sm font-semibold text-donna-cyan">
                        {selectedOpportunity.connectionStrength}/10
                      </span>
                    </div>
                  </div>

                  {/* Source Client */}
                  <div className="pt-4 border-t border-donna-text-tertiary/20">
                    <p className="font-heading text-xs uppercase tracking-wide text-donna-text-tertiary mb-2">
                      Source Client
                    </p>
                    <Link
                      href={`/client/${selectedOpportunity.sourceClientId}`}
                      className="font-body text-sm text-donna-cyan hover:underline"
                    >
                      {selectedOpportunity.sourceClientName}
                    </Link>
                  </div>

                  {/* Governance Note */}
                  <div className="pt-4 border-t border-donna-text-tertiary/20">
                    <div className="p-3 bg-amber-500/5 border border-amber-500/20 rounded">
                      <p className="font-body text-xs text-amber-200/80 leading-relaxed">
                        <span className="font-heading font-semibold">Consent Required:</span> Client approval must be obtained before any outreach.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <svg className="w-12 h-12 text-donna-text-tertiary/40 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <p className="font-body text-xs text-donna-text-tertiary leading-relaxed">
                    Select an opportunity to view details
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Guardrail */}
        <div className="mt-12 pt-6 border-t border-donna-text-tertiary/20">
          <p className="font-body text-xs text-donna-text-tertiary text-center">
            All opportunities represent existing client network relationships. No outreach occurs without explicit client consent.
          </p>
        </div>
      </div>
    </div>
  );
}
