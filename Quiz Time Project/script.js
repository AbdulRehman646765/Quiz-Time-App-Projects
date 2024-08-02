const homeContainer = document.querySelector(".home-container");
const openQuizContainer = document.querySelector(".open-quiz-container");
const startButton = document.querySelector(".start-btn");
const volumeUpIcon = document.querySelector(".volume-up-icon");
const volumeMuteIcon = document.querySelector(".volume-mute-icon");
const countDownButton = document.querySelector(".countdown-box");

const clickButton = new Audio();
clickButton.src = "audio/button click.mp3";

startButton.addEventListener("click", () => {
  homeContainer.style.display = "none";
  openQuizContainer.style.display = "block";
});

volumeUpIcon.addEventListener("click", () => {
  volumeUpIcon.style.display = "none";
  volumeMuteIcon.style.display = "block";
});

volumeMuteIcon.addEventListener("click", () => {
  volumeUpIcon.style.display = "block";
  volumeMuteIcon.style.display = "none";
});

const questions = [
  {
    question: "What is the full form of HTML?",
    answers: [
      { text: "Hypertext Markup Language", correct: "true" },
      { text: "Hyperlink Markup Language", correct: "false" },
      { text: "Hypertext Market and Text Markup Language", correct: "false" },
      { text: "None of the Above", correct: "false" },
    ],
  },
  {
    question: "Which one is the correct sequence of HTML tags?",
    answers: [
      { text: "head, body, title, html", correct: "false" },
      { text: "html, head, title, body", correct: "true" },
      { text: "html, title, head, body", correct: "false" },
      { text: "None of the above", correct: "false" },
    ],
  },
  {
    question: "How can you open a link in a new browser window?",
    answers: [
      { text: "_blank", correct: "true" },
      { text: "Target", correct: "false" },
      { text: "Same", correct: "false" },
      { text: "Open", correct: "false" },
    ],
  },
  {
    question:
      "To create a link to an anchor, you use the ______ property in A tag?",
    answers: [
      { text: "Name", correct: "false" },
      { text: "Tag", correct: "false" },
      { text: "Href", correct: "true" },
      { text: "Link", correct: "false" },
    ],
  },
  {
    question: "Which is the correct CSS syntax?",
    answers: [
      { text: "Body:color=black", correct: "false" },
      { text: "{body;color:black}", correct: "false" },
      { text: "{body:color=black(body}", correct: "false" },
      { text: "body {color: black}", correct: "true" },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `Your score ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again >";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
