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
    <div className="bg-donna-bg-tertiary/50 rounded-lg border border-donna-text-tertiary/20 h-[calc(100vh-12rem)] flex flex-col">
      {/* Header - Subdued */}
      <div className="p-5 border-b border-donna-text-tertiary/10">
        <h2 className="font-heading text-base font-medium text-donna-text-secondary mb-2">
          Analysis Layer
        </h2>
        <p className="font-body text-xs text-donna-text-tertiary leading-relaxed">
          Interpretive context for the data above. Advisory only.
        </p>
      </div>

      {/* Preset Questions - Always visible */}
      <div className="p-5 border-b border-donna-text-tertiary/10">
        <p className="font-heading text-xs uppercase tracking-wider text-donna-text-tertiary/60 mb-3">
          Common Questions
        </p>
        <div className="space-y-2">
          {chatbotQA.map((qa) => (
            <button
              key={qa.questionId}
              onClick={() => handleQuestionClick(qa)}
              className={`w-full text-left px-3 py-2 rounded transition-smooth font-body text-xs
                ${selectedQuestion?.questionId === qa.questionId
                  ? 'bg-donna-bg-secondary border border-donna-cyan/30 text-donna-text-primary'
                  : 'bg-donna-bg-secondary/30 hover:bg-donna-bg-secondary border border-transparent'
                }
                text-donna-text-tertiary hover:text-donna-text-secondary`}
            >
              {qa.questionText}
            </button>
          ))}
        </div>
      </div>

      {/* Response Area */}
      <div className="flex-1 overflow-y-auto p-5">
        {selectedQuestion ? (
          <div className="space-y-3">
            {/* Selected Question Display */}
            <div className="pb-3 border-b border-donna-text-tertiary/10">
              <p className="font-heading text-xs uppercase tracking-wider text-donna-text-tertiary/60 mb-2">
                Question
              </p>
              <p className="font-body text-sm text-donna-text-secondary">
                {selectedQuestion.questionText}
              </p>
            </div>

            {/* Response */}
            <div>
              <p className="font-heading text-xs uppercase tracking-wider text-donna-text-tertiary/60 mb-2">
                Interpretation
              </p>
              <div className="font-body text-xs text-donna-text-tertiary leading-relaxed whitespace-pre-line">
                {selectedQuestion.answerTemplate}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="font-body text-xs text-donna-text-tertiary/60 text-center max-w-xs leading-relaxed">
              Select a question to view contextual analysis about {clientName}.
            </p>
          </div>
        )}
      </div>

      {/* Advisory Footer */}
      <div className="p-4 border-t border-donna-text-tertiary/10 bg-donna-bg-secondary/20">
        <p className="font-body text-xs text-donna-text-tertiary/60 text-center">
          Interpretations are based on current data. Advisory only.
        </p>
      </div>
    </div>
  );
}
