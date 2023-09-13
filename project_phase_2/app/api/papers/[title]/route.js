import { getPaperByTitle } from '../../organizer-repo.js'
export async function GET(request,{params}){
    const paper = await getPaperByTitle(params.title)
    return Response.json(paper)
}