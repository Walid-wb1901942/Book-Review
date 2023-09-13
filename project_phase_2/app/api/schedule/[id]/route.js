import { getNameFromPaperId, getScheduleSessions} from '../../organizer-repo'
export async function GET(request,{params}){
    const id = params.id
    const schedule = await getNameFromPaperId(+id)
    return Response.json(schedule)
}