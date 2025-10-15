"use client"
import React from "react"
import Logout from "@/features/auth/components/logout"
import { useTRPC } from "@/trpc/client"
import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"


const Page =() => {
  const trpc = useTRPC()
  const QueryClient = useQueryClient()
  const {data} = useQuery(trpc.getWorkflows.queryOptions())
  const create = useMutation(trpc.createWorkflow.mutationOptions({
    onSuccess:()=>{
      QueryClient.invalidateQueries(trpc.getWorkflows.queryOptions()) 
    }
  }))
  return (
    <>
      {JSON.stringify(data)}
     <Logout/>
     <Button disabled={create.isPending} onClick={()=>create.mutate()}>
        Create Workflow
     </Button>
    </>
  )
}

export default Page
