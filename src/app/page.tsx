"use client"
import React from "react"
import Logout from "@/features/auth/components/logout"
import { useTRPC } from "@/trpc/client"
import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"


const Page =() => {
  const trpc = useTRPC()
  const QueryClient = useQueryClient()
  const {data} = useQuery(trpc.getWorkflows.queryOptions())
  const create = useMutation(trpc.createWorkflow.mutationOptions({
    onSuccess:()=>{
      QueryClient.invalidateQueries(trpc.getWorkflows.queryOptions()) 
    }
  }))

  const testAi = useMutation(trpc.testAi.mutationOptions({
    onSuccess:()=>{
      toast.success("Ai job queued")
    }
  }))

  return (
    <>
      {JSON.stringify(data)}
     <Logout/>
     <Button disabled={testAi.isPending} onClick={()=>testAi.mutate()}>
        test ai   
     </Button>
     <Button disabled={create.isPending} onClick={()=>create.mutate()}>
        Create Workflow
     </Button>
    </>
  )
}

export default Page
