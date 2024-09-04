/*
  Warnings:

  - You are about to alter the column `unit_price` on the `stock_items` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "stock_items" ALTER COLUMN "unit_price" SET DATA TYPE DECIMAL(10,2);
