-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Author" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "affiliation" TEXT NOT NULL,
    "presenter" BOOLEAN NOT NULL,
    "role" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    CONSTRAINT "Author_affiliation_fkey" FOREIGN KEY ("affiliation") REFERENCES "Institution" ("title") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Author_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Paper" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "abstract" TEXT NOT NULL,
    "overallEvaluation" INTEGER NOT NULL,
    "paperPath" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Reviewer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "reviewerId" INTEGER NOT NULL,
    "role" TEXT NOT NULL,
    CONSTRAINT "Reviewer_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "evaluation" INTEGER NOT NULL,
    "contribution" INTEGER NOT NULL,
    "strengths" TEXT NOT NULL,
    "weaknesses" TEXT NOT NULL,
    "reviewerId" INTEGER NOT NULL,
    "paperId" INTEGER NOT NULL,
    CONSTRAINT "Review_paperId_fkey" FOREIGN KEY ("paperId") REFERENCES "Paper" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Review_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "Reviewer" ("reviewerId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Institution" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Organizer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "organizerId" INTEGER NOT NULL,
    "role" TEXT NOT NULL,
    CONSTRAINT "Organizer_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- CreateTable
CREATE TABLE "Session" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "confDate" TEXT NOT NULL,
    "scheduleId" INTEGER NOT NULL,
    CONSTRAINT "Session_location_fkey" FOREIGN KEY ("location") REFERENCES "Location" ("title") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Session_confDate_fkey" FOREIGN KEY ("confDate") REFERENCES "Conference" ("date") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Session_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Conference" (
    "date" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Presentation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "fromTime" TEXT NOT NULL,
    "toTime" TEXT NOT NULL,
    "sessionId" INTEGER NOT NULL,
    "paperId" INTEGER NOT NULL,
    CONSTRAINT "Presentation_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Presentation_paperId_fkey" FOREIGN KEY ("paperId") REFERENCES "Paper" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Location" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AuthorToPaper" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_AuthorToPaper_A_fkey" FOREIGN KEY ("A") REFERENCES "Author" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AuthorToPaper_B_fkey" FOREIGN KEY ("B") REFERENCES "Paper" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_Reviewers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_Reviewers_A_fkey" FOREIGN KEY ("A") REFERENCES "Paper" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_Reviewers_B_fkey" FOREIGN KEY ("B") REFERENCES "Reviewer" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Author_authorId_key" ON "Author"("authorId");

-- CreateIndex
CREATE UNIQUE INDEX "Reviewer_reviewerId_key" ON "Reviewer"("reviewerId");

-- CreateIndex
CREATE UNIQUE INDEX "Institution_title_key" ON "Institution"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Organizer_organizerId_key" ON "Organizer"("organizerId");

-- CreateIndex
CREATE UNIQUE INDEX "Conference_date_key" ON "Conference"("date");

-- CreateIndex
CREATE UNIQUE INDEX "Presentation_sessionId_key" ON "Presentation"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "Presentation_paperId_key" ON "Presentation"("paperId");

-- CreateIndex
CREATE UNIQUE INDEX "Location_title_key" ON "Location"("title");

-- CreateIndex
CREATE UNIQUE INDEX "_AuthorToPaper_AB_unique" ON "_AuthorToPaper"("A", "B");

-- CreateIndex
CREATE INDEX "_AuthorToPaper_B_index" ON "_AuthorToPaper"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Reviewers_AB_unique" ON "_Reviewers"("A", "B");

-- CreateIndex
CREATE INDEX "_Reviewers_B_index" ON "_Reviewers"("B");
