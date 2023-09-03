/*
  Warnings:

  - You are about to drop the `Add` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Add";

-- CreateTable
CREATE TABLE "Ad" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expiredAt" TIMESTAMP(3) NOT NULL,
    "catogory" TEXT NOT NULL,
    "photos" TEXT[],
    "title" VARCHAR(16) NOT NULL,
    "description" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Ad_pkey" PRIMARY KEY ("id")
);
