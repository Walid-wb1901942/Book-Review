import { updateSession,getSession,deleteSession,addSession} from '../../organizer-repo'
export async function GET(request,{params}){
    const id = params.id
    const session = await getSession(id)
    return Response.json(session)
}
export async function PUT(request, {params}){
    const id = params.id
    const newSession = await request.json()
    const session = await updateSession(id,newSession)
    return Response.json (session,{status: 201})
}
export async function DELETE(request,{params}){
    const id = params.id
    const session = await deleteSession(id)
    return Response.json(session)
}

