import { getAllClientsSummary, getClientStats } from "@/lib/data/clients";
import ClientList from "@/components/dashboard/ClientList";

export default function HomePage() {
  const clients = getAllClientsSummary();
  const stats = getClientStats();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-navy">Client Intelligence File</h1>
          <p className="text-slate-600 mt-1">Private Wealth Management</p>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-1">Total Clients</p>
            <p className="text-3xl font-bold text-navy">{stats.totalClients}</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-1">Total AUM</p>
            <p className="text-3xl font-bold text-navy">
              ${(stats.totalAUM / 1000000000).toFixed(2)}B
            </p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-1 flex items-center gap-2">
              Panic Indicators
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            </p>
            <p className="text-3xl font-bold text-red-600">{stats.panicClients}</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-1">Avg Priority Score</p>
            <p className="text-3xl font-bold text-navy">{stats.avgPriorityScore}</p>
          </div>
        </div>

        {/* Priority Dashboard Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">
            Client Prioritization Dashboard
          </h2>
          <p className="text-slate-600">
            Clients sorted by priority score. Focus on high-priority clients with panic indicators.
          </p>
        </div>

        {/* Client List */}
        <ClientList clients={clients} />
      </div>
    </div>
  );
}
