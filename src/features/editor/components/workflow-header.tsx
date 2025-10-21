"use client"
import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
import { useUpdateWorkflow, useUpdateWorkflowName } from "@/features/workflows/hooks/use-workflows";
import { useState } from "react";
import { useSuspenseWorkflow } from "@/features/workflows/hooks/use-workflows";
import { toast } from "sonner";
import { useAtomValue } from "jotai";
import { editorAtom } from "../store/atoms";

type Workflow = Awaited<ReturnType<typeof useSuspenseWorkflow>>["data"];
interface WorkFlowHeaderProps {
  workflow: Workflow;
}

export const WorkFlowHeader = ({ workflow }: WorkFlowHeaderProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(workflow.name);
  const saveWorkflowName = useUpdateWorkflowName();

  const editor = useAtomValue(editorAtom);
  const saveWorkflow = useUpdateWorkflow();

  const handleSaveWorkflow = () => {
    if (!editor) {
      return;
    }

    const nodes = editor.getNodes();
    const edges = editor.getEdges();

    saveWorkflow.mutate({
      id: workflow.id,
      nodes,
      edges
    }, {
      onSuccess: (data) => {
        toast.success("workflow saved successfully")
      },
      onError: () => {
        toast.error("failed saving workflow");
      }
    })
  }

  const handleSaveName = async () => {
    if (newName.trim() && newName !== workflow.name) {
      saveWorkflowName.mutate({ id: workflow.id, name: newName }, {
        onSuccess: (data) => {
          setIsEditing(false);
        },
        onError: () => {
          toast.error("failed updating name")
        }
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSaveName();
    if (e.key === "Escape") {
      setNewName(workflow.name);
      setIsEditing(false);
    }
  };

  return (
    <div className="header flex justify-between m-5 items-center">
      <div className="flex items-center gap-3">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border px-2 py-1 rounded-md text-lg font-semibold bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <Button
              size="sm"
              variant="secondary"
              onClick={handleSaveName}
              disabled={saveWorkflowName.isPending}
            >
              Save
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setIsEditing(false);
                setNewName(workflow.name);
              }}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <div className="font-extrabold text-xl flex items-center gap-2">
            {workflow.name}
            <Pen
              size={18}
              className="cursor-pointer hover:text-blue-500 transition"
              onClick={() => setIsEditing(true)}
            />
          </div>
        )}
      </div>
      <div className="mr-10">
        <Button variant="default" onClick={handleSaveWorkflow} disabled={saveWorkflow.isPending}>Save Workflow</Button>
    </div>
      </div >
    )
}