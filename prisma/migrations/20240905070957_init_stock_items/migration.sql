-- AlterTable
ALTER TABLE "item_requests" ADD COLUMN     "acition_taken" UUID,
ADD COLUMN     "action_date" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "item_requests" ADD CONSTRAINT "item_requests_acition_taken_fkey" FOREIGN KEY ("acition_taken") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
