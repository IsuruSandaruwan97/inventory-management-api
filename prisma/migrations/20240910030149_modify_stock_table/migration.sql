/*
  Warnings:

  - You are about to drop the `itemStock` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "itemStock" DROP CONSTRAINT "itemStock_item_id_fkey";

-- DropTable
DROP TABLE "itemStock";

-- CreateTable
CREATE TABLE "stock" (
    "id" SERIAL NOT NULL,
    "item_id" INTEGER NOT NULL,
    "type" "ItemQuantityType" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit_price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "stock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "stock_id_key" ON "stock"("id");

-- AddForeignKey
ALTER TABLE "stock" ADD CONSTRAINT "stock_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "stock_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
