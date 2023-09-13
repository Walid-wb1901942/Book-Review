// import fs from 'fs';

// const reviewBtn = document.querySelector("#review-btn");
// // const reviewer = require("./login.js");
// // console.log(reviewer);

// reviewBtn.addEventListener("click",loadForm);
// function loadForm(){
//     window.location.href = "../review.html";
// }


// paperToReview.addEventListener('click',loadPapers);

let assignedPapers;
let selectedPaper;
let reviewedPaperJson;


async function loadFormPage(){

    BASE_URL="/api/reviewer/3";
    const papers = await fetch(BASE_URL);
    assignedPapers = await papers.json();
    console.log(assignedPapers['papers']);

    reviewed_URL = "/api/reviewer/3/reviewed/";

    const reviewHdr = document.querySelector('#reviewHdr');
    // const assignedPapers = JSON.parse(localStorage.getItem('assignedPapers'));
    const selectedPaperId = localStorage.getItem('selectedPaper');


    //have it as API
    selectedPaper = assignedPapers['papers'].find(p => p.id == selectedPaperId);

    reviewHdr.innerHTML = `Please fill out the form to review ${selectedPaper.title}`
    // console.log("the selected paper is  ",selectedPaper);

    // const  user = JSON.parse(localStorage.getItem('user'));
    // const paperToReview = document.querySelector('#paper');

    const form = document.querySelector('#reviewForm');
    form.addEventListener('submit',submitReview);

    const reviewedPaper = await fetch(reviewed_URL + selectedPaperId);
    console.log(reviewedPaper);
    reviewedPaperJson = await reviewedPaper.json();
    reviewedPaperJson = reviewedPaperJson[0];
    console.log(reviewedPaperJson);


    // const desiredReview = selectedPaper.reviews.find(r => r.reviewer_id == user.id);
    if((typeof(reviewedPaperJson) !== 'undefined') || reviewedPaperJson != null){
        document.querySelector('#strengths').value = reviewedPaperJson.strengths;
        document.querySelector('#weaknesses').value = reviewedPaperJson.weaknesses;
        const contribution = reviewedPaperJson.contribution;
        if(contribution == document.querySelector('#major').value){
            document.querySelector('#major').checked = true;
        }
        else if (contribution == document.querySelector('#clear').value){
            document.querySelector('#clear').checked = true;
        }
        else if(contribution == document.querySelector('#minor').value){
            document.querySelector('#minor').checked = true;
        }
        else if(contribution == document.querySelector('#v_minor').value){
            document.querySelector('#v_minor').checked = true;
        }
        else{
            document.querySelector('#no_clr').checked = true;
        }

        const evaluation = reviewedPaperJson.evaluation;
        if(evaluation == document.querySelector('#strong_a').value){
            document.querySelector('#strong_a').checked = true;
        }
        else if (evaluation == document.querySelector('#accept').value){
            document.querySelector('#accept').checked = true;
        }
        else if(evaluation == document.querySelector('#borderline').value){
            document.querySelector('#borderline').checked = true;
        }
        else if(evaluation == document.querySelector('#reject').value){
            document.querySelector('#reject').checked = true;
        }
        else{
            document.querySelector('#strong_r').checked = true;
        }
        // const index = selectedPaper.reviews.findIndex(r => r.reviewer_id == user.id);
        // selectedPaper.reviews.splice(index,1);
        // cJSON.parse(localStorage.getItem('papers'))

    }
    else{

    }
}
// function loadPaperTitles(){
//     // const usersRes = await fetch('users.json');
//     // users = await usersRes.json(); 
//     // const papers = await fetch('../papers.json');
//     // const papersJson = await papers.json();
//     // const assignedPapers = papersJson.filter(p => p.reviewer_id.find(id => id == user.id));
//     // console.log(assignedPapers);
//     // paperToReview.innerHTML = assignedPapers.map(p => getPaperTitle(p)).join("");
//     paperToReview.innerHTML = `<option disabled selected value="">Select a paper</option>`
//     paperToReview.innerHTML += assignedPapers.map(p => getPaperTitle(p)).join("");
// }

// loadPaperTitles();
// function getPaperTitle(paper){
//     return `
//     <option value="${paper.title}">${paper.title}</option>`
// }

function formToObject(form){
    const formData = new FormData(form)
    const data = {}
    for(const [key,value] of formData){
        data[key] = value
    }
    return data
}
async function submitReview(e){
    e.preventDefault();
    // console.log("hello my name is review form");
    // console.log(e.target);
    // console.log(e.target.querySelector('#strengths').value);
    // console.log(e.target.querySelector('#weaknesses').value);
    // console.log(e.target.querySelector('[name="contribution"]').value);
    // console.log(e.target.querySelector('[name="evaluation"]').value);
    // const strengths = e.target.querySelector('#strengths').value;
    // const weaknesses = e.target.querySelector('#weaknesses').value;
    // const contribution = e.target.querySelector('[name="contribution"]').value;
    // const evaluation = e.target.querySelector('[name="evaluation"]').value;
    // const overall_eval = +contribution + +evaluation;
    // console.log(overall_eval);
    // console.log(+("-2"));
    // console.log(typeof(+contribution));
    // e.target.reset();

    const review = formToObject(e.target);
    // review.reviewer_id = user.id;
    console.log("this is the review: ", review);
    review.contribution = +review.contribution 
    review.evaluation = +review.evaluation;
    review.paperId = selectedPaper.id;

    //HAVE TO SEE AHMAD
    review.reviewerId = 3;
    
    // const oldReview = await fetch()

    // const papers = JSON.parse(localStorage.getItem('papers'));
    // if(typeof(selectedPaper.reviews) === 'undefined'){
    //     selectedPaper.reviews=[];
    // }
    // selectedPaper.reviews.push(review);

    // if(selectedPaper.reviews.length == 2){
    //     selectedPaper.overall_eval = 0
    //     for (let index = 0; index < 2; index++) {
    //         selectedPaper.overall_eval += +selectedPaper.reviews[index].evaluation;
    //     }
    // }

    console.log(reviewedPaperJson);
    if(typeof(reviewedPaperJson) !== 'undefined' || reviewedPaperJson != null){
        await fetch("/api/review/" + reviewedPaperJson.id,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(review)
        })
    } else{
        await fetch("/api/review",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(review)
        })
    }


    // const index = papers.findIndex(p => p.id == selectedPaper.id);
    // papers[index] = selectedPaper;

    // localStorage.setItem('papers',JSON.stringify(papers));
    window.location.href="reviewer.html"


    // const reviewsList = await fetch('../reviews.json');
    // const reviewsListJson = await reviewsList.json();


    // const fs = require('fs');
    // fs.writeFile('../reviews.json',JSON.stringify(reviewsListJson));

}   