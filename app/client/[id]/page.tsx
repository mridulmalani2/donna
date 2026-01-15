'use client';

import { notFound } from "next/navigation";
import Link from "next/link";
import { getClientById, getChatbotQA } from "@/lib/data/clients";
import Header from "@/components/client/Header";
import AdvisoryDisclaimer from "@/components/client/AdvisoryDisclaimer";
import Snapshot from "@/components/client/Snapshot";
import Chatbot from "@/components/client/Chatbot";
import ProspectionNetwork from "@/components/client/ProspectionNetwork";
import LanguageToggle from "@/components/LanguageToggle";
import { useTranslation } from "@/lib/context/LanguageContext";
import { use } from "react";

interface ClientPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ClientPage({ params }: ClientPageProps) {
  const { id } = use(params);
  const client = getClientById(id);
  const { t } = useTranslation();

  if (!client) {
    notFound();
  }

  const chatbotQA = getChatbotQA(id);

  return (
    <div className="min-h-screen bg-donna-bg-primary">
      {/* Header Bar */}
      <header className="bg-donna-bg-secondary/30 backdrop-blur-sm border-b border-donna-text-tertiary/10">
        <div className="max-w-screen-2xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-donna-cyan hover:text-donna-text-primary transition-smooth"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </Link>
              <div>
                <h1 className="font-heading text-lg font-semibold text-donna-text-primary">
                  {t.appName}
                </h1>
                <p className="font-body text-xs text-donna-text-tertiary">
                  {t.appSubtitle}
                </p>
              </div>
            </div>
            <LanguageToggle />
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <div className="max-w-screen-2xl mx-auto px-8 py-8">
        {/* Client Header Zone (Photo, Name, Priority Score) */}
        <Header client={client} />

        {/* Advisory Disclaimer Strip */}
        <AdvisoryDisclaimer />

        {/* Two-Column Layout: Main Content + Assistant */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main Content Area - LEFT ~65% */}
          <div className="lg:col-span-2">
            <Snapshot client={client} />
          </div>

          {/* Assistant Panel - RIGHT ~35% */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Chatbot clientId={id} clientName={client.name} chatbotQA={chatbotQA} />
            </div>
          </div>
        </div>

        {/* Prospection Network - BOTTOM ZONE - FULL WIDTH */}
        <div className="mt-16">
          <ProspectionNetwork client={client} />
        </div>
      </div>
    </div>
  );
}
