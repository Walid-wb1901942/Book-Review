import { getSessionByTitle } from '../../organizer-repo.js'
export async function GET(request,{params}){
    const session = await getSessionByTitle(params.title)
    return Response.json(session)
}