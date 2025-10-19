import prisma from "@/lib/db"
import { createTRPCRouter, protectedProcedure, premiumProcedure } from "@/trpc/init"
import { generateSlug } from "random-word-slugs"
import { z } from "zod"
import {type Edge, type Node } from "@xyflow/react"
import { NodeType } from "@/generated/prisma"

export const workFlowsRouter = createTRPCRouter({
    create: protectedProcedure.mutation(({ ctx }) => {
        return prisma.workflow.create({
            data: {
                name: generateSlug(3),
                userId: ctx.auth.user.id,
                nodes:{
                    create:{
                        type:NodeType.INITIAL,
                        position:{x: 0, y: 0},
                        name:NodeType.INITIAL
                    }
                }
            } 
        })
    }),

    remove: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(({ ctx, input }) => {
            return prisma.workflow.delete({
                where: {
                    id: input.id,
                    userId: ctx.auth.user.id,
                }
            })
        }),

    updateName: protectedProcedure
        .input(z.object({ id: z.string(), name: z.string().min(1) }))
        .mutation(({ ctx, input }) => {
            return prisma.workflow.update({
                where: {
                    id: input.id,
                    userId: ctx.auth.user.id,
                },
                data: {
                    name: input.name
                }
            })
        }),

    getOne: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            const workflow = await prisma.workflow.findUniqueOrThrow({
                where: {
                    id: input.id,
                    userId: ctx.auth.user.id
                },
                include: {
                    nodes: true,
                    connections: true
                }
            })

            const nodes: Node[] = workflow.nodes.map((node) => ({
                id: node.id,
                type: node.type || 'default',
                position: node.position as { x: number; y: number },
                data: (node.data as Record<string, unknown>) || {},
            }));

            const edges:Edge[] = workflow.connections.map((connection)=>({
                id:connection.id,
                source : connection.fromNodeId,
                target : connection.toNodeId,
                sourceHandle : connection.fromOutput,
                targetHandle : connection.toInput
            }))

            return {
                id:workflow.id,
                name:workflow.name,
                nodes,
                edges
            }
        }),

    getMany: protectedProcedure
        .query(({ ctx }) => {
            return prisma.workflow.findMany({
                where: {
                    userId: ctx.auth.user.id
                }
            })
        })

})


