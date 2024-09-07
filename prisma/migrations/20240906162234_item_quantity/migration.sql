-- CreateEnum
CREATE TYPE "ItemQuantityType" AS ENUM ('store', 'stock', 'production', 'delivery');

-- CreateTable
CREATE TABLE "item_quantity" (
    "id" SERIAL NOT NULL,
    "item_id" INTEGER NOT NULL,
    "type" "ItemQuantityType" NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "item_quantity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "item_quantity_id_key" ON "item_quantity"("id");

-- AddForeignKey
ALTER TABLE "item_quantity" ADD CONSTRAINT "item_quantity_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "stock_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
