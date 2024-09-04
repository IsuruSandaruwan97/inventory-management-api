/*
  Warnings:

  - You are about to drop the column `created_at` on the `stock_items` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `stock_items` table. All the data in the column will be lost.
  - You are about to drop the column `updated_by` on the `stock_items` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "stock_items" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
DROP COLUMN "updated_by",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "updatedBy" UUID;

-- AddForeignKey
ALTER TABLE "stock_items" ADD CONSTRAINT "stock_items_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
