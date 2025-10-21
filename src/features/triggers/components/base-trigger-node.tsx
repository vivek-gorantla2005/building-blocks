"use client";

import React, { memo, useCallback } from "react";
import { NodeProps, Position, useReactFlow } from "@xyflow/react";
import { BaseHandle } from "@/components/react-flow/base-handle";
import { BaseNode, BaseNodeContent } from "@/components/react-flow/base-node";
import { WorkflowNode } from "@/components/workflow-node";
import Image from "next/image";
import {type NodeStatus, NodeStatusIndicator } from "@/components/react-flow/node-status-indicator";

interface BaseTriggerNodeProps extends NodeProps {
  icon?: React.ComponentType<{ className?: string }> | string;
  name: string;
  description?: string;
  children?: React.ReactNode;
  onSettings?: () => void;
  onDoubleClick?: () => void;
  status?:NodeStatus
  onDelete?: () => void;
}

const BaseTriggerNode = memo(
  ({
    id,
    status = 'initial',
    icon: Icon,
    name,
    description,
    children,
    onSettings,
    onDoubleClick,
  }: BaseTriggerNodeProps) => {
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
          <BaseNode
            onDoubleClick={onDoubleClick}
            className="rounded-l-2xl relative group"
            status = {status}
          >
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

              <BaseHandle id="source-1" type="source" position={Position.Right} />
            </BaseNodeContent>
          </BaseNode>
        </NodeStatusIndicator>
      </WorkflowNode>
    );
  }
);

BaseTriggerNode.displayName = "BaseTriggerNode";

export default BaseTriggerNode;
