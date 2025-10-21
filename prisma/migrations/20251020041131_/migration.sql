-- DropForeignKey
ALTER TABLE "public"."Connection" DROP CONSTRAINT "Connection_fromNodeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Connection" DROP CONSTRAINT "Connection_toNodeId_fkey";

-- AddForeignKey
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_fromNodeId_fkey" FOREIGN KEY ("fromNodeId") REFERENCES "Node"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_toNodeId_fkey" FOREIGN KEY ("toNodeId") REFERENCES "Node"("id") ON DELETE CASCADE ON UPDATE CASCADE;
