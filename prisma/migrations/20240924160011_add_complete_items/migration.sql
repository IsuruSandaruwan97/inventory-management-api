/*
  Warnings:

  - The `item` column on the `complete_items` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "complete_items" DROP COLUMN "item",
ADD COLUMN     "item" INTEGER[] DEFAULT ARRAY[]::INTEGER[];
