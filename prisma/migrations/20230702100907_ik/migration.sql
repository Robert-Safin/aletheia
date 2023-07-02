/*
  Warnings:

  - You are about to drop the column `end` on the `Offer` table. All the data in the column will be lost.
  - You are about to drop the column `start` on the `Offer` table. All the data in the column will be lost.
  - You are about to drop the column `category4` on the `Venue` table. All the data in the column will be lost.
  - You are about to drop the column `category5` on the `Venue` table. All the data in the column will be lost.
  - Added the required column `name` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `Offer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `Offer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isRecurring` to the `Offer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Offer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Offer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Offer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Event` ADD COLUMN `name` VARCHAR(191) NOT NULL,
    MODIFY `QRQuntity` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `Offer` DROP COLUMN `end`,
    DROP COLUMN `start`,
    ADD COLUMN `endDate` DATETIME(3) NOT NULL,
    ADD COLUMN `endTime` DATETIME(3) NOT NULL,
    ADD COLUMN `isRecurring` BOOLEAN NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `onFriday` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `onMonday` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `onSaturday` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `onSunday` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `onThursday` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `onTuesday` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `onWednesday` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `startDate` DATETIME(3) NOT NULL,
    ADD COLUMN `startTime` DATETIME(3) NOT NULL,
    MODIFY `QRQuntity` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `Venue` DROP COLUMN `category4`,
    DROP COLUMN `category5`;
