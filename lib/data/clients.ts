import { Client, ClientSummary, ChatbotQA } from "./types";
import clientsData from "../mock/clients.json";
import chatbotData from "../mock/chatbot.json";

// Type assertions for imported JSON data
// Using any here because shallow clients have different structure than full clients
const clients = clientsData as (Client | Record<string, unknown>)[];
const chatbotQA = chatbotData as Record<string, ChatbotQA[]>;

/**
 * Get all clients with summary data only, sorted by priority score (descending)
 */
export function getAllClientsSummary(): ClientSummary[] {
  return clients
    .map((client: Client | Record<string, unknown>) => {
      const clientAny = client as Record<string, unknown>;
      return {
        id: clientAny.id as string,
        name: clientAny.name as string,
        photo: clientAny.photo as string | undefined,
        priorityScore: clientAny.priorityScore as number,
        panicIndicator: clientAny.panicIndicator as boolean,
        totalAUM: ((clientAny.assets as { totalAUM?: number })?.totalAUM || clientAny.totalAUM || 0) as number,
        lastContactDate: clientAny.lastContactDate as string,
        profession: clientAny.profession as string,
      };
    })
    .sort((a, b) => b.priorityScore - a.priorityScore);
}

/**
 * Get a specific client by ID with full details
 */
export function getClientById(id: string): Client | null {
  const clientAny = clients.find((c) => (c as Record<string, unknown>).id === id);
  return (clientAny as Client) || null;
}

/**
 * Get chatbot Q&A pairs for a specific client
 */
export function getChatbotQA(clientId: string): ChatbotQA[] {
  return chatbotQA[clientId] || [];
}

/**
 * Get clients filtered by panic indicator
 */
export function getClientsByPanicStatus(hasPanic: boolean): ClientSummary[] {
  return getAllClientsSummary().filter(
    (client) => client.panicIndicator === hasPanic
  );
}

/**
 * Get top N priority clients
 */
export function getTopPriorityClients(count: number): ClientSummary[] {
  return getAllClientsSummary().slice(0, count);
}

/**
 * Search clients by name
 */
export function searchClientsByName(query: string): ClientSummary[] {
  const lowerQuery = query.toLowerCase();
  return getAllClientsSummary().filter((client) =>
    client.name.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get client statistics
 */
export function getClientStats() {
  const allClients = getAllClientsSummary();
  const totalAUM = allClients.reduce((sum, client) => sum + client.totalAUM, 0);
  const panicClients = allClients.filter((c) => c.panicIndicator).length;
  const avgPriorityScore =
    allClients.reduce((sum, client) => sum + client.priorityScore, 0) /
    allClients.length;

  return {
    totalClients: allClients.length,
    totalAUM,
    panicClients,
    avgPriorityScore: Math.round(avgPriorityScore),
  };
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number): string {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  } else if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(0)}K`;
  }
  return `$${amount.toFixed(0)}`;
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Get relative time description
 */
export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "in the future";
  if (diffDays === 0) return "today";
  if (diffDays === 1) return "1 day ago";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 14) return "1 week ago";
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 60) return "1 month ago";
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;

  return `${Math.floor(diffDays / 365)} year${
    Math.floor(diffDays / 365) > 1 ? "s" : ""
  } ago`;
}
