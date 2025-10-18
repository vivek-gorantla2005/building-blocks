import React from 'react'
interface PageProps {
    params: Promise<{
        workflowId: string
    }>
}
import { requireAuth } from '@/lib/auth-utils.server'
import { prefetchWorkflow } from '@/features/workflows/server/prefetch'
import { HydrateClient } from '@/trpc/server';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import { Spinner } from '@/components/ui/spinner'
import { Editor } from '@/features/editor/components/editor'
const Page = async ({ params }: PageProps) => {
    await requireAuth();
    const { workflowId} = await params;
    prefetchWorkflow(workflowId[0])
    return (
        <HydrateClient>
            <ErrorBoundary fallback={<p>Error!</p>}>
                <Suspense fallback={<Spinner />}>
                    <Editor workflowId={workflowId[0]}/>
                </Suspense>
            </ErrorBoundary>
        </HydrateClient>
    )
}

export default Page
