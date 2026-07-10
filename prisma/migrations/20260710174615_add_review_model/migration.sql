/*
  Warnings:

  - You are about to drop the column `aiFeedback` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `sourceCode` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Review` table. All the data in the column will be lost.
  - Added the required column `bugs` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `improvedCode` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spaceComplexity` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `suggestions` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summary` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeComplexity` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Made the column `score` on table `Review` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Review" DROP COLUMN "aiFeedback",
DROP COLUMN "sourceCode",
DROP COLUMN "updatedAt",
ADD COLUMN     "bugs" JSONB NOT NULL,
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "improvedCode" TEXT NOT NULL,
ADD COLUMN     "spaceComplexity" TEXT NOT NULL,
ADD COLUMN     "suggestions" JSONB NOT NULL,
ADD COLUMN     "summary" TEXT NOT NULL,
ADD COLUMN     "timeComplexity" TEXT NOT NULL,
ALTER COLUMN "score" SET NOT NULL;
