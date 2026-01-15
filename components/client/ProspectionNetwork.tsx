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
        {/* 3D Visualization */}
        <div className="lg:col-span-2">
          <div className="bg-slate-50 rounded-lg border border-slate-200 overflow-hidden">
            <div className="h-[600px] relative">
              <ForceGraph3D
                graphData={graphData}
                nodeLabel={(node: any) => node.name}
                nodeColor={(node: any) => (node.type === 'client' ? '#1e3a8a' : '#64748b')}
                nodeVal={(node: any) => (node.type === 'client' ? 20 : 10)}
                linkColor={() => '#cbd5e1'}
                linkWidth={(link: any) => link.strength / 5}
                linkOpacity={0.4}
                onNodeClick={handleNodeClick}
                onNodeHover={handleNodeHover}
                enableNodeDrag={false}
                showNavInfo={false}
                backgroundColor="#f8fafc"
              />
            </div>
            <div className="px-4 py-3 bg-white border-t border-slate-200">
              <p className="text-xs text-slate-500 text-center">{t.clickToExplore}</p>
            </div>
          </div>
        </div>

        {/* Connection Details Panel */}
        <div className="lg:col-span-1">
          <div className="bg-slate-50 rounded-lg border border-slate-200 p-4 h-[600px] overflow-y-auto">
            {displayedNode && displayedNode.type === 'connection' ? (
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-navy mb-2">{displayedNode.name}</h4>
                  <p className="text-sm text-slate-600">{displayedNode.role}</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                      {t.relationshipToClient}
                    </p>
                    <p className="text-sm text-slate-900">{displayedNode.relationshipToClient}</p>
                  </div>

                  {displayedNode.triggerEvent && (
                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                        {t.triggerEvent}
                      </p>
                      <p className="text-sm text-slate-900">{displayedNode.triggerEvent}</p>
                    </div>
                  )}

                  {displayedNode.suggestedNextStep && (
                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                        {t.suggestedNextStep}
                      </p>
                      <p className="text-sm text-slate-900">{displayedNode.suggestedNextStep}</p>
                    </div>
                  )}

                  {displayedNode.connectionStrength && (
                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                        Connection Strength
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-navy rounded-full transition-all"
                            style={{ width: `${displayedNode.connectionStrength * 10}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-navy">
                          {displayedNode.connectionStrength}/10
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Guardrail */}
                <div className="mt-6 pt-4 border-t border-slate-300">
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <p className="text-xs text-amber-900 font-medium flex items-start gap-2">
                      <svg
                        className="w-4 h-4 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{t.networkGuardrail}</span>
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-center px-4">
                <div>
                  <svg
                    className="w-16 h-16 mx-auto mb-4 text-slate-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <p className="text-sm text-slate-500">
                    Click or hover on a connection node
                    <br />
                    to view details
                  </p>
                </div>
              </div>
            )}
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
