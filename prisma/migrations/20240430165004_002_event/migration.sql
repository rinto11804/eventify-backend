-- CreateTable
CREATE TABLE "Event" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "from" TIME NOT NULL,
    "to" TIME NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);
