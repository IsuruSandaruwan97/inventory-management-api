/*
  Warnings:

  - Added the required column `requestId` to the `item_requests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "item_requests" ADD COLUMN     "requestId" INTEGER NOT NULL;
