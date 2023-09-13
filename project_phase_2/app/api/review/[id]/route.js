import { updateReview } from '../../reviewer/reviewer_repo.js';

export async function PUT(request, {params}){
    const data = await request.json()
    const reviews = await updateReview(data,parseInt(params.id))
    return Response.json(reviews)
}