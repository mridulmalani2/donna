import { OpenTopic } from "@/lib/data/types";
import { formatDate } from "@/lib/data/clients";
import CollapsibleSection from "./CollapsibleSection";

interface OpenTopicsProps {
  topics: OpenTopic[];
}

// Generate topics summary
function generateTopicsSummary(topics: OpenTopic[]): string {
  if (topics.length === 0) {
    return "No open topics at this time";
  }

  const highPriority = topics.filter(t => t.priority === "high").length;
  const newTopics = topics.filter(t => t.status === "new").length;

  if (highPriority > 0) {
    return `${topics.length} open topic${topics.length > 1 ? 's' : ''}, ${highPriority} high priority requiring immediate action`;
  }

  if (newTopics > 0) {
    return `${topics.length} open topic${topics.length > 1 ? 's' : ''}, ${newTopics} new and unassigned`;
  }

  return `${topics.length} open topic${topics.length > 1 ? 's' : ''}, all in progress`;
}

export default function OpenTopics({ topics }: OpenTopicsProps) {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "new":
        return "bg-donna-cyan/10 text-donna-cyan border-donna-cyan/30";
      case "in-progress":
        return "bg-donna-amber/10 text-donna-amber border-donna-amber/30";
      case "pending-client":
        return "bg-donna-blue/10 text-donna-blue border-donna-blue/30";
      case "resolved":
        return "bg-donna-text-secondary/10 text-donna-text-secondary border-donna-text-secondary/30";
      default:
        return "bg-donna-bg-tertiary text-donna-text-secondary border-donna-text-tertiary/20";
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "high":
        return "text-donna-red";
      case "medium":
        return "text-donna-amber";
      case "low":
        return "text-donna-cyan";
      default:
        return "text-donna-text-tertiary";
    }
  };

  const summary = generateTopicsSummary(topics);

  return (
    <CollapsibleSection
      title="Open Topics"
      summary={summary}
      defaultExpanded={false}
      variant="muted"
    >
      <div className="space-y-3">
        {topics.map((topic) => (
          <div
            key={topic.id}
            className="p-4 bg-donna-bg-secondary/30 border border-donna-text-tertiary/10 rounded-lg hover:border-donna-cyan/30 transition-smooth"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-heading text-sm font-medium text-donna-text-primary flex-1">{topic.title}</h3>
              {topic.priority && (
                <span className={`font-heading text-xs font-semibold uppercase tracking-wide ${getPriorityColor(topic.priority)}`}>
                  {topic.priority}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className={`font-heading text-xs px-2 py-1 rounded border ${getStatusStyles(topic.status)}`}>
                {topic.status.replace("-", " ")}
              </span>
              <span className="font-body text-xs text-donna-text-tertiary">
                Owner: {topic.owner}
              </span>
              <span className="font-body text-xs text-donna-text-tertiary">
                • Created {formatDate(topic.createdDate)}
              </span>
            </div>
            {topic.description && (
              <p className="font-body text-sm text-donna-text-secondary mt-2">{topic.description}</p>
            )}
          </div>
        ))}
      </div>
      {topics.length === 0 && (
        <div className="text-center py-8 font-body text-donna-text-tertiary">
          No open topics at this time
        </div>
      )}
    </CollapsibleSection>
  );
}
