'use client';

import Link from 'next/link';

export default function CRMPage() {
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
                  CRM
                </h1>
                <p className="font-body text-sm text-donna-text-tertiary mt-0.5">
                  Relationship Management System
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Placeholder Content */}
      <div className="max-w-screen-2xl mx-auto px-8 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-donna-bg-secondary/20 rounded-lg border border-donna-text-tertiary/20 p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-donna-text-tertiary/10 mb-6">
              <svg className="w-8 h-8 text-donna-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>

            <h2 className="font-heading text-xl font-semibold text-donna-text-primary mb-3">
              CRM Module
            </h2>
            <p className="font-body text-sm text-donna-text-secondary leading-relaxed mb-8">
              Relationship records, notes, and interaction history will be available here.
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-donna-bg-tertiary/30 border border-donna-text-tertiary/20 rounded text-donna-text-tertiary font-body text-xs">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Coming Soon</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
