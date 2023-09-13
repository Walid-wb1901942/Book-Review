import { getAcceptedPapers } from  '../organizer-repo'
export async function GET(request){
    const paper = await getAcceptedPapers()
    return Response.json(paper)
}