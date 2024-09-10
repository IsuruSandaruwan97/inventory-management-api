/*
  Warnings:

  - You are about to drop the `stock` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "stock" DROP CONSTRAINT "stock_item_id_fkey";

-- DropTable
DROP TABLE "stock";

-- CreateTable
CREATE TABLE "itemStock" (
    "id" SERIAL NOT NULL,
    "item_id" INTEGER NOT NULL,
    "type" "ItemQuantityType" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit_price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "itemStock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "itemStock_id_key" ON "itemStock"("id");

-- AddForeignKey
ALTER TABLE "itemStock" ADD CONSTRAINT "itemStock_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "stock_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
