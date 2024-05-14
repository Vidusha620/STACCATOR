//quiz.js

// Function to show Webpage2 and hide Webpage1
function redirectToQuiz() {
  document.getElementById("webpage1").style.display = "none";
  document.getElementById("webpage2").style.display = "block";
}

// Function to start the quiz and redirect to Webpage3
function startQuiz() {
  document.getElementById("webpage2").style.display = "none";
  document.getElementById("webpage3").style.display = "block";
  renderQuestion();
  startTimer();
}

// Function to exit the quiz and go back to Webpage1
function exitQuiz() {
  document.getElementById("webpage3").style.display = "none";
  document.getElementById("webpage2").style.display = "none";
  document.getElementById("webpage1").style.display = "block";
}

var questions = [
  {
    question: "Who won the most Grammy Awards in history?",
    options: ["Michael Jackson", "Rihanna", "George Solti", "Lourdes Leon"],
    answer: "George Solti"
  },
  {
    question: "Which artist performed the halftime show at the Super Bowl in 2021?",
    options: ["The Weeknd", "Camila Cabello", "Rihanna", "Selena Gomez"],
    answer: "The Weeknd"
  },
  
  {
    question: "What famous annual music festival takes place in Indio, California?",
    options: ["Grammy Awards", "American Music Awards", "Coachella", "Billboard"],
    answer: "Coachella"
  },
  
  {
    question: "Which female artist won the Grammy Award for Album of the Year in 2020?",
    options: ["Billie Eilish", "Tailor Swift", "Ariana Grande", "Beyonce"],
    answer: "Beyonce"
  },
  
  {
    question: "Which artist released the hit song 'Blinding Lights' in 2020?",
    options: ["Drake", "Post Malone", "The Weeknd", "Dua Lipa"],
    answer: "The Weeknd"
  },
  
  {
    question:  "Which K-pop group had a massive hit with the song 'Dynamite' in 2020?",
    options: ["Blackpink", "BTS", "EXO", "Twice"],
    answer: "BTS"
  },
  
  {
    question: "hich rapper released the album 'Legends Never Die' shortly after his death in 2020?",
    options: ["Xxxtentacion", "Juice Wrld", "Mac Miller", "Lil Peep"],
    answer: "Juice Wrld"
  },
  
  {
    question: "Who won the 2020 MTV Video Music Award for Video of the Year with 'Watermelon Sugar'?",
    options: ["Harry Styles", "Jason Derulo", "Justin Bieber", "Shawn Mendes"],
    answer: "Harry Styles"
  },
  
  {
    question: "What was the name of Lady Gaga's collaborative album with Ariana Grande in 2020?",
    options: ["Positions", "Future Nostalgia", "Chromatica", "Good News"],
    answer: "Chromatica"
  },
  
  {
    question: "Which album is Blackpink's debut Korean studio album?",
    options: ["Square Up", "Kill this Love", "The Album", "Blackpink in Your Area"],
    answer: "Blackpink in Your Area"
  },
];

// Get DOM elements
var questionElement = document.getElementById("question");
var optionsElement = document.getElementById("options");
var resultElement = document.getElementById("result");
var restartButton = document.getElementById("restart-btn");
var timerElement = document.getElementById("timer");
timerElement.classList.add("timer");

// Define quiz state variables
var currentQuestionIndex = 0;
var score = 0;
var timer;
var secondsLeft; // Declare the secondsLeft variable

// Function to render the current question
function renderQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  var questionIndexElement = document.getElementById("questionIndex");
  questionIndexElement.textContent = "Question: " + (currentQuestionIndex + 1) + "/" + questions.length;

  questionElement.textContent = currentQuestion.question;

  optionsElement.innerHTML = "";
  currentQuestion.options.forEach(function(option, index) {
    var optionButton = document.createElement("button");
    optionButton.textContent = option;
	optionButton.classList.add("button2");
    optionButton.addEventListener("click", function() {
      handleAnswer(option, index);
    });
    optionsElement.appendChild(optionButton);
  });
  resultElement.textContent = "" //Clear the result message of the prv question
}

// Function to handle user's answer
function handleAnswer(selectedOption, selectedIndex) {
  var currentQuestion = questions[currentQuestionIndex];
  var isCorrect = selectedOption === currentQuestion.answer;

  if (isCorrect) {
    score++;
  }

  var optionButtons = optionsElement.getElementsByTagName("button");
  for (var i = 0; i < optionButtons.length; i++) {
    optionButtons[i].setAttribute("disabled", "disabled");
    if (i === selectedIndex) {
      optionButtons[i].classList.add(isCorrect ? "highlight-green" : "highlight-red");
    }
    if (optionButtons[i].textContent === currentQuestion.answer) {
      optionButtons[i].classList.add("highlight-green");
    }
  }

  resultElement.textContent = isCorrect ? "Correct!" : "Incorrect!";

  currentQuestionIndex++;

  if (currentQuestionIndex === questions.length) {
    setTimeout(showResult, 2000); //1000 milliseconds
  } else {
    setTimeout(renderQuestion, 1000);
  }
}

// Function to show the final result
function showResult() {
  questionElement.textContent = "Quiz Completed!";
  optionsElement.innerHTML = "";
  restartButton.removeAttribute("disabled");
  resultElement.textContent = "You scored " + score + " out of " + questions.length + ".";
  resultElement.classList.add(score >= 5 ? "highlight-green" : "highlight-red");
  timerElement.textContent = "You took " + (60 - secondsLeft) + " seconds to complete the quiz.";
  clearInterval(timer);
  showSummary();
}

// Function to restart the quiz
function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  resultElement.textContent = "";
  resultElement.classList.remove("highlight-green", "highlight-red");
  restartButton.setAttribute("disabled", "disabled");
  clearInterval(timer);
  startTimer();
  renderQuestion();
}

// Function to start the timer
function startTimer() {
  secondsLeft = 60; // Initialize the secondsLeft variable
  timerElement.textContent = `Time left: ${secondsLeft}`;

  timer = setInterval(function() {
    secondsLeft--;
    timerElement.textContent = `Time left: ${secondsLeft}`;

    if (secondsLeft <= 0) {
      clearInterval(timer);
      submitUnansweredQuestions();
    }
  }, 1000);
}


function submitUnansweredQuestions(){
	var remainingQuestions = questions.length - currentQuestionIndex;
	score = Math.max(0, score - remainingQuestions);

    var optionButtons = optionsElement.getElementsByTagName("button");
    for(var i = 0; i < optionButtons.length; i++){
		optionButtons[i].setAttribute("disabled", "disabled");
		var currentQuestion = questions[currentQuestionIndex];
		if(optionButtons[i].textContent === currentQuestion.answer){
			optionButtons[i].classList.add("highlight-green");
		}
	}
	setTimeout(showResult, 2000);
}

// Function to show the summary of quiz results
function showSummary() {
  var totalQuestions = questions.length;
  var answeredQuestions = currentQuestionIndex;
  var unansweredQuestions = totalQuestions - answeredQuestions;
  var correctAnswers = score;
  var wrongAnswers = answeredQuestions - correctAnswers;
  var marksOutOf10 = score;
  var marksOutOf100 = score * 10;
  var timeTaken = 60 - secondsLeft;

  var summaryMessage =
    "Quiz Summary\n\n" +
    "Total Questions: " + totalQuestions + "\n" +
    "Answered Questions: " + answeredQuestions + "\n" +
    "Unanswered Questions: " + unansweredQuestions + "\n" +
    "Correct Answers: " + correctAnswers + "\n" +
    "Wrong Answers: " + wrongAnswers + "\n" +
    "Marks Scored (out of 10): " + marksOutOf10 + "\n" +
    "Marks Scored (out of 100): " + marksOutOf100 + "\n" +
    "Time Taken: " + timeTaken + " seconds";

  alert(summaryMessage);
}


// Event listener for restart button
restartButton.addEventListener("click", restartQuiz);



