-- DropIndex
DROP INDEX "stock_items_code_key";

-- AddForeignKey
ALTER TABLE "stock_items" ADD CONSTRAINT "stock_items_category_fkey" FOREIGN KEY ("category") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_items" ADD CONSTRAINT "stock_items_sub_category_fkey" FOREIGN KEY ("sub_category") REFERENCES "subcategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
