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
  const {handleError,model} = useUpgradeModal();
  const handleCreate = () => {
    create_Workflow.mutate(undefined, {
      onError: (error: any) => {
        handleError(error)
      },
      onSuccess:(data:any)=>{
        router.push(`/workflows/${data.id}`)
      }
    });
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
              className="border rounded-xl p-4 hover:shadow-md transition-shadow bg-card"
            >
              <h3 className="font-medium text-lg">{wf.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {wf.description || "No description available"}
              </p>
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
