/*
  Warnings:

  - You are about to drop the column `acition_taken` on the `item_requests` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "item_requests" DROP CONSTRAINT "item_requests_acition_taken_fkey";

-- AlterTable
ALTER TABLE "item_requests" DROP COLUMN "acition_taken",
ADD COLUMN     "action_taken" UUID;

-- AddForeignKey
ALTER TABLE "item_requests" ADD CONSTRAINT "item_requests_action_taken_fkey" FOREIGN KEY ("action_taken") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
