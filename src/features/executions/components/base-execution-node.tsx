"use client";

import React, { memo } from "react";
import { NodeProps, Position } from "@xyflow/react";
import { BaseHandle } from "@/components/react-flow/base-handle";
import { BaseNode, BaseNodeContent } from "@/components/react-flow/base-node";
import { WorkflowNode } from "@/components/workflow-node";
import Image from "next/image";

interface BaseExecutionNodeProps extends NodeProps {
  icon?: React.ComponentType<{ className?: string }> | string;
  name: string;
  description?: string;
  children?: React.ReactNode;
  onSettings?: () => void;
  onDoubleClick?: () => void;
  onDelete?: () => void;
}

const BaseExecutionNode = memo(
  ({
    icon: Icon,
    name,
    description,
    children,
    onSettings,
    onDoubleClick,
    onDelete,
  }: BaseExecutionNodeProps) => {
    return (
      <WorkflowNode
        name={name}
        description={description}
        onSettings={onSettings}
        onDelete={onDelete}
      >
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
      </WorkflowNode>
    );
  }
);

BaseExecutionNode.displayName = "BaseExecutionNode";

export default BaseExecutionNode;
