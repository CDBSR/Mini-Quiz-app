
import { navbar } from "./navbar.js";

navbar();

const baseurl = "https://bubbly-locrian-bellusaurus.glitch.me/questions";


async function getAllQuestions(){
    try{
        const response = await fetch(baseurl);
        const questions = await response.json();
        // render the questions
    } catch(err){
        console.log('Error in Getting all questions: ', err);
    }
}
let quizform = document.getElementById('quizForm');
quizform.addEventListener('submit', async function (){
    event.preventDefault();

    let q = quizform.question.value;
    let optA  = quizform.optionA.value;
    let optB = quizform.optionB.value;
    let optC = quizform.optionC.value;
    let optD = quizform.optionD.value;
    let crrt = quizform.correctOption.value;
    let  reviewstatus = false
    const question = { q,optA, optB,optC,optD,crrt ,reviewstatus };

    try{
        await fetch(baseurl,{
            method: 'POST',
            headers: {
                'content-type':'application/json',
            },
            body: JSON.stringify(question)
        });
        alert('Question Added');
        renderQuestions();
        //event.target.reset();
    } catch(err){
        console.log('Error in adding quetion:', err);
    }
});

// render questions 
function renderQuestions(questions){
    const grid = document.getElementById('questionsGrid');
    grid.innerHTML = '';

    questions.foreach(question => {
        const card = document.createElement('div');
        card.className = `card ${question.reviewStatus ? 'violet' : ''}`;
        card.innerHTML = ` <h3>${question.question}</h3>
         <p>A:${question.optionA} </p>
         <p>B:${question.optionB} </p>
         <p>C:${question.optionC} </p>
         <p>D:${question.optionD} </p>
         <button onclick="reviewQuestion(${question.id})">Review Question</button>
         <button onclick="deleteQuestion(${question.id})">Delete Question</button>`;

         grid.appendChild(card);
    });
}

// Review Question
async function reviewQuestion(id){
    if(confirm('Are you sure to review the question ?')){
        try {
            await fetch(`${baseurl}/${id}`,{
                method: 'PATCH',
                headers: {
                    'content-type' : 'application/json',
                },
                body: JSON.stringify({reviewStatus:true})
            });
            getAllQuestions();

        } catch(err){
            console.log('Error in Reviewing Question:', err);
        }
    }
}

// Delete Quetion 
async function deleteQuestion(id){
    if(confirm('Are you sure to delete the question ?')){
        try {
            await fetch(`${baseurl}/${id}`,{
                method: 'DELETE',
            });
            getAllQuestions();

        } catch(err){
            console.log('Error in Deleting Question:', err);
        }
    }
}

getAllQuestions();