import { addPresentation } from '../presentation-repo.js';
export  async function POST(request){
    const newPresentation = await request.json()
    const presentation = await addPresentation(newPresentation)
    return Response.json (presentation,{status: 201})
}


