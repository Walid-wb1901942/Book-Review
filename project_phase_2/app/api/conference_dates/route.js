import { getDates } from  '../organizer-repo'
export async function GET(request){
    const dates = await getDates()
    return Response.json(dates)
}