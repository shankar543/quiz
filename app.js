let quizzdata=[

];
let currentQuestionIndex=0;
const question = document.getElementById("question")
const radiooptions = document.querySelectorAll(".radioopt")
const container =document.getElementsByClassName("container")[0];
const submit = document.getElementById('submit');
container.querySelectorAll('ul li').forEach(li => {
    li.addEventListener('click', function(e){
        if (e.target == this) {
            this.querySelector('input[type="radio"]')?.click();
        }
    },false)
})
let showAnswersBydefault = false;
const opt_a = document.getElementById("opt_a");
const opt_b = document.getElementById("opt_b");
const opt_c = document.getElementById("opt_c");
const opt_d = document.getElementById("opt_d");

let score = 0;
async function loadQuizzData() {
    const response = await fetch('./sample.json');
    const data = await response.json();
    return new Promise(function (resolve, reject) {
        if (data) {
            resolve(data);
        } else {
            reject("failed to load data");
        }
    })
}
function displayCurrentQuestion() {
    if(currentQuestionIndex==quizzdata.length){
     container.innerHTML=`<h3>quizz completed</h3><p>you have scored ${score}/${quizzdata.length}.</p><button onclick='document.location.reload()'>start quizz</button>`
        submit.remove();
        return;
    }
    resetOptions();
    let qtn = quizzdata[currentQuestionIndex];
        question.classList.remove('showinganswer');
        submit.classList.remove('showanswerenabled');
    if (document.querySelector(".controls #nextqtnbtn")) {
        document.querySelector(".controls #nextqtnbtn").remove();
    }
    container.querySelectorAll('ul li').forEach(li => {
        li.style.backgroundColor = 'transparent';
})
    question.innerText = "";
    let spanelm = document.createElement('span');
  

const unformattedCode = qtn.question;


const formattedCode = js_beautify(unformattedCode, {
  indent_size: 2, // Set the desired indentation size
  space_in_empty_paren: true, // Add spaces in empty parentheses
});

// Now, you can render the formatted code to the user
console.log(formattedCode);
question.innerText = formattedCode;
    spanelm.innerText = "q";
    spanelm.classList.add('toggle_q_a')
    spanelm.style.visibility = 'hidden';
    spanelm.addEventListener('click', (e) => {
        question.innerHTML = "";
        if (e.target.innerText.toLowerCase() == 'q') {
            e.target.innerText = 'a';
            question.innerText = formattedCode;
        }
        else {
            if (question.classList.contains('showinganswer')) {
            showAnswerForCurrentQuestion()
            e.target.innerText = 'q'                
            } else {
                alert('please submit answer the question before seeing the answer');
                question.innerText = formattedCode;
                e.target.innerText = 'a';
            }

        }
    });
    if (!container.querySelector('.toggle_q_a')) {
    container.prepend(spanelm);    
    }
spanelm.style.visibility = 'hidden';
opt_a.innerText = qtn.options.a;
opt_b.innerText = qtn.options.b;
opt_c.innerText = qtn.options.c;
opt_d.innerText = qtn.options.d;
}





function loadQuiz(){
    
    if (!quizzdata?.length) {
         loadQuizzData().then(data => { 
         quizzdata = data;
         displayCurrentQuestion();
         }).catch(err => {
             alert("error loading questions" + err);
         })
    } else {
        displayCurrentQuestion();
    }
    

}
function resetOptions(){
    radiooptions.forEach(opt=>{
        opt.checked = false;
    })
}
function isAnswered(){
    let isSelected = false;
    let useranswer = null;
    radiooptions.forEach((opt)=>{
        if (opt.checked) {
            isSelected = true
            useranswer = opt;
        }
if(isSelected){
    opt.value == quizzdata[currentQuestionIndex].correctAnswer?score++:"";
}
});
    return { isSelected ,useranswer};
}
function validate() {
    let toggle = document.querySelector('.toggle_q_a');
    toggle.innerHTML = 'q';

let {isSelected,useranswer} = isAnswered()
    if (isSelected) {
    if(currentQuestionIndex==quizzdata.length){
     container.innerHTML=`<h3>quizz completed</h3><p>you have scored ${score}/${quizzdata.length}.</p><button onclick='document.location.reload()'>start quizz</button>`
    document.querySelector(".controls #nextqtnbtn").remove()
    return;
        }
        showAnswersBydefault = true;
        if (showAnswersBydefault) {
            toggle.style.visibility = 'visible';
            showAnswer(useranswer);
            return;
        }
    if (quizzdata[currentQuestionIndex]?.explanation && confirm("want to check the answers by default?")) {
        showAnswersBydefault = true;
        showAnswer(useranswer);
    } else {
        currentQuestionIndex++;
        loadQuiz();
    }
}else{
    alert("you should answer current question")
}
}
function showAnswer(useranswer) {
    if (useranswer.value == quizzdata[currentQuestionIndex]?.correctAnswer) {
        useranswer.parentElement.style.backgroundColor = "green";
    } else {
        useranswer.parentElement.style.backgroundColor = "red";
    }
radiooptions.forEach((opt)=>{
if(opt.value == quizzdata[currentQuestionIndex].correctAnswer){
    opt.parentElement.style.backgroundColor="green"
}
});
    question.innerHTML=""
showAnswerForCurrentQuestion()
    question.classList.add('showinganswer');
    submit.classList.add('showanswerenabled');
    let nextqtn = document.createElement("button");
    nextqtn.setAttribute("id", 'nextqtnbtn');
    nextqtn.innerText = "next question";
    nextqtn.onclick = () => {
        currentQuestionIndex++;
        loadQuiz();
    }
    if (!document.querySelector(".controls #nextqtnbtn")) {
         document.querySelector('.controls').appendChild(nextqtn);
    }
}
function showAnswerForCurrentQuestion() {
        let showAnswerText =  quizzdata[currentQuestionIndex]?.explanation;
    showAnswerText?.split('\n').forEach(line => {
        let tab = document.createElement('div');
        tab.classList.add('explination_steps');
        tab.innerText = line;
        question.appendChild(tab);
    });
    if (!showAnswerText) {
        question.innerText= "Explination is unavailble to this question \n please proceed to next question"
    }
    
}
loadQuiz();