/*
  Warnings:

  - You are about to drop the `Like` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PostToTag` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `postCategory` on the `Post` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PostCategory" AS ENUM ('Video', 'Text', 'Quote', 'Photo', 'Link');

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_postId_fkey";

-- DropForeignKey
ALTER TABLE "_PostToTag" DROP CONSTRAINT "_PostToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_PostToTag" DROP CONSTRAINT "_PostToTag_B_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "likes" TEXT[],
ADD COLUMN     "tagsList" TEXT[],
DROP COLUMN "postCategory",
ADD COLUMN     "postCategory" "PostCategory" NOT NULL,
ALTER COLUMN "repostsCount" SET DEFAULT 0;

-- DropTable
DROP TABLE "Like";

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "_PostToTag";

-- DropEnum
DROP TYPE "PublicationType";
