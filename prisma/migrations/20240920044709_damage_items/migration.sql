-- CreateTable
CREATE TABLE "DamageItems" (
    "id" SERIAL NOT NULL,
    "item_id" INTEGER NOT NULL,
    "type" "ItemQuantityType" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DamageItems_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DamageItems_id_key" ON "DamageItems"("id");

-- AddForeignKey
ALTER TABLE "DamageItems" ADD CONSTRAINT "DamageItems_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "stock_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DamageItems" ADD CONSTRAINT "DamageItems_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
