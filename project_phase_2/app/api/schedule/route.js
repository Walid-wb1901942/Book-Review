import {  getScheduleSessions, getSchedules, addScheduleEntry} from '../organizer-repo.js'
export async function GET(request){
    const schedule = await getSchedules()
    return Response.json(schedule)
}

export async function POST(request){
    const body = request.body
    const schedule = await addScheduleEntry(body)
    return Response.json(schedule)
}
