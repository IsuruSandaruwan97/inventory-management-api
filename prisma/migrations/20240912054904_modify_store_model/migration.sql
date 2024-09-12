-- CreateEnum
CREATE TYPE "ProductionState" AS ENUM ('pending', 'completed', 'damaged', 'return');

-- AlterTable
ALTER TABLE "stock" ADD COLUMN     "production_state" "ProductionState" NOT NULL DEFAULT 'pending';
