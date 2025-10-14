"use client"
import React from 'react'
import { authClient } from '@/lib/auth-client'
import { createAuthClient } from 'better-auth/react'


const Page = () => {
  const {data} = authClient.useSession()
  return (
    <div>
      {JSON.stringify(data)}
    </div>
  )
}

export default Page