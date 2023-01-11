-- CreateTable
CREATE TABLE "Link" (
    "postId" INTEGER NOT NULL,
    "type" "PostCategory" NOT NULL DEFAULT 'Link',
    "linkURL" TEXT NOT NULL,
    "linkDescription" TEXT,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("postId")
);

-- CreateTable
CREATE TABLE "Photo" (
    "postId" INTEGER NOT NULL,
    "type" "PostCategory" NOT NULL DEFAULT 'Photo',
    "photoLink" TEXT NOT NULL,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("postId")
);

-- CreateTable
CREATE TABLE "Quote" (
    "postId" INTEGER NOT NULL,
    "type" "PostCategory" NOT NULL DEFAULT 'Quote',
    "quoteText" TEXT NOT NULL,
    "quoteAuthor" TEXT NOT NULL,

    CONSTRAINT "Quote_pkey" PRIMARY KEY ("postId")
);

-- CreateTable
CREATE TABLE "Text" (
    "postId" INTEGER NOT NULL,
    "type" "PostCategory" NOT NULL DEFAULT 'Text',
    "postTitle" TEXT NOT NULL,
    "previewText" TEXT NOT NULL,
    "postText" TEXT NOT NULL,

    CONSTRAINT "Text_pkey" PRIMARY KEY ("postId")
);

-- CreateTable
CREATE TABLE "Video" (
    "postId" INTEGER NOT NULL,
    "type" "PostCategory" NOT NULL DEFAULT 'Video',
    "postTitle" TEXT NOT NULL,
    "videoLink" TEXT NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("postId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Link_postId_key" ON "Link"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "Photo_postId_key" ON "Photo"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "Quote_postId_key" ON "Quote"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "Text_postId_key" ON "Text"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "Video_postId_key" ON "Video"("postId");

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Text" ADD CONSTRAINT "Text_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
