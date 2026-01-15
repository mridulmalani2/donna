'use client';

import { useState, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { ProspectionNetwork as ProspectionNetworkType, NetworkConnection } from '@/lib/data/types';
import { useTranslation } from '@/lib/context/LanguageContext';

// Dynamically import ForceGraph3D to avoid SSR issues with Three.js
const ForceGraph3D = dynamic(() => import('react-force-graph-3d'), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] bg-slate-50 rounded-lg flex items-center justify-center">
      <p className="text-slate-600">Loading network visualization...</p>
    </div>
  ),
});

interface ProspectionNetworkProps {
  clientName: string;
  network: ProspectionNetworkType;
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

export default function ProspectionNetwork({ clientName, network }: ProspectionNetworkProps) {
  const { t } = useTranslation();
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);

  // Transform data for force graph
  const graphData = useMemo(() => {
    const nodes: GraphNode[] = [
      {
        id: 'client-center',
        name: clientName,
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
  }, [clientName, network]);

  const handleNodeClick = useCallback((node: any) => {
    setSelectedNode(node as GraphNode);
  }, []);

  const handleNodeHover = useCallback((node: any) => {
    setHoveredNode(node as GraphNode);
  }, []);

  const displayedNode = selectedNode || hoveredNode;

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-navy mb-1">{t.prospectionNetworkTitle}</h3>
        <p className="text-sm text-slate-600">{t.prospectionNetworkSubtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Connections List - Primary View */}
        <div className="lg:col-span-2 space-y-3">
          {network.connections.map((connection) => (
            <button
              key={connection.id}
              onClick={() => handleNodeClick(graphData.nodes.find(n => n.id === connection.id))}
              className={`w-full text-left bg-slate-50 hover:bg-slate-100 rounded-lg border transition-all p-4 ${
                selectedNode?.id === connection.id
                  ? 'border-navy bg-navy/5'
                  : 'border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-base font-semibold text-navy truncate">
                      {connection.name}
                    </h4>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <div className="flex-1 h-1.5 w-16 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-navy rounded-full"
                          style={{ width: `${connection.connectionStrength * 10}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-slate-600">
                        {connection.connectionStrength}/10
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">{connection.role}</p>
                  <p className="text-xs text-slate-500">
                    <span className="font-medium">{t.relationshipToClient}:</span>{' '}
                    {connection.relationshipToClient}
                  </p>
                  {connection.suggestedNextStep && (
                    <div className="mt-2 pt-2 border-t border-slate-200">
                      <p className="text-xs text-slate-500">
                        <span className="font-medium">{t.suggestedNextStep}:</span>{' '}
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

        {/* 3D Visualization - Secondary Gimmick */}
        <div className="lg:col-span-1">
          <div className="bg-slate-50 rounded-lg border border-slate-200 overflow-hidden sticky top-6">
            <div className="h-[300px] relative">
              <ForceGraph3D
                graphData={graphData}
                nodeLabel={(node: any) => node.name}
                nodeColor={(node: any) => (node.type === 'client' ? '#1e3a8a' : '#64748b')}
                nodeVal={(node: any) => (node.type === 'client' ? 3 : 1.5)}
                linkColor={() => '#cbd5e1'}
                linkWidth={(link: any) => link.strength / 8}
                linkOpacity={0.3}
                onNodeClick={handleNodeClick}
                onNodeHover={handleNodeHover}
                enableNodeDrag={false}
                showNavInfo={false}
                backgroundColor="#f8fafc"
                d3VelocityDecay={0.3}
                d3AlphaDecay={0.02}
                warmupTicks={50}
                cooldownTicks={100}
              />
            </div>
            <div className="px-3 py-2 bg-white border-t border-slate-200">
              <p className="text-xs text-slate-500 text-center">Network Visualization</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Guardrail - Always Visible */}
      <div className="mt-6 pt-4 border-t border-slate-200">
        <div className="bg-slate-50 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-sm text-slate-700">
              <span className="font-semibold">{t.networkGuardrail}</span>
              <br />
              <span className="text-xs text-slate-500">
                All prospection activities require explicit client authorization and consent.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
