/*
  Warnings:

  - A unique constraint covering the columns `[share_code]` on the table `Quiz` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "share_code" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Quiz_share_code_key" ON "Quiz"("share_code");
