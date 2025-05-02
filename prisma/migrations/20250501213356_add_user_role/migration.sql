/*
  Warnings:

  - You are about to drop the column `userId` on the `Produto` table. All the data in the column will be lost.
  - You are about to alter the column `preco` on the `Produto` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - Added the required column `sellerId` to the `Produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Produto` table without a default value. This is not possible if the table is not empty.
  - Made the column `preco` on table `Produto` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Produto" DROP CONSTRAINT "Produto_userId_fkey";

-- AlterTable
ALTER TABLE "Produto" DROP COLUMN "userId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "sellerId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "preco" SET NOT NULL,
ALTER COLUMN "preco" SET DATA TYPE DECIMAL(10,2);

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
