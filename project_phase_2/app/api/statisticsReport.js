import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function getStatisticsReport(){
    const numberOfSubmittedPapers = await prisma.paper.count();
    const numberOfAcceptedPapers = await prisma.paper.count({
        where: {
            overallEvaluation:{
                gt: 2
            }
        }
    })  

    console.log(numberOfAcceptedPapers);

    const numberOfRejectedPapers = await prisma.paper.count({
        where: {
            overallEvaluation:{
                lt: 3
            }
        }})
    console.log(numberOfRejectedPapers);

    const totalAuthors = await prisma.author.count();
    const totlPapers = await prisma.paper.count();
    const avgAuthorsPerPaper = totalAuthors/totlPapers;

    const numberOfSessions = await prisma.session.count();
    const numberOfPresentations = await prisma.presentation.count();

    const avgPresentationsPerSession = numberOfPresentations/numberOfSessions;

    const statisticsReport = {
        numberOfSubmittedPapers:numberOfSubmittedPapers,
        numberOfAcceptedPapers:numberOfAcceptedPapers,
        numberOfRejectedPapers:numberOfRejectedPapers,
        avgAuthorsPerPaper:Math.round(avgAuthorsPerPaper),
        numberOfSessions:numberOfSessions,
        avgPresentationsPerSession:Math.round(avgPresentationsPerSession)
    }
    console.log(statisticsReport);

    return statisticsReport;

}