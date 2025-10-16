import React from 'react'
import { requireAuth } from '@/lib/auth-utils.server'

const Page = async() => {
    await requireAuth();
  return (
    <div>   
      Workflows
    </div>
  )
}

export default Page
