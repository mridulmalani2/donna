import { notFound } from "next/navigation";
import Link from "next/link";
import { getClientById, getChatbotQA } from "@/lib/data/clients";
import Snapshot from "@/components/client/Snapshot";
import Chatbot from "@/components/client/Chatbot";

interface ClientPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ClientPage({ params }: ClientPageProps) {
  const { id } = await params;
  const client = getClientById(id);

  if (!client) {
    notFound();
  }

  const chatbotQA = getChatbotQA(id);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-navy hover:text-slate-700 transition-colors"
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
                <h1 className="text-2xl font-bold text-navy">Client Intelligence File</h1>
                <p className="text-sm text-slate-600">Private Wealth Management</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Snapshot - Left Column (2/3 width) */}
          <div className="lg:col-span-2">
            <Snapshot client={client} />
          </div>

          {/* Chatbot - Right Column (1/3 width) */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Chatbot clientId={id} clientName={client.name} chatbotQA={chatbotQA} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
