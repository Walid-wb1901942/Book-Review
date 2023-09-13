import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function getAuthors(paperId) {
    const authors = await prisma.paper.findUnique({
        where: {
            id: +paperId
        },
        select: {
            authors: true,
            authors:{
            select:{
                user:true
            }
        }
        }
    })
    return authors
}
    