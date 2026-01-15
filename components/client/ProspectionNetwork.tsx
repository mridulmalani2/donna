'use client';

import { useState, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Client, NetworkConnection } from '@/lib/data/types';
import { useTranslation } from '@/lib/context/LanguageContext';

// Dynamically import ForceGraph3D to avoid SSR issues with Three.js
const ForceGraph3D = dynamic(() => import('react-force-graph-3d'), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] bg-donna-bg-secondary rounded-lg flex items-center justify-center">
      <p className="font-body text-donna-text-tertiary">Loading network visualization...</p>
    </div>
  ),
});

interface ProspectionNetworkProps {
  client: Client;
}

interface GraphNode {
  id: string;
  name: string;
  type: 'client' | 'connection';
  role?: string;
  relationshipToClient?: string;
  triggerEvent?: string;
  suggestedNextStep?: string;
  connectionStrength?: number;
}

interface GraphLink {
  source: string;
  target: string;
  strength: number;
}

export default function ProspectionNetwork({ client }: ProspectionNetworkProps) {
  const { t } = useTranslation();
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
  const [showFullNetwork, setShowFullNetwork] = useState(false);

  if (!client.prospectionNetwork) {
    return null;
  }

  const network = client.prospectionNetwork;

  // Transform data for force graph
  const graphData = useMemo(() => {
    const nodes: GraphNode[] = [
      {
        id: 'client-center',
        name: client.name,
        type: 'client' as const,
      },
    ];

    const links: GraphLink[] = [];

    network.connections.forEach((connection) => {
      nodes.push({
        id: connection.id,
        name: connection.name,
        type: 'connection' as const,
        role: connection.role,
        relationshipToClient: connection.relationshipToClient,
        triggerEvent: connection.triggerEvent,
        suggestedNextStep: connection.suggestedNextStep,
        connectionStrength: connection.connectionStrength,
      });

      links.push({
        source: 'client-center',
        target: connection.id,
        strength: connection.connectionStrength,
      });
    });

    return { nodes, links };
  }, [client.name, network]);

  const handleNodeClick = useCallback((node: any) => {
    setSelectedNode(node as GraphNode);
  }, []);

  const handleNodeHover = useCallback((node: any) => {
    setHoveredNode(node as GraphNode);
  }, []);

  const displayedNode = selectedNode || hoveredNode;

  // Sort connections by strength (highest first) and get top 2
  const sortedConnections = [...network.connections].sort((a, b) => b.connectionStrength - a.connectionStrength);
  const topOpportunities = sortedConnections.slice(0, 2);
  const remainingConnections = sortedConnections.slice(2);

  return (
    <div className="bg-donna-bg-secondary/10 rounded-lg border border-donna-text-tertiary/10 p-6">
      <div className="mb-6">
        <h3 className="font-heading text-lg font-semibold text-donna-text-primary mb-1">{t.prospectionNetworkTitle}</h3>
        <p className="font-body text-sm text-donna-text-secondary">{t.prospectionNetworkSubtitle}</p>
      </div>

      {/* Top 2 Opportunity Cards - Always Visible */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {topOpportunities.map((connection) => (
          <div
            key={connection.id}
            className="bg-donna-bg-tertiary/50 rounded-lg border border-donna-text-tertiary/20 p-5 hover:border-donna-cyan/30 transition-smooth"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <h4 className="font-heading text-base font-semibold text-donna-text-primary flex-1">
                {connection.name}
              </h4>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <div className="h-1.5 w-12 bg-donna-bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-donna-cyan rounded-full"
                    style={{ width: `${connection.connectionStrength * 10}%` }}
                  />
                </div>
                <span className="font-heading text-xs font-medium text-donna-cyan">
                  {connection.connectionStrength}/10
                </span>
              </div>
            </div>

            {/* Role */}
            <p className="font-body text-sm text-donna-text-secondary mb-3">{connection.role}</p>

            {/* Why Now */}
            {connection.triggerEvent && (
              <div className="mb-3 p-2 bg-donna-cyan/5 border border-donna-cyan/20 rounded">
                <p className="font-heading text-xs uppercase tracking-wide text-donna-cyan mb-1">Why Now</p>
                <p className="font-body text-xs text-donna-text-secondary">{connection.triggerEvent}</p>
              </div>
            )}

            {/* Suggested Next Step */}
            {connection.suggestedNextStep && (
              <div className="pt-3 border-t border-donna-text-tertiary/20">
                <p className="font-heading text-xs uppercase tracking-wide text-donna-text-tertiary mb-1">Suggested Action</p>
                <p className="font-body text-xs text-donna-text-primary">{connection.suggestedNextStep}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* View Full Network Button */}
      {remainingConnections.length > 0 && (
        <div className="mb-6">
          <button
            onClick={() => setShowFullNetwork(!showFullNetwork)}
            className="w-full py-3 px-4 bg-donna-bg-tertiary/30 hover:bg-donna-bg-tertiary border border-donna-text-tertiary/20 hover:border-donna-cyan/30 rounded-lg transition-smooth flex items-center justify-center gap-2 font-heading text-sm text-donna-text-secondary hover:text-donna-cyan"
          >
            <span>{showFullNetwork ? 'Hide' : 'View'} Full Network ({remainingConnections.length} more)</span>
            <svg
              className={`w-4 h-4 transition-transform ${showFullNetwork ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}

      {/* Full Network - Hidden by Default */}
      {showFullNetwork && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6 pt-6 border-t border-donna-text-tertiary/20">
          {/* Connections List */}
          <div className="lg:col-span-2 space-y-3">
            {remainingConnections.map((connection) => (
              <button
                key={connection.id}
                onClick={() => handleNodeClick(graphData.nodes.find(n => n.id === connection.id))}
                className={`w-full text-left bg-donna-bg-tertiary hover:bg-donna-bg-secondary rounded-lg border transition-smooth p-4 ${
                  selectedNode?.id === connection.id
                    ? 'border-donna-cyan/50 bg-donna-bg-secondary glow-cyan'
                    : 'border-donna-text-tertiary/20'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-heading text-base font-semibold text-donna-text-primary truncate">
                        {connection.name}
                      </h4>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <div className="flex-1 h-1.5 w-16 bg-donna-bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-donna-cyan rounded-full"
                            style={{ width: `${connection.connectionStrength * 10}%` }}
                          />
                        </div>
                        <span className="font-heading text-xs font-medium text-donna-text-tertiary">
                          {connection.connectionStrength}/10
                        </span>
                      </div>
                    </div>
                    <p className="font-body text-sm text-donna-text-secondary mb-2">{connection.role}</p>
                    <p className="font-body text-xs text-donna-text-tertiary">
                      <span className="font-heading font-medium">{t.relationshipToClient}:</span>{' '}
                      {connection.relationshipToClient}
                    </p>
                    {connection.suggestedNextStep && (
                      <div className="mt-2 pt-2 border-t border-donna-text-tertiary/20">
                        <p className="font-body text-xs text-donna-text-tertiary">
                          <span className="font-heading font-medium">{t.suggestedNextStep}:</span>{' '}
                          {connection.suggestedNextStep}
                        </p>
                      </div>
                    )}
                  </div>
                  <svg
                    className={`w-5 h-5 flex-shrink-0 transition-transform ${
                      selectedNode?.id === connection.id ? 'rotate-90' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>
            ))}
          </div>

          {/* 3D Visualization */}
          <div className="lg:col-span-1">
            <div className="bg-donna-bg-tertiary rounded-lg border border-donna-text-tertiary/20 overflow-hidden sticky top-6">
              <div className="h-[300px] relative">
                <ForceGraph3D
                  graphData={graphData}
                  nodeLabel={(node: any) => node.name}
                  nodeColor={(node: any) => (node.type === 'client' ? '#00D4FF' : '#94A3B8')}
                  nodeVal={(node: any) => (node.type === 'client' ? 3 : 1.5)}
                  linkColor={() => '#3B82F6'}
                  linkWidth={(link: any) => link.strength / 8}
                  linkOpacity={0.3}
                  onNodeClick={handleNodeClick}
                  onNodeHover={handleNodeHover}
                  enableNodeDrag={false}
                  showNavInfo={false}
                  backgroundColor="#111B2E"
                  d3VelocityDecay={0.3}
                  d3AlphaDecay={0.02}
                  warmupTicks={50}
                  cooldownTicks={100}
                />
              </div>
              <div className="px-3 py-2 bg-donna-bg-secondary border-t border-donna-text-tertiary/20">
                <p className="font-body text-xs text-donna-text-tertiary text-center">Network Visualization</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Guardrail - Always Visible */}
      <div className="mt-6 pt-4 border-t border-donna-text-tertiary/20">
        <p className="font-body text-xs text-donna-text-tertiary text-center">
          No outreach occurs without client consent.
        </p>
      </div>
    </div>
  );
}
