import { getPresentationPapersBySessionId } from '../../../organizer-repo.js'

export async function GET(request, { params }) {
  const presentationPapers = await getPresentationPapersBySessionId(params.paperId);
  return Response.json(presentationPapers);
}