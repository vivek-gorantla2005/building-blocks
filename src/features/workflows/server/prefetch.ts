import type { inferInput } from "@trpc/tanstack-react-query";
import { prefetch } from "@/trpc/server";
import { trpc } from "@/trpc/server";

type Input = inferInput<typeof trpc.workflows.getMany>;

export const prefetchWorkflows=(params : Input)=>{
    return prefetch(trpc.workflows.getMany.queryOptions(params))
}
