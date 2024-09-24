-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('bottle', 'lid', 'label');

-- AlterTable
ALTER TABLE "stock_items" ADD COLUMN     "type" "ItemType" NOT NULL DEFAULT 'bottle';

-- CreateTable
CREATE TABLE "complete_items" (
    "id" SERIAL NOT NULL,
    "category" INTEGER NOT NULL,
    "item" INTEGER,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "complete_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "complete_items_id_key" ON "complete_items"("id");
