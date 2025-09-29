/*
  Warnings:

  - You are about to drop the column `question_id` on the `Answer` table. All the data in the column will be lost.
  - Added the required column `result_id` to the `Answer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_question_id_fkey";

-- AlterTable
ALTER TABLE "Answer" DROP COLUMN "question_id",
ADD COLUMN     "result_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_result_id_fkey" FOREIGN KEY ("result_id") REFERENCES "Result"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
