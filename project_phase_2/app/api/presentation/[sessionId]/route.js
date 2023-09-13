import {getPresentationsbySessionId, updatePresentationBySessionId} from '../../presentation-repo.js'
export  async function GET(request, {params}){
    const presentations = await getPresentationsbySessionId(params.sessionId)
    return Response.json(presentations)
}

export async function PUT(request, {params}){
    const newPresentation = await request.json()
    const presentation = await updatePresentationBySessionId(newPresentation, params.sessionId)
    return Response.json (presentation,{status: 201})
}