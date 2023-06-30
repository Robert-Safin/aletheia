/*
  Warnings:

  - You are about to drop the column `photo` on the `Venue` table. All the data in the column will be lost.
  - Added the required column `mainPhoto` to the `Venue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Venue` DROP COLUMN `photo`,
    ADD COLUMN `category1` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `category2` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `category3` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `category4` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `category5` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `mainPhoto` VARCHAR(191) NOT NULL;
