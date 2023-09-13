// const  user = JSON.parse(localStorage.getItem('user'));
// console.log(user);
let  assignedPapers;

const title = document.querySelector('.title');
const authors = document.querySelector('.authors');
const abstract = document.querySelector('.abstract');
const paperCards = document.querySelector('.paper-cards');
let users;

// console.log(JSON.parse(localStorage.getItem('papers')));

//TELL AHMAD TO FINISH LOGIN 
BASE_URL="/api/reviewer/3";
authors_URL = "/api/paper/";
// reviewed_URL = "/api/reviewer/3/reviewed";

async function loadPapers(){
    // const usersRes = await fetch('users.json');
    // users = await usersRes.json(); 
    // if(JSON.parse(localStorage.getItem('papers')) === null){
        // const papers = await fetch('../papers.json');
        // const papersJson = await papers.json();
        // console.log(papersJson);
        // localStorage.setItem('papers',JSON.stringify(papersJson));
    // }
    // const assignedPapers = papersJson.filter(p => p.reviewer_id.find(id => id == user.id));
    // assignedPapers = JSON.parse(localStorage.getItem('papers')).filter(p => p.reviewers.find(r => r.id == user.id));
    // localStorage.setItem('assignedPapers',JSON.stringify(assignedPapers));
    // console.log(assignedPapers);

    const papers = await fetch(BASE_URL);
    console.log(papers);
    const assignedPapers = await papers.json();
    console.log(assignedPapers['papers']);

    // const test = await fetch(authors_URL + '1');
    // console.log(await test.json());
    // async function getAuthors(){
    //     const a = assignedPapers['papers'].map(async (p) => {
    //         const initialData = (await fetch(authors_URL + p.id));
    //         const initialDataJson = await initialData.json();
    //         // return await a.json();
    //     });
    //     return initialDataJson;
    // }   
    // users = getAuthors();
    // console.log(users);
    
    paperCards.innerHTML = assignedPapers['papers'].map(p => getPaperHtml(p)).join("");
}
function getPaperHtml(paper){
    return `
    <div class="paper-card">
        <h2 class="title">${paper.title}</h2>
        <hr>
        <button class="collapsible" onclick="clickCollapsible()">Abstract</button>
        <p class="abstract">${paper.abstract}
        </p>
        <h2>Authors</h2>
        <p class="authors">${paper.authors.map(a => a.user.firstName + " " + a.user.lastName)}</p>
        <h3><a href="${paper.paperPath}" target="_blank">Click here to download the paper</a></h3>
        <button class="review-btn btn" onclick="loadForm('${paper.id}')">Review this Paper</button>
    </div>`
}
// OLD HTML BEFORE NEW PAPERS.JSON
// <p class="authors">${paper.authors.map(aid => users.filter(u => u.id == aid)[0].first_name)}</p>

//users.filter(u => u.id == paper.authors[0])[0].first_name

const reviewBtn = document.querySelector(".review-btn");
// const reviewer = require("./login.js");
// console.log(reviewer);

// reviewBtn.addEventListener("click",loadForm);

// function objectToForm(paper){
//     const desiredReview = paper.reviews.find(r => r.reviewer_id == user.id);
//     document.querySelector('#strengths').value = desiredReview.strengths;
// }

async function loadForm(paperId){
    // const selectedPaper = assignedPapers.find(p => p.id == id);
    // if(selectedPaper.reviews.findIndex(sp => sp.reviewer_id == user.id) != -1){
    //     console.log("this paper has been reviewed");
    //     objectToForm(selectedPaper);
    // }
    // console.log(id);
    localStorage.setItem('selectedPaper',paperId);

    // const reviewedPaper = await fetch(reviewed_URL);
    // const reviewedPaperJson = await reviewedPaper.json();
    // if(!reviewedPaperJson){

    // }

    window.location.href = "../review.html";
    // await services.loadForm(paperId);
}



function clickCollapsible(){
    const collapsibles = document.getElementsByClassName("collapsible");
    let i;
    for (i = 0; i < collapsibles.length; i++) {
        collapsibles[i].addEventListener("click", collapse)
    }    
}

function collapse(){
    let content = document.querySelector('.abstract');
    content = this.nextElementSibling;
    if (content.style.display != "none") {
        content.style.display = "none";
    } else {
        content.style.display = "block";
    }
}


