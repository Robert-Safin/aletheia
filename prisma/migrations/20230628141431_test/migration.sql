/*
  Warnings:

  - You are about to drop the column `isVenueOwner` on the `User` table. All the data in the column will be lost.
  - Added the required column `about` to the `Venue` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Venue_name_key` ON `Venue`;

-- AlterTable
ALTER TABLE `Review` MODIFY `rating` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `isVenueOwner`;

-- AlterTable
ALTER TABLE `Venue` ADD COLUMN `about` VARCHAR(1000) NOT NULL,
    ADD COLUMN `city` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `formattedAddress` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `latitude` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `longitude` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `categories` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `averageRating` DOUBLE NOT NULL DEFAULT 0,
    ALTER COLUMN `photo` DROP DEFAULT;
