/*
  Warnings:

  - You are about to drop the column `content` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `isPublished` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `originalId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Post` table. All the data in the column will be lost.
  - Added the required column `isDraft` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postCategory` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postContent` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "content",
DROP COLUMN "isPublished",
DROP COLUMN "originalId",
DROP COLUMN "type",
ADD COLUMN     "isDraft" BOOLEAN NOT NULL,
ADD COLUMN     "originalPostId" SERIAL NOT NULL,
ADD COLUMN     "postCategory" TEXT NOT NULL,
ADD COLUMN     "postContent" JSONB NOT NULL;
