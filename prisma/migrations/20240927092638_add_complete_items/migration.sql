-- AddForeignKey
ALTER TABLE "complete_items" ADD CONSTRAINT "complete_items_category_fkey" FOREIGN KEY ("category") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
