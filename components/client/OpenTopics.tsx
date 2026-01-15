import { OpenTopic } from "@/lib/data/types";
import { formatDate } from "@/lib/data/clients";

interface OpenTopicsProps {
  topics: OpenTopic[];
}

export default function OpenTopics({ topics }: OpenTopicsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "pending-client":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "resolved":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-green-600";
      default:
        return "text-slate-600";
    }
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <h2 className="text-xl font-semibold text-slate-900 mb-4">Open Topics</h2>
      <div className="space-y-4">
        {topics.map((topic) => (
          <div
            key={topic.id}
            className="p-4 border border-slate-200 rounded-lg hover:border-navy transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-sm font-semibold text-slate-900 flex-1">{topic.title}</h3>
              {topic.priority && (
                <span className={`text-xs font-semibold uppercase ${getPriorityColor(topic.priority)}`}>
                  {topic.priority}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs px-2 py-1 rounded border ${getStatusColor(topic.status)}`}>
                {topic.status.replace("-", " ")}
              </span>
              <span className="text-xs text-slate-500">
                Owner: {topic.owner}
              </span>
              <span className="text-xs text-slate-500">
                • Created {formatDate(topic.createdDate)}
              </span>
            </div>
            {topic.description && (
              <p className="text-sm text-slate-700 mt-2">{topic.description}</p>
            )}
          </div>
        ))}
      </div>
      {topics.length === 0 && (
        <div className="text-center py-8 text-slate-500">
          No open topics at this time
        </div>
      )}
    </div>
  );
}
