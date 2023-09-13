import { getStatisticsReport } from '../statisticsReport.js';


export async function GET(request) {
    const data = await getStatisticsReport();
    return Response.json(data);
}