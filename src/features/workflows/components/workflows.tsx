"use client";
import { useSuspenseWorkflows } from "../hooks/use-workflows";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useCreateWorkflow } from "../hooks/use-workflows";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";

export const WorkflowsList = () => {
  const router = useRouter();
  const workflows = useSuspenseWorkflows();
  const create_Workflow = useCreateWorkflow();
  const { handleError, model } = useUpgradeModal();
  const handleCreate = () => {
    create_Workflow.mutate(undefined, {
      onError: (error: any) => {
        handleError(error)
      },
      onSuccess: (data: any) => {
        router.push(`/workflows/${data.id}`)
      }
    });
  };

  const timeAgo = (date: string | Date) => {
    const diff = (Date.now() - new Date(date).getTime()) / 1000; // seconds
    if (diff < 60) return `${Math.floor(diff)}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
    if (diff < 31536000) return `${Math.floor(diff / 2592000)}mo ago`;
    return `${Math.floor(diff / 31536000)}y ago`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-5xl font-extrabold tracking-tight">Workflows</p>
          {model}
          <p className="text-sm text-muted-foreground font-bold">
            Create and manage your automation workflows
          </p>
        </div>

        <Button
          onClick={handleCreate}
          className="flex items-center gap-2"
          disabled={create_Workflow.isPending}
        >
          <PlusCircle className="h-4 w-4" />
          {create_Workflow.isPending ? "Creating..." : "New Workflow"}
        </Button>

      </div>

      {/* Workflows List */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {workflows.data.length > 0 ? (
          workflows.data.map((wf: any) => (
            <div
              key={wf.id}
            className="border rounded-xl p-4 hover:shadow-md transition-shadow bg-card cursor-pointer"
              onClick={()=>router.push(`/workflows/${wf.id}`)}
            >
              <h3 className="font-medium text-lg mb-2">{wf.name}</h3>

              <div className="flex flex-col text-sm text-muted-foreground space-y-1">
                <p>Updated {timeAgo(wf.updatedAt)}</p>
                <p>Created {timeAgo(wf.createdAt)}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-muted-foreground py-10 border rounded-lg">
            <p>No workflows found</p>
            <p className="text-sm mt-1">Click “New Workflow” to create one</p>
          </div>
        )}
      </div>

    </div>
  );
};
