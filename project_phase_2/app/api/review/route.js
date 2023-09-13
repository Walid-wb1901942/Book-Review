import { createReview } from "../reviewer/reviewer_repo.js";

// to add a review
export async function POST(request){
    const data = await request.json()
    const reviews = await createReview(data)
    return Response.json(reviews)
}