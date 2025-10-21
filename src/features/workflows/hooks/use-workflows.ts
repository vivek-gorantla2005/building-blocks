import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery,useQuery } from "@tanstack/react-query";
import { useTransition } from "react";
import { toast } from "sonner";

// hook to fetch all workflows using suspense
export const useSuspenseWorkflows = () => {
    const trpc = useTRPC()
    return useSuspenseQuery(trpc.workflows.getMany.queryOptions());
}

//create workflow hook
export const useCreateWorkflow = () => {
    const QueryClient = useQueryClient()
    const trpc = useTRPC()
    return useMutation(
        trpc.workflows.create.mutationOptions({
            onSuccess: (data) => {
                toast.success(`workflow ${data.name} created`)
                QueryClient.invalidateQueries(
                    trpc.workflows.getMany.queryOptions()
                )
            },
            onError: (error) => {
                toast.error("error creating workflow")
            }
        })
    )
}


export const useUpdateWorkflowName=()=>{
    const queryClient = useQueryClient();
    const trpc = useTRPC();

    return useMutation(
        trpc.workflows.updateName.mutationOptions({
            onSuccess:(data)=>{
                toast.success(`Workflow "${data.name}" updated`)
                queryClient.invalidateQueries(
                    trpc.workflows.getOne.queryOptions({id:data.id})
                )
            },
            onError:(err)=>{
                toast.error("unable to rename workflow");
            }
        })
    )
}


export const useUpdateWorkflow=()=>{
    const queryClient = useQueryClient();
    const trpc = useTRPC();

    return useMutation(
        trpc.workflows.update.mutationOptions({
            onSuccess:(data)=>{
                toast.success(`Workflow "${data}" updated`)
                queryClient.invalidateQueries(
                    trpc.workflows.getOne.queryOptions({id:data.id})
                )
                queryClient.invalidateQueries(
                    trpc.workflows.getMany.queryOptions()
                )
            },
            onError:(err)=>{
                toast.error("unable to save workflow");
            }
        })
    )
}



export const useSuspenseWorkflow =(id:string)=>{
    const trpc =  useTRPC();
    return useSuspenseQuery(trpc.workflows.getOne.queryOptions({id}))
}

