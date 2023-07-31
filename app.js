const quizzdata=[
{question:'type of null in javascript?',
options:{
a:"function",
b:"object",
c:"string",
d:"none of the above",
answer:"b"}
},
{question:'variables of type \'var\' can be redecalred?',
options:{
a:"yes",
b:"no",
c:"not sure",
d:"none of the above",
answer:"a"}
},
{question:'which of the below is not a string object function',
options:{
a:"subStr",
b:"substring",
c:"slice",
d:"reverse",
answer:"d"}
},
{question:'which of the below functions are not related to iteration of array',
options:{
a:"filter",
b:"map",
c:"find",
d:"indexOf",
answer:"d"}
},
{question:'which of the statement not valid inside Array.forEach method?',
options:{
a:"declaing a variable",
b:"assigning value to variable",
c:"returning a statemet",
d:"calling a function",
answer:"c"}
},
];
let currentQuestionIndex=0;
const question = document.getElementById("question")
const radiooptions = document.querySelectorAll(".radioopt")

const opt_a = document.getElementById("opt_a");
const opt_b = document.getElementById("opt_b");
const opt_c = document.getElementById("opt_c");
const opt_d = document.getElementById("opt_d");

const container =document.getElementsByClassName("container")[0];
let score=0;
function loadQuiz(){
    resetOptions()
let qtn = quizzdata[currentQuestionIndex];
question.innerText = qtn.question;
opt_a.innerText = qtn.options.a;
opt_b.innerText = qtn.options.b;
opt_c.innerText = qtn.options.c;
opt_d.innerText = qtn.options.d;
}
function resetOptions(){
    radiooptions.forEach(opt=>{
        opt.checked = false;
    })
}
function isAnswered(){
    let isSelected=false;
    radiooptions.forEach((opt)=>{
  if(opt.checked){isSelected = true}
if(isSelected){
    opt.value == quizzdata[currentQuestionIndex].options.answer?score++:"";
}
});
return isSelected;
}
function validate(){
if(isAnswered()){
    currentQuestionIndex++;
    if(currentQuestionIndex==quizzdata.length){
     container.innerHTML=`<h3>quizz completed</h3><p>you have scored ${score}/${quizzdata.length}.</p><button onclick='document.location.reload()'>start quizz</button>`
    return;
    }
    loadQuiz();
}else{
    alert("you should answer current question")
}
}
loadQuiz();