-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "lat" DROP NOT NULL,
ALTER COLUMN "lng" DROP NOT NULL,
ALTER COLUMN "stockCapacity" DROP NOT NULL,
ALTER COLUMN "currentStock" DROP NOT NULL;