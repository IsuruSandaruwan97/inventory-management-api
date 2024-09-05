/*
  Warnings:

  - Changed the type of `category` on the `subcategory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "subcategory" DROP CONSTRAINT "subcategory_category_fkey";

-- AlterTable
ALTER TABLE "subcategory" DROP COLUMN "category",
ADD COLUMN     "category" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "subcategory" ADD CONSTRAINT "subcategory_category_fkey" FOREIGN KEY ("category") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
