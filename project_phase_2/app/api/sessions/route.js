import { addSession, getSessions} from '../organizer-repo'
export async function GET(request){
    const sessions = await getSessions()
    return Response.json(sessions)
}
export async function POST(request){
    const newSession = await request.json()
    const session = await addSession(newSession)
    return Response.json (session,{status: 201})
}