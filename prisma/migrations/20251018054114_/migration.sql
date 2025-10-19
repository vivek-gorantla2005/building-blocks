-- DropForeignKey
ALTER TABLE "public"."Node" DROP CONSTRAINT "Node_id_fkey";

-- AddForeignKey
ALTER TABLE "Node" ADD CONSTRAINT "Node_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "Workflow"("id") ON DELETE CASCADE ON UPDATE CASCADE;
