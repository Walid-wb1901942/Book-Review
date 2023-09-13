import { getAuthors } from '../paper-repo.js';
export async function GET(request,{params}) {
    const authors = await getAuthors(+params.id);
    return Response.json(authors);
}