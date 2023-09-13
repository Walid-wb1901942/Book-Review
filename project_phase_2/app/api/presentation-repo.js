import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function addPresentation(presentation){
    const newPrezi = await prisma.presentation.create({
        data: {
            ...presentation
        }})
    return newPrezi
}
export async function getPresentationsbySessionId(sessionId){
    const presentations = await prisma.presentation.findUnique({
        where: {
            sessionId: parseInt(sessionId)
        }
    })
    return presentations
}

export async function updatePresentationBySessionId(presentation, sessionId){
    const updatedPrezi = await prisma.presentation.update({
        where: {
            sessionId: parseInt(sessionId)
        },
        data: {
            ...presentation
        }
    })
    return updatedPrezi
}