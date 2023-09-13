import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const dataFilePath = "data/papers.json"
export const getPapers = async () => await readJSON(dataFilePath)

export const getPaper = async (id) => {
    const getpaper = await prisma.paper.findMany({
        where: {
            id 
        }
    })
    return getpaper
}

export const addPaper = async (id,data) => {
    const paper = await prisma.paper.create({
        data: {
            ...data
        }
    })
    return paper
}




export async function getPaperById(id) {
  const papers = await getPapers()
  return papers.find((p) => p.id == id)
}

export async function addPaper(paper) {
  try {
    const papers = await getPapers()
    console.log("addPaper - paper: ", paper)
    paper.id = Math.max(...papers.map((paper) => paper.id)) + 1 ?? 1
    paper.reviewers = await getRandomReviewers() //assign paper to random reviewers
    papers.push(paper)
    await writeJSON(dataFilePath, papers)
    return paper
  } catch (error) {
    console.log("addPaper - error: ", error)
    throw error
  }
}