/*
  Warnings:

  - You are about to drop the column `motif` on the `entreprises` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tel]` on the table `entreprises` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `entreprises` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `motif` to the `evaluations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "entreprises" DROP COLUMN "motif";

-- AlterTable
ALTER TABLE "evaluations" ADD COLUMN     "motif" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "entreprises_tel_key" ON "entreprises"("tel");

-- CreateIndex
CREATE UNIQUE INDEX "entreprises_email_key" ON "entreprises"("email");
