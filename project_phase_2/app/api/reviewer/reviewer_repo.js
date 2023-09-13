import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function getReviewsByReviewerId(id) {
    const reviews = await prisma.review.findMany({
        where: {
            reviewerId: id
        }
    })
    return reviews
}

export async function getPapersToReview(id){
    const papers = await prisma.reviewer.findMany({
        where:{
            reviewerId:id
        },
        include:{
            papers:true,
            papers:{
            include:{
                authors:{
                    include:{
                        user:true
                    }
                }
            }
        }
        }
    })
    return papers[0]
}

export async function updateReview(data, id){
    const review = await prisma.review.update({
        where:{
            id:id
        },
        data:{
            ...data
        }
    })
    return review
}

export async function createReview(data){
    const review = await prisma.review.create({
        data:{
            ...data
        }
    })
    return review
}

export async function getReviewsByPaperId(id){
    const reviews = await prisma.review.findMany({
        where:{
            paperId:id
        }
    })
    return reviews
}