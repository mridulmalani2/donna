// Core data types for Client Intelligence File application

export interface Client {
  id: string;
  name: string;
  photo?: string;
  age: number;
  profession: string;
  priorityScore: number;
  panicIndicator: boolean;
  relationshipDuration: number; // in years
  contactInfo: ContactInfo;
  priorityBreakdown: PriorityBreakdown;
  assets: Assets;
  redFlagMovements?: RedFlagMovement[];
  communications: Communication[];
  openTopics: OpenTopic[];
  lastContactDate: string; // ISO date string
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: Address;
  preferredContactMethod: "email" | "phone" | "in-person";
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PriorityBreakdown {
  panicSentimentExplanation: string;
  aumLevel: string;
  portfolioMovement: string;
  overdueCheckIn: boolean;
  overdueCheckInDays?: number;
}

export interface Assets {
  totalAUM: number;
  allocation: AssetAllocation;
  recentChange?: AssetChange;
  dominantExposure: string;
}

export interface AssetAllocation {
  equities: number; // percentage
  fixedIncome: number; // percentage
  alternatives: number; // percentage
  cash: number; // percentage
}

export interface AssetChange {
  amount: number;
  percentage: number;
  direction: "increase" | "decrease";
  timeframe: string;
}

export interface RedFlagMovement {
  severity: "high" | "medium" | "low";
  description: string;
  date: string; // ISO date string
  impact?: string;
}

export interface Communication {
  date: string; // ISO date string
  channel: "email" | "phone" | "in-person" | "video-call";
  summary: string;
  fullContent?: string;
  sentiment?: "positive" | "neutral" | "negative";
}

export interface OpenTopic {
  id: string;
  title: string;
  status: "new" | "in-progress" | "pending-client" | "resolved";
  owner: string;
  priority?: "high" | "medium" | "low";
  createdDate: string; // ISO date string
  description?: string;
}

export interface ChatbotQA {
  questionId: string;
  questionText: string;
  answerTemplate: string;
  category?: "priority" | "history" | "topics" | "sentiment" | "opportunities";
}

export interface ChatbotMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

// Dashboard-specific type for shallow client data
export interface ClientSummary {
  id: string;
  name: string;
  photo?: string;
  priorityScore: number;
  panicIndicator: boolean;
  totalAUM: number;
  lastContactDate: string;
  profession: string;
}
