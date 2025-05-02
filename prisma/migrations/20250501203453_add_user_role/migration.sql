-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CLIENT', 'SELLER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "Role" "Role" NOT NULL DEFAULT 'CLIENT';
