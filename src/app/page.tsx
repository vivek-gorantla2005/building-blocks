"use client"

import React from "react"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"

const Page = () => {
  const { data } = authClient.useSession()

  return (
    <>
      {JSON.stringify(data)}

      {data && (
        <Button onClick={() => authClient.signOut()}>
          Logout
        </Button>
      )}
    </>
  )
}

export default Page
