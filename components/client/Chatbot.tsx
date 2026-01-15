"use client";

import { useState } from "react";
import { ChatbotQA } from "@/lib/data/types";

interface ChatbotProps {
  clientId: string;
  clientName: string;
  chatbotQA: ChatbotQA[];
}

export default function Chatbot({ clientId, clientName, chatbotQA }: ChatbotProps) {
  const [selectedQuestion, setSelectedQuestion] = useState<ChatbotQA | null>(null);

  const handleQuestionClick = (qa: ChatbotQA) => {
    setSelectedQuestion(qa);
  };

  return (
    <div className="bg-donna-bg-tertiary rounded-lg soft-border-cyan h-[calc(100vh-12rem)] flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-donna-text-tertiary/20">
        <h2 className="font-heading text-xl font-semibold text-donna-text-primary mb-2">
          Client Intelligence Assistant
        </h2>
        <p className="font-body text-xs text-donna-text-tertiary leading-relaxed">
          Ask questions about this client. All responses are advisory.
        </p>
      </div>

      {/* Preset Questions - Always visible */}
      <div className="p-6 border-b border-donna-text-tertiary/20">
        <p className="font-heading text-xs uppercase tracking-wider text-donna-text-tertiary mb-4">
          Preset Questions
        </p>
        <div className="space-y-2">
          {chatbotQA.map((qa) => (
            <button
              key={qa.questionId}
              onClick={() => handleQuestionClick(qa)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-smooth font-body text-sm
                ${selectedQuestion?.questionId === qa.questionId
                  ? 'bg-donna-bg-secondary soft-border-cyan glow-cyan'
                  : 'bg-donna-bg-secondary/50 hover:bg-donna-bg-secondary'
                }
                text-donna-text-secondary hover:text-donna-text-primary`}
            >
              {qa.questionText}
            </button>
          ))}
        </div>
      </div>

      {/* Response Area */}
      <div className="flex-1 overflow-y-auto p-6">
        {selectedQuestion ? (
          <div className="space-y-4">
            {/* Selected Question Display */}
            <div className="pb-4 border-b border-donna-text-tertiary/20">
              <p className="font-heading text-xs uppercase tracking-wider text-donna-text-tertiary mb-2">
                Question
              </p>
              <p className="font-body text-sm text-donna-text-primary">
                {selectedQuestion.questionText}
              </p>
            </div>

            {/* Response */}
            <div>
              <p className="font-heading text-xs uppercase tracking-wider text-donna-text-tertiary mb-3">
                Analysis
              </p>
              <div className="font-body text-sm text-donna-text-secondary leading-relaxed whitespace-pre-line">
                {selectedQuestion.answerTemplate}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="font-body text-sm text-donna-text-tertiary text-center max-w-xs">
              Select a question above to view contextual analysis about {clientName}.
            </p>
          </div>
        )}
      </div>

      {/* Advisory Footer */}
      <div className="p-4 border-t border-donna-text-tertiary/20 bg-donna-bg-secondary/30">
        <p className="font-body text-xs text-donna-text-tertiary text-center">
          Responses are based on current data and are advisory only.
        </p>
      </div>
    </div>
  );
}
