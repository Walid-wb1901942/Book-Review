import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const getLocations = async () => {
    const locations = await prisma.location.findMany()
    return locations
}
export const getDates = async () => {
    const dates = await prisma.conference.findMany()
    return dates
}

export const getAcceptedPapers = async () => {
    const papers = await prisma.paper.findMany({
        where: {
            overallEvaluation: {
                gt:2
            }
        },
        
        }
    )
    return papers
}
export const getSchedules = async () => {
    const schedules = await prisma.schedule.findMany({
        include: {
            sessions: {
                include: {
                    presentations: {
                        include: {
                            paper: {

                                include: {
                                    authors: true
                                }
                            }
                        }
                    }
                },
            },
        },
    });
    return schedules
}
export const getDate = async (date) => {
    if (date == 'All') {
        const dates = await prisma.conference.findMany()
        return dates
    }
    else {
    const dates = await prisma.conference.findMany({
        where: {
            date
        }
    })

    return dates
}
}

export const getNameFromPaperId = async (id) => {
    const papers = await prisma.paper.findMany({
        where: {
            id: +id
        },
        include: {
            authors: {
                include: {
                    user: true
                }
            }
        }
    })
    const firstName = papers[0]?.authors[0]?.user?.firstName;
    return papers;
    // console.log("PAPERS: ",papers)
    // return papers[0]
}
export const getPresenterName = async (id) => {
    const authors = await prisma.paper.findUnique({
        where: {
            id: +id
        },
        select: {
            authors: {
                select:{
                    user:{
                        select:{
                            firstName:true,
                            lastName:true

                        }
                    
                    }
                },
                where: {
                    presenter: true
                },

            }
        }
    })
    return authors

}

export const getSchedule = async (id) => {
    const schedule = await prisma.schedule.findUnique({
        where: {
            id: parseInt(id)
        }
    })
    return schedule
}
export const getScheduleSessions = async (id) => {
    const schedule = await prisma.schedule.findUnique({
        where: {
            id: parseInt(id)
        },
        include: {
            sessions: true
        }
    })
    return schedule
}
export const addSession = async (data) => {
    const session = await prisma.session.create({
        data: {
            ...data
        }
    })
    return session
}
export const updateSession = async (id, data) => {
    const session = await prisma.session.update({
        where: {
            id: parseInt(id)
        },
        data: {
            ...data
        }
    })
    return session
}
export const deleteSession = async (id) => {
    const session = await prisma.session.delete({
        where: {
            id: parseInt(id)
        }
    })
    return session
}
export const getSession = async (id) => {
    const session = await prisma.session.findUnique({
        where: {
            id: parseInt(id)
        }
    })
    return session
}
export const getSessions = async () => {
    const sessions = await prisma.session.findMany()
    return sessions
}

export const addScheduleEntry = async (data) => {
    const scheduleEntry = await prisma.schedule.create({
        data: {
            ...data
        }
    })
    return scheduleEntry
}

export const getSessionByTitle = async (title) =>{
    const session = await prisma.session.findMany({
        where:{
            title
        },
        include:{
            presentations:true
        }

    })
    return session
}


export const getPaperByTitle = async (title) =>{
    const paper = await prisma.paper.findMany({
        where:{
            title
        },
        include:{
            authors:{
                include:{
                    user:true
                }
            }
        }
    })
    return paper
}

export const getPresentationPapersBySessionId = async (id) => {
    const presentationPapers = await prisma.presentation.findMany({
        where: {
            paperId: parseInt(id)
        },
        include: {
            paper: {
                include: {
                    authors: {
                    include:{
                        user:true
                    }
                }
            }
        }
        }
    })
    return presentationPapers
}
