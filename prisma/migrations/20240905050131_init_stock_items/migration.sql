-- CreateTable
CREATE TABLE "item_requests" (
    "id" SERIAL NOT NULL,
    "item_id" INTEGER NOT NULL,
    "note" TEXT,
    "remark" TEXT,
    "reject_reason" TEXT,
    "status" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "userId" UUID,
    "user_role" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "item_requests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "item_requests_id_key" ON "item_requests"("id");

-- AddForeignKey
ALTER TABLE "item_requests" ADD CONSTRAINT "item_requests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_requests" ADD CONSTRAINT "item_requests_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "stock_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
