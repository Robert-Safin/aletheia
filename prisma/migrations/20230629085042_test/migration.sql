/*
  Warnings:

  - You are about to drop the column `isVenueOwner` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `isVenueOwner`,
    ADD COLUMN `isAdmin` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Venue` ADD COLUMN `isVerified` BOOLEAN NOT NULL DEFAULT false;
