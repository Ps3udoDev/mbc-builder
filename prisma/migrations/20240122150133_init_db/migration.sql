-- CreateTable
CREATE TABLE "ModelBussines" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "content" TEXT NOT NULL DEFAULT '[]',
    "visits" INTEGER NOT NULL DEFAULT 0,
    "submissions" INTEGER NOT NULL DEFAULT 0,
    "shareURL" TEXT NOT NULL,

    CONSTRAINT "ModelBussines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModelBussinesSubissions" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modelBussinesId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "ModelBussinesSubissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "ModelBussinesSubissions" ADD CONSTRAINT "ModelBussinesSubissions_modelBussinesId_fkey" FOREIGN KEY ("modelBussinesId") REFERENCES "ModelBussines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
