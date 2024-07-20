/*
  Warnings:

  - You are about to drop the column `title` on the `post` table. All the data in the column will be lost.
  - You are about to drop the `post_tags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `post_tags` DROP FOREIGN KEY `post_tags_postId_fkey`;

-- DropForeignKey
ALTER TABLE `post_tags` DROP FOREIGN KEY `post_tags_tagId_fkey`;

-- AlterTable
ALTER TABLE `post` DROP COLUMN `title`;

-- DropTable
DROP TABLE `post_tags`;

-- DropTable
DROP TABLE `tag`;
