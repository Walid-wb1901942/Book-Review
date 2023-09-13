import { getPapersToReview, createReview, updateReview } from '../reviewer_repo.js';
export async function GET(request,{params}){
    const { id } = params
    const papers = await getPapersToReview(parseInt(id))
    return Response.json(papers)
}
