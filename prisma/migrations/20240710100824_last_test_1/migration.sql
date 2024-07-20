-- DropIndex
DROP INDEX `User_phone_key` ON `user`;

-- AlterTable
ALTER TABLE `user` ALTER COLUMN `phone` DROP DEFAULT;
