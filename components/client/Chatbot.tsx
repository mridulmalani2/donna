"use client";

import { useState } from "react";
import { ChatbotQA, ChatbotMessage } from "@/lib/data/types";

interface ChatbotProps {
  clientId: string;
  clientName: string;
  chatbotQA: ChatbotQA[];
}

export default function Chatbot({ clientId, clientName, chatbotQA }: ChatbotProps) {
  const [messages, setMessages] = useState<ChatbotMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Hello. I'm here to help you understand ${clientName}'s current situation. Select a question below to get context and insights.`,
      timestamp: new Date().toISOString(),
    },
  ]);
  const [selectedQuestions, setSelectedQuestions] = useState<Set<string>>(new Set());

  const handleQuestionClick = (qa: ChatbotQA) => {
    if (selectedQuestions.has(qa.questionId)) {
      return; // Question already asked
    }

    // Add user question
    const userMessage: ChatbotMessage = {
      id: `user-${qa.questionId}`,
      role: "user",
      content: qa.questionText,
      timestamp: new Date().toISOString(),
    };

    // Add assistant answer
    const assistantMessage: ChatbotMessage = {
      id: `assistant-${qa.questionId}`,
      role: "assistant",
      content: qa.answerTemplate,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, userMessage, assistantMessage]);
    setSelectedQuestions(new Set([...selectedQuestions, qa.questionId]));
  };

  const handleReset = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: `Hello. I'm here to help you understand ${clientName}'s current situation. Select a question below to get context and insights.`,
        timestamp: new Date().toISOString(),
      },
    ]);
    setSelectedQuestions(new Set());
  };

  const availableQuestions = chatbotQA.filter(
    (qa) => !selectedQuestions.has(qa.questionId)
  );

  return (
    <div className="bg-white rounded-lg border border-slate-200 h-[calc(100vh-12rem)] flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-200">
        <h2 className="text-lg font-semibold text-slate-900">Client Intelligence Assistant</h2>
        <p className="text-xs text-slate-600 mt-1">
          Select preset questions for contextual insights
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-lg p-3 ${
                message.role === "user"
                  ? "bg-navy text-white"
                  : "bg-slate-100 text-slate-900"
              }`}
            >
              <p className="text-sm whitespace-pre-line leading-relaxed">{message.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Questions */}
      {availableQuestions.length > 0 ? (
        <div className="p-4 border-t border-slate-200 space-y-2">
          <p className="text-xs text-slate-600 mb-2 font-medium">Suggested questions:</p>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {availableQuestions.map((qa) => (
              <button
                key={qa.questionId}
                onClick={() => handleQuestionClick(qa)}
                className="w-full text-left px-3 py-2 text-sm bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
              >
                {qa.questionText}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-4 border-t border-slate-200">
          <p className="text-sm text-slate-600 mb-3 text-center">
            All available questions have been answered.
          </p>
          <button
            onClick={handleReset}
            className="w-full px-4 py-2 bg-navy text-white rounded-lg hover:bg-slate-700 transition-colors text-sm font-medium"
          >
            Reset Conversation
          </button>
        </div>
      )}

      {/* Advisory Note */}
      <div className="p-3 bg-slate-50 border-t border-slate-200">
        <p className="text-xs text-slate-600">
          <strong>Note:</strong> Responses are based on current client data and are advisory only. Final decisions remain with the wealth manager.
        </p>
      </div>
    </div>
  );
}
