import { z } from 'zod';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../init';
import prisma from '@/lib/db';
import { inngest } from '@/inngest/client';
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export const appRouter = createTRPCRouter({
  testAi: protectedProcedure.mutation(async () => {
   await inngest.send({
    name:"execute/ai",
    })
    return {success:true,message:"job queued"}
  }),
  getWorkflows: protectedProcedure.query(({ ctx }) => {
    return prisma.workflow.findMany();
  }),
  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "test/hello.world",
      data: {
        email: "testUser@example.com",
      },
    });

    return prisma.workflow.create({
      data: {
        name: "test-workflow"
      }
    })
  })
});
// export type definition of API
export type AppRouter = typeof appRouter;