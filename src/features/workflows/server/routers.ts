import prisma from "@/lib/db"
import { createTRPCRouter, protectedProcedure, premiumProcedure } from "@/trpc/init"
import { generateSlug } from "random-word-slugs"
import { string, z } from "zod"
import { type Edge, type Node } from "@xyflow/react"
import { NodeType } from "@/generated/prisma"

export const workFlowsRouter = createTRPCRouter({
    create: protectedProcedure.mutation(({ ctx }) => {
        return prisma.workflow.create({
            data: {
                name: generateSlug(3),
                userId: ctx.auth.user.id,
                nodes: {
                    create: {
                        type: NodeType.INITIAL,
                        position: { x: 0, y: 0 },
                        name: NodeType.INITIAL
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

            const edges: Edge[] = workflow.connections.map((connection) => ({
                id: connection.id,
                source: connection.fromNodeId,
                target: connection.toNodeId,
                sourceHandle: connection.fromOutput,
                targetHandle: connection.toInput
            }))

            return {
                id: workflow.id,
                name: workflow.name,
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
        }),

    update: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                nodes: z.array(
                    z.object({
                        id: z.string(),
                        type: z.string().nullish(),
                        position: z.object({
                            x: z.number(),
                            y: z.number(),
                        }),
                        data: z.record(z.string(), z.any()).optional(),
                    })
                ),
                edges: z.array(
                    z.object({
                        source: z.string(),
                        target: z.string(),
                        sourceHandle: z.string().nullish(),
                        targetHandle: z.string().nullish(),
                    })
                ),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { id, nodes, edges } = input;

            const workflow = await prisma.workflow.findUniqueOrThrow({
                where: {
                    id,
                    userId: ctx.auth.user.id,
                },
            });

            return await prisma.$transaction(async (tx) => {
                // Delete old nodes and edges
                await tx.node.deleteMany({
                    where: { workflowId: workflow.id },
                });
 
                // Create new nodes
                await tx.node.createMany({
                    data: nodes.map((node) => ({
                        id: node.id,
                        workflowId: workflow.id,
                        name: node.type || "unknown",
                        type: node.type as NodeType,
                        position: node.position,
                        data: node.data || {},
                    })),
                });

                // Create new edges
                await tx.connection.createMany({
                    data: edges.map((edge) => ({
                        workflowId:id,
                        fromNodeId: edge.source,
                        toNodeId: edge.target,
                        fromOutput:edge.sourceHandle || "main",
                        toInput :edge.targetHandle || "main",
                    })),
                });

                //updatedAt timestap
                await tx.workflow.update({
                    where:{id},
                    data:{updatedAt:new Date()}
                })

                return workflow;
            });
        }),


})


