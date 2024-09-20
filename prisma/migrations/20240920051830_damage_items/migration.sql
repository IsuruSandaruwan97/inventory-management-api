/*
  Warnings:

  - You are about to drop the `DamageItems` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DamageItems" DROP CONSTRAINT "DamageItems_item_id_fkey";

-- DropForeignKey
ALTER TABLE "DamageItems" DROP CONSTRAINT "DamageItems_userId_fkey";

-- DropTable
DROP TABLE "DamageItems";

-- CreateTable
CREATE TABLE "damage_items" (
    "id" SERIAL NOT NULL,
    "item_id" INTEGER NOT NULL,
    "type" "ItemQuantityType" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "damage_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "damage_items_id_key" ON "damage_items"("id");

-- AddForeignKey
ALTER TABLE "damage_items" ADD CONSTRAINT "damage_items_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "stock_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "damage_items" ADD CONSTRAINT "damage_items_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
