import { getUsers} from '../users-repo'
export async function GET(request){
    const user = await getUsers()
    return Response.json(user)
}

export const getUserById = async (id) => {
    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(id)
        }
    })
    return user
}

export const getUsers = async () => {
    const user = await prisma.user.findMany()
    return user
}

export const deleteUser = async (id) => {
    const user = await prisma.user.delete({
        where: {
            id: parseInt(id)
        }
    })
    return user
}