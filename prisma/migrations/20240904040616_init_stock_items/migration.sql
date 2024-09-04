-- CreateTable
CREATE TABLE "stock_items" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "image" TEXT,
    "category" INTEGER NOT NULL,
    "sub_category" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "reorder_level" INTEGER NOT NULL,
    "unit_price" DECIMAL(65,30) NOT NULL,
    "last_order" TIMESTAMP(3) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "updated_by" UUID,
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stock_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "stock_items_id_key" ON "stock_items"("id");

-- CreateIndex
CREATE UNIQUE INDEX "stock_items_code_key" ON "stock_items"("code");
