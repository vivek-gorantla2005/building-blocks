import React from "react"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { caller } from "@/trpc/server"
import { requireAuth } from "@/lib/auth-utils.server"

const Page =async () => {
  await requireAuth();

  const data = await caller.getUsers(); 

  return (
    <>
      {JSON.stringify(data)}
    </>
  )
}

export default Page
