import { getReviewsByPaperId } from "../../../reviewer_repo.js";

export async function GET(request,{ params }){
    const { paperId } = params;
    console.log(paperId);
    const data = await getReviewsByPaperId(parseInt(paperId));
    // const reviewed = await data.json();
    return Response.json(data);
}