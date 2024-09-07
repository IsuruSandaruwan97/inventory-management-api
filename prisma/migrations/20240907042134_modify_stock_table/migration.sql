/*
  Warnings:

  - You are about to drop the column `type` on the `category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "category" DROP COLUMN "type";

-- AlterTable
ALTER TABLE "subcategory" ADD COLUMN     "type" TEXT[];
