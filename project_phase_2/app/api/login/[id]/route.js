import { getUserById,getUsers} from '../../users-repo'

export async function GET(request){
    const user = await getUserById()
    return Response.json(user)
}

export async function GET(request){
    const user = await getUsers()
    return Response.json(user)
}

