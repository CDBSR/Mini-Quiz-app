import { navbar } from "./navbar.js";

navbar();

const baseurl = "https://bubbly-locrian-bellusaurus.glitch.me/questions";

async function fetchReviewedQuestioms() {
    try{
        const response = await fetch(`${baseurl}?reviewStatus=true`);
        const q = await response.json();
        renderReview(q);
    }
    catch(err){
        console.log("Error", err);
    }
}


function renderReview(q){
    const grid = document.getElementById('reviewedQuestionsGrid');
    grid.innerHTML = '';
    
    q.foreach(question => {
        const card = document.createElement('div');
        card.className = `card ${question.reviewStatus ? 'violet' : ''}`;
        card.innerHTML = ` <h3>${question.question}</h3>
         <p>A:${question.optionA} </p>
         <p>B:${question.optionB} </p>
         <p>C:${question.optionC} </p>
         <p>D:${question.optionD} </p>
         <p><strong>Correct Option:</strong>${question.correctOption}</p>`;

         grid.appendChild(card);
    });
}

fetchReviewedQuestioms();