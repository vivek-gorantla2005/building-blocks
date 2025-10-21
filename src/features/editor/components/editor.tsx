"use client";
import { useSuspenseWorkflow } from "@/features/workflows/hooks/use-workflows";
import { useState, useCallback } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Panel,
  type Node,
  type Edge,
  type NodeChange,
  type EdgeChange,
  type Connection,
} from "@xyflow/react";
import { Background, Controls, MiniMap } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { nodeComponents } from "@/config/node-components";
import { AddNodeButton } from "./add-node";
import { WorkFlowHeader } from "./workflow-header";
import { useSetAtom } from "jotai";
import { editorAtom } from "../store/atoms";

export const Editor = ({ workflowId }: { workflowId: string }) => {
  const { data: workflow } = useSuspenseWorkflow(workflowId);

  const setEditor = useSetAtom(editorAtom)

  const [nodes, setNodes] = useState<Node[]>(workflow.nodes as Node[]);
  const [edges, setEdges] = useState<Edge[]>(workflow.edges as Edge[]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((ns) => applyNodeChanges(changes, ns)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((es) => applyEdgeChanges(changes, es)),
    []
  );
  const onConnect = useCallback(
    (params: Connection) => setEdges((es) => addEdge(params, es)),
    []
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
     
      <WorkFlowHeader workflow={workflow}/>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeComponents}
          onInit={setEditor}
          fitView
          snapGrid={[10,10]}
          snapToGrid
          panOnScroll
          panOnDrag={false}
          selectionOnDrag 
        >
          <Background />
          <Controls />
          <MiniMap />
          <Panel>
            <AddNodeButton />
          </Panel>
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};
