const container = document.querySelector('#StatReport');

async function loadStatReport() {

const statReport = await fetch('/api/statisticsReport');
const statReportJson = await statReport.json();

const numberOfSubmittedPapers = statReportJson.numberOfSubmittedPapers;
const numberOfAcceptedPapers = statReportJson.numberOfAcceptedPapers;
const numberOfRejectedPapers = statReportJson.numberOfRejectedPapers;
const avgAuthorsPerPaper = statReportJson.avgAuthorsPerPaper;
const avgPresentationsPerSession = statReportJson.avgPresentationsPerSession;
const numberOfSessions = statReportJson.numberOfSessions;

const statReportHtml = `
<h1>Statistics Report</h1>
<table id="Schedules">
    <tbody>
        <tr>
            <td>Number of Submitted Papers</td>
            <td>Number of Accepted Papers</td>
            <td>Number of Rejected Papers</td>
            <td>Average Number of Authors per Paper</td>
            <td>Number of Sessions</td>
            <td>Average Number of Presentations per Session</td>
        </tr>
        <tr>
            <td>${numberOfSubmittedPapers}</td>
            <td>${numberOfAcceptedPapers}</td>
            <td>${numberOfRejectedPapers}</td>
            <td>${avgAuthorsPerPaper}</td>
            <td>${numberOfSessions}</td>
            <td>${avgPresentationsPerSession}</td>
        </tr>
    </tbody>
</table>
<br>
<br>

`;

container.innerHTML = statReportHtml;
}

loadStatReport();
