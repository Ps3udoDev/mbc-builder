/*
  Warnings:

  - A unique constraint covering the columns `[name,userId]` on the table `ModelBussines` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ModelBussines_name_userId_key" ON "ModelBussines"("name", "userId");
