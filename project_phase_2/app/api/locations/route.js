import { getLocations } from  '../organizer-repo'
export async function GET(request){
    const locations = await getLocations()
    return Response.json(locations)
}