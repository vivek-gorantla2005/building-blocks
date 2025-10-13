import { getQueryClient, trpc } from "@/trpc/server";
import Client from "./client";
import {dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

export default async function Home() {
  const queryClient = getQueryClient()

  void queryClient.prefetchQuery(trpc.getUsers.queryOptions())
  return (  
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<p>loading...</p>}/>
      <Client/>
    </HydrationBoundary>
  )
}

