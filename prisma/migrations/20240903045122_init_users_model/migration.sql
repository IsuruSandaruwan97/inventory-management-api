/*
  Warnings:

  - You are about to drop the column `login_attempts` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "login_attempts";
