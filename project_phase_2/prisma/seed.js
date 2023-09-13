import fs from 'fs-extra'
import path from 'path'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const usersPath = path.join(process.cwd(), 'app/data/users2.json')
const authorsPath = path.join(process.cwd(), 'app/data/authors.json')
const reviewsPath = path.join(process.cwd(), 'app/data/reviews.json')
const reviewersPath = path.join(process.cwd(), 'app/data/reviewers.json')
const papersPath = path.join(process.cwd(), 'app/data/papers2.json')
const institutionsPath = path.join(process.cwd(), 'app/data/institutions2.json')
const conferencesPath = path.join(process.cwd(), 'app/data/conferenceDates2.json')
const organizersPath = path.join(process.cwd(), 'app/data/organizers.json')
const sessionsPath = path.join(process.cwd(), 'app/data/sessions2.json')
const presentationsPath = path.join(process.cwd(), 'app/data/presentations.json')
const locationsPath = path.join(process.cwd(), 'app/data/locations2.json')
const schedulesPath = path.join(process.cwd(), 'app/data/schedule.json')

async function main() {
    try {
        
        const users = await fs.readJSON(usersPath)
        const authors = await fs.readJSON(authorsPath)
        const papers = await fs.readJSON(papersPath)
        const reviews = await fs.readJSON(reviewsPath)
        const reviewers = await fs.readJSON(reviewersPath)
        const institutions = await fs.readJSON(institutionsPath)
        const conferences = await fs.readJSON(conferencesPath)
        const organizers = await fs.readJSON(organizersPath)
        const sessions = await fs.readJSON(sessionsPath)
        const presentations = await fs.readJSON(presentationsPath)
        const locations = await fs.readJSON(locationsPath)
        const schedules = await fs.readJSON(schedulesPath)

        for(const user of users){
            delete user.id
            await prisma.user.create({ data: user,
                include: {
                    organizer: true,
                    reviewer: true,
                    author: true
                 }
            })
        }
        for(const institution of institutions) await prisma.institution.create({ data: institution })
        for(const author of authors){ 
            console.log(author.id)
            await prisma.author.create({ data: author })
        }
        for(const paper of papers) await prisma.paper.create({ data: paper })
        for(const reviewer of reviewers) await prisma.reviewer.create({ data: reviewer })
        for(const review of reviews) await prisma.review.create({ data: review })
        for(const conference of conferences) await prisma.conference.create({ data: conference })
        for(const organizer of organizers) await prisma.organizer.create({ data: organizer })
        for(const location of locations) await prisma.location.create({ data: location })
        for(const schedule of schedules) await prisma.schedule.create({ data: schedule })
        for(const session of sessions) await prisma.session.create({ data: session })
        for(const presentation of presentations) await prisma.presentation.create({ data: presentation })




    } catch (error) {
        console.log(error);
        return { error: error.message }
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

