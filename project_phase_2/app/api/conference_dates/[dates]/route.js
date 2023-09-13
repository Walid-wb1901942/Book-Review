import { getDate } from  '../../organizer-repo'
export async function GET(request,{params}){
  
    const dates = await getDate(params.dates)
    return Response.json(dates)

}