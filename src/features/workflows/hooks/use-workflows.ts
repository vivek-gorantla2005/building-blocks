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

export const useSuspenseWorkflow =(id:string)=>{
    const trpc =  useTRPC();
    return useSuspenseQuery(trpc.workflows.getOne.queryOptions({id}))
}

