"use client";

import React, { memo, useCallback } from "react";
import { NodeProps, Position, useReactFlow } from "@xyflow/react";
import { BaseHandle } from "@/components/react-flow/base-handle";
import { BaseNode, BaseNodeContent } from "@/components/react-flow/base-node";
import { WorkflowNode } from "@/components/workflow-node";
import Image from "next/image";
import {type NodeStatus, NodeStatusIndicator } from "@/components/react-flow/node-status-indicator";


interface BaseExecutionNodeProps extends NodeProps {
  icon?: React.ComponentType<{ className?: string }> | string;
  status?:NodeStatus
  name: string;
  description?: string;
  children?: React.ReactNode;
  onSettings?: () => void;
  onDoubleClick?: () => void;
  onDelete?: () => void;
}

const BaseExecutionNode = memo(
  ({
    id,
    status,
    icon: Icon,
    name,
    description,
    children,
    onSettings,
    onDoubleClick,
  }: BaseExecutionNodeProps) => {
    const { setNodes, setEdges } = useReactFlow();

    const handleDelete = useCallback(() => {
      setNodes((currentNodes) => currentNodes.filter((node) => node.id !== id));
      setEdges((currentEdges) =>
        currentEdges.filter(
          (edge) => edge.source !== id && edge.target !== id
        )
      );
    }, [id, setNodes, setEdges]);

    return (
      <WorkflowNode
        name={name}
        description={description}
        onSettings={onSettings}
        onDelete={handleDelete}
      >
        <NodeStatusIndicator status={status} variant="border" className="rounded-l-2xl">

          <BaseNode onDoubleClick={onDoubleClick}>
            <BaseNodeContent className="flex items-center gap-2">
              {typeof Icon === "string" ? (
                <Image
                  src={Icon}
                  alt={name}
                  width={16}
                  height={16}
                  className="text-muted-foreground"
                />
              ) : (
                Icon && <Icon className="size-4 text-muted-foreground" />
              )}

              {children}

              <BaseHandle id="target-1" type="target" position={Position.Left} />
              <BaseHandle id="source-1" type="source" position={Position.Right} />
            </BaseNodeContent>
          </BaseNode>
        </NodeStatusIndicator>
      </WorkflowNode>
    );
  }
);

BaseExecutionNode.displayName = "BaseExecutionNode";

export default BaseExecutionNode;
