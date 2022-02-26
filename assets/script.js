// List of questions

const questions = [
    {
        question: "Commonly used data types DO NOT include: ",
        choices: ["a. strings", "b. booleans", "c. alerts", "d. numbers"],
        answer: "c. alerts"
    },
    {
        question: "The condition in an if/else statement is enclosed within _______.",
        choices: ["a. quotes", "b. curly brackets", "c. parentheses", "d. square brackets"],
        answer: "c. parentheses"
    },
    {
        question: "Arrays in JavaScript can be used to store _______.",
        choices: ["a. numbers and strings", "b. other arrays", "c. booleans", "d. all of the above"],
        answer: "b. other arrays"
    },
    {
        question: "String values must be enclosed within _______ when being assigned to variables.",
        choices: ["a. commas", "b. curly brackets", "c. quotes", "d. parentheses"],
        answer: "c. quotes"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["a. Javascript", "b. terminal/bash", "c. for loops", "d. console.log"],
        answer: "d. console.log"
    },
];

// Define the variables

var timer = document.getElementById("timer");
var timeLeft = document.getElementById("timeLeft");
var timerStop = document.getElementById("timerStop");
var startQuiz = document.getElementById("startQuiz");
var startQuizBtn = document.getElementById("startQuizBtn");
var quizSection = document.getElementById("quizSection");
var displayQuestion = document.getElementById("displayQuestion");
var questionText = document.getElementById("questionText");
var choiceA = document.getElementById("choiceA");
var choiceB = document.getElementById("choiceB");
var choiceC = document.getElementById("choiceC");
var choiceD = document.getElementById("choiceD");
var answerCheck = document.getElementById("answerCheck");
var quizScore = document.getElementById("quizScore");
var submitName = document.getElementById("submitName");
var myName = document.getElementById("myName");
var scoreDiv = document.getElementById("scoreDiv");
var myScore = document.getElementById("myScore");
var backBtn = document.getElementById("backBtn");
var clearScore = document.getElementById("clearScore"); 
var viewHighScore = document.getElementById("viewHighScore");
var scoreList = document.getElementById("scoreList");
var correctAns = 0;
var questionIndex = 0;
var questionNum = 0;
var scoreResult;

// Start the timer

var totalTime = 121;
function newQuiz() {
    questionIndex = 0;
    totalTime = 120;
    timeLeft.textContent = totalTime;
    myName.textContent = "";

    startQuiz.style.display = "none";
    quizSection.style.display = "block";
    timer.style.display = "block";
    timerStop.style.display = "none";

    var startTimer = setInterval(function() {
        totalTime--;
        timeLeft.textContent = totalTime;
        if(totalTime <= 0) {
            clearInterval(startTimer);
            if (questionIndex < questions.length - 1) {
                gameOver();
            }
        }
    },1000);

    showQuiz();
};

// Display the quiz questions

function showQuiz() {
    nextQuestion();
}

function nextQuestion() {
    displayQuestion.textContent = questions[questionIndex].question;
    choiceA.textContent = questions[questionIndex].choices[0];
    choiceB.textContent = questions[questionIndex].choices[1];
    choiceC.textContent = questions[questionIndex].choices[2];
    choiceD.textContent = questions[questionIndex].choices[3];
}

// Check the answer and deduct 10 seconds if wrong

function checkAnswer(answer) {

    var lineBreak = document.getElementById("lineBreak");
    lineBreak.style.display = "block";
    answerCheck.style.display = "block";

    if (questions[questionIndex].answer === questions[questionIndex].choices[answer]) {
        correctAns++;
        answerCheck.textContent = "You are correct!";
    } else {
        totalTime -= 10;
        timeLeft.textContent = totalTime;
        answerCheck.textContent = "Sorry! The correct answer is: " + questions[questionIndex].answer;
    }

    questionIndex++;
    if (questionIndex < questions.length) {
        nextQuestion();
    } else {
        gameOver();
    }
}

function chooseA() { checkAnswer(0); }

function chooseB() { checkAnswer(1); }

function chooseC() { checkAnswer(2); }

function chooseD() { checkAnswer(3); }

function gameOver() {
    quizScore.style.display = "block";
    quizSection.style.display = "none";
    startQuiz.style.display = "none";
    timer.style.display = "none";
    timerStop.style.display = "block";

    // show final score
    myScore.textContent = correctAns;
}

// Add name and score to local storage

function storeHighScores(event) {
    event.preventDefault();

    if (myName.value === "") {
        alert("Enter your name to continue.");
        return;
    } 
    startQuiz.style.display = "none";
    timer.style.display = "none";
    timerStop.style.display = "none";
    // myScore.style.display = "none";
    scoreDiv.style.display = "block";   

    var HighScores = localStorage.getItem("high scores");
    var scoresArray;

    if (HighScores === null) {
        scoresArray = [];
    } else {
        scoresArray = JSON.parse(HighScores)
    }

    var userScore = {
        name: myName.value,
        score: myScore.textContent
    };

    console.log(userScore);
    scoresArray.push(userScore);

    var scoresArrayString = JSON.stringify(scoresArray);
    window.localStorage.setItem("high scores", scoresArrayString);
    
    showHighScores();
}

// Display the saved scores

var i = 0;
function showHighScores() {

    startQuiz.style.display = "none";
    timer.style.display = "none";
    quizSection.style.display = "none";
    timerStop.style.display = "none";
    quizScore.style.display = "none";
    scoreDiv.style.display = "block";

    var HighScores = localStorage.getItem("high scores");

    // check if there is any in local storage
    if (HighScores === null) {
        return;
    }
    console.log(HighScores);

    var storedHighScores = JSON.parse(HighScores);

    for (; i < storedHighScores.length; i++) {
        var newScore = document.createElement("p");
        newScore.innerHTML = storedHighScores[i].name + ": " + storedHighScores[i].score;
        scoreList.appendChild(newScore);
    }
}

/**
 * ADD EVENT LISTENERS
 */

startQuizBtn.addEventListener("click", newQuiz);
choiceA.addEventListener("click", chooseA);
choiceB.addEventListener("click", chooseB);
choiceC.addEventListener("click", chooseC);
choiceD.addEventListener("click", chooseD);

submitName.addEventListener("click", function(event){ 
    storeHighScores(event);
});

viewHighScore.addEventListener("click", function(event) { 
    showHighScores(event);
});

backBtn.addEventListener("click", function() {
    startQuiz.style.display = "block";
    scoreDiv.style.display = "none";
});

clearScore.addEventListener("click", function(){
    window.localStorage.removeItem("high scores");
    scoreList.innerHTML = "Scores have been cleared!";
    scoreList.setAttribute("style", "font-family: 'Rajdhani', sans-serif; font-style: italic; font-size: 16px; padding-bottom: 20px")
});
