/*
  Warnings:

  - You are about to drop the column `userId` on the `Agenda` table. All the data in the column will be lost.
  - Added the required column `sellerId` to the `Agenda` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Agenda` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Agenda" DROP CONSTRAINT "Agenda_userId_fkey";

-- AlterTable
ALTER TABLE "Agenda" DROP COLUMN "userId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "sellerId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Agenda" ADD CONSTRAINT "Agenda_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
