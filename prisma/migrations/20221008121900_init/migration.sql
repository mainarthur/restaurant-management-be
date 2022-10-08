-- CreateTable
CREATE TABLE "Restaurants" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Restaurants_pkey" PRIMARY KEY ("id")
);
