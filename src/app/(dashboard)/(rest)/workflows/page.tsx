import React from 'react'
import { requireAuth } from '@/lib/auth-utils.server'
import { prefetchWorkflows } from '@/features/workflows/server/prefetch';
import { HydrateClient } from '@/trpc/server';
import { WorkflowsList } from '@/features/workflows/components/workflows';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
const Page = async() => {
    await requireAuth();
    prefetchWorkflows();
  return (
    <HydrateClient>
      <ErrorBoundary fallback={<p>Error!</p>}>
        <Suspense fallback={<p>Loading...</p>}>
          <WorkflowsList/>
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  )
}

export default Page

