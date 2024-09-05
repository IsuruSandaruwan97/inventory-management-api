/*
  Warnings:

  - You are about to drop the column `requestId` on the `item_requests` table. All the data in the column will be lost.
  - Added the required column `request_id` to the `item_requests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "item_requests" DROP COLUMN "requestId",
ADD COLUMN     "request_id" INTEGER NOT NULL;
