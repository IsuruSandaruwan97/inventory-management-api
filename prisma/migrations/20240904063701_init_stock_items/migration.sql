/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `stock_items` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "stock_items" DROP CONSTRAINT "stock_items_sub_category_fkey";

-- AlterTable
ALTER TABLE "stock_items" ALTER COLUMN "sub_category" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "stock_items_code_key" ON "stock_items"("code");

-- AddForeignKey
ALTER TABLE "stock_items" ADD CONSTRAINT "stock_items_sub_category_fkey" FOREIGN KEY ("sub_category") REFERENCES "subcategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
