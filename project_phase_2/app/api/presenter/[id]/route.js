import { getPresenterName } from  '../../organizer-repo'
export async function GET(request,{params}){
    const id = params.id
    const presenter = await getPresenterName(+id)
    return Response.json(presenter)
}