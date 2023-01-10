/*
  Warnings:

  - You are about to drop the column `type` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Text` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Video` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Link" DROP COLUMN "type",
ADD COLUMN     "postCategory" "PostCategory" NOT NULL DEFAULT 'Link';

-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "type",
ADD COLUMN     "postCategory" "PostCategory" NOT NULL DEFAULT 'Photo';

-- AlterTable
ALTER TABLE "Quote" DROP COLUMN "type",
ADD COLUMN     "postCategory" "PostCategory" NOT NULL DEFAULT 'Quote';

-- AlterTable
ALTER TABLE "Text" DROP COLUMN "type",
ADD COLUMN     "postCategory" "PostCategory" NOT NULL DEFAULT 'Text';

-- AlterTable
ALTER TABLE "Video" DROP COLUMN "type",
ADD COLUMN     "postCategory" "PostCategory" NOT NULL DEFAULT 'Video';
