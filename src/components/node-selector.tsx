"use client";

import { createId } from "@paralleldrive/cuid2";
import { useReactFlow } from "@xyflow/react";
import { GlobeIcon, MousePointerIcon } from "lucide-react";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NodeType } from "@/generated/prisma";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useCallback } from "react";

export type NodeTypeOption = {
  type: NodeType;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }> | string;
};

const triggerNodes: NodeTypeOption[] = [
  {
    type: NodeType.MANUAL_TRIGGER,
    label: "Trigger Manually",
    description: "Runs the flow when triggered manually.",
    icon: MousePointerIcon,
  },
];

const executionNodes: NodeTypeOption[] = [
  {
    type: NodeType.HTTP_REQUEST,
    label: "HTTP Request",
    description: "Makes an HTTP request to any endpoint.",
    icon: GlobeIcon,
  },
];

interface NodeSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function NodeSelector({
  open,
  onOpenChange,
  children,
}: NodeSelectorProps) {
  const { setNodes, getNodes, screenToFlowPosition } = useReactFlow();

  const handleNodeSelect = useCallback(
    (selection: NodeTypeOption) => {
      const currentNodes = getNodes();

      // Prevent multiple manual triggers
      if (selection.type === NodeType.MANUAL_TRIGGER) {
        const hasManualTrigger = currentNodes.some(
          (node) => node.type === NodeType.MANUAL_TRIGGER
        );
        if (hasManualTrigger) {
          toast.error("Only one manual trigger is allowed per workflow.");
          return;
        }
      }

      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const flowPosition = screenToFlowPosition({
        x: centerX + (Math.random() - 0.5) * 200,
        y: centerY + (Math.random() - 0.5) * 200,
      });

      const id = createId();
      const newNode = {
        id,
        data: {},
        position: flowPosition,
        type: selection.type,
      };

      setNodes((prevNodes) => {
        const filtered = prevNodes.filter(
          (node) => node.type !== NodeType.INITIAL
        );
        return [...filtered, newNode];
      });

      onOpenChange(false);
    },
    [setNodes, getNodes, onOpenChange, screenToFlowPosition]
  );

  const renderNodeList = (nodes: NodeTypeOption[], title: string) => (
    <div className="space-y-3 mt-4">
      <h3 className="text-sm font-semibold text-muted-foreground mb-1">
        {title}
      </h3>
      {nodes.map((node) => {
        const Icon = node.icon as React.ComponentType<{ className?: string }>;
        return (
          <Button
            key={node.type}
            variant="ghost"
            className="w-full justify-start text-left h-auto py-3 px-2 flex gap-3 items-start hover:bg-accent/50"
            onClick={() => handleNodeSelect(node)}
          >
            <Icon className="h-5 w-5 mt-0.5 text-muted-foreground" />
            <div className="flex flex-col">
              <span className="font-medium">{node.label}</span>
              <span className="text-sm text-muted-foreground">
                {node.description}
              </span>
            </div>
          </Button>
        );
      })}
    </div>
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md overflow-y-auto p-4"
      >
        <SheetHeader>
          <SheetTitle>Select a Node</SheetTitle>
          <SheetDescription>
            Choose a node type to add to your workflow.
          </SheetDescription>
        </SheetHeader>

        {renderNodeList(triggerNodes, "Triggers")}
        <Separator className="my-4" />
        {renderNodeList(executionNodes, "Execution Nodes")}
      </SheetContent>
    </Sheet>
  );
}
