/*
  Warnings:

  - You are about to drop the column `sub_category` on the `stock_items` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "stock_items" DROP COLUMN "sub_category",
ADD COLUMN     "availability" TEXT[];
