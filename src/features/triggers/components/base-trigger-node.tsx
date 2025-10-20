"use client";

import React, { memo } from "react";
import { NodeProps, Position } from "@xyflow/react";
import { BaseHandle } from "@/components/react-flow/base-handle";
import { BaseNode, BaseNodeContent } from "@/components/react-flow/base-node";
import { WorkflowNode } from "@/components/workflow-node";
import Image from "next/image";

interface BaseTriggerNodeProps extends NodeProps {
  icon?: React.ComponentType<{ className?: string }> | string;
  name: string;
  description?: string;
  children?: React.ReactNode;
  onSettings?: () => void;
  onDoubleClick?: () => void;
  onDelete?: () => void;
}

const BaseTriggerNode = memo(
  ({
    icon: Icon,
    name,
    description,
    children,
    onSettings,
    onDoubleClick,
    onDelete,
  }: BaseTriggerNodeProps) => {
    return (
      <WorkflowNode
        name={name}
        description={description}
        onSettings={onSettings}
        onDelete={onDelete}
      >
        <BaseNode onDoubleClick={onDoubleClick} className="rounded-l-2xl relative group">
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
      </WorkflowNode>
    );
  }
);

BaseTriggerNode.displayName = "BaseTriggerNode";

export default BaseTriggerNode;
