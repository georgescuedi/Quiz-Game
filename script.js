const question = document.querySelector("#question");
const choices = document.querySelectorAll(".choice-text");
const progressText = document.querySelector("#progressText");
let scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");
const number = document.querySelector(".hud-main-text");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];


let questions = [
   // Geography Questions //
   {
      question: "Which is the capital of Switzerland?",
      choice1: "Beijing",
      choice2: "Kiev",
      choice3: "Bern",
      choice4: "Madrid",
      answer: 3,
   },
   {
      question: "Where is the tallest mountain in the world located in?",
      choice1: "Russia",
      choice2: "Norway",
      choice3: "Hawaii",
      choice4: "At the border between Nepal and Tibet",
      answer: 4,
   },
   {
      question: "Where is the tallest building in the world located in?",
      choice1: "Abu Dhabi",
      choice2: "Dublin",
      choice3: "Beijing",
      choice4: "Dubai",
      answer: 4,
   },
   {
      question: "Which is the biggest ocean in the world?",
      choice1: "Atlantic",
      choice2: "Pacific",
      choice3: "Arctic",
      choice4: "Indian",
      answer: 2,
   },
   {
      question: "Do you know the equatorial circumference of Earth?",
      choice1: "40,000 km",
      choice2: "60,000 km",
      choice3: "55,000 km",
      choice4: "15,000 km",
      answer: 1,
   },
   // History Questions // 
   {
      question: "When did World War I start?",
      choice1: "1918",
      choice2: "1945",
      choice3: "1914",
      choice4: "1920",
      answer: 3,
   },
   {
      question: "How many countries are in NATO?",
      choice1: "20",
      choice2: "30",
      choice3: "28",
      choice4: "21",
      answer: 2,
   },
   {
      question: "When did the Roman Empire fall?",
      choice1: "450 d.Hr",
      choice2: "476 d.Hr",
      choice3: "500 d.Hr",
      choice4: "413 d.Hr",
      answer: 2,
   },
   {
      question: "Who is the original inventor of Wi-Fi?",
      choice1: "Terence Percival",
      choice2: "John Deane",
      choice3: "Hedy Lamarr",
      choice4: "Karl Benz",
      answer: 3,
   },
   {
      question: "Who was the deadliest sniper of all time?",
      choice1: "Nikolay Yakovlevich Ilyin",
      choice2: "Ivan Mikhailovich Sidorenko",
      choice3: "Ivan Nikolayevich Kulbertinov",
      choice4: "Simo Häyhä",
      answer: 4,
   },

      // General Questions // 
    
      {
         question: "Which planet is closest to the sun?",
         choice1: "Mars",
         choice2: "Mercury",
         choice3: "Pluto",
         choice4: "Venus",
         answer: 2,
      },  
      {
         question: "Which organ in the body can process pain but cannot feel it?",
         choice1: "The brain",
         choice2: "The liver",
         choice3: "The hearth",
         choice4: "The kidneys",
         answer: 1,
      },   
      {
         question: "Where are the rhomboids located?",
         choice1: "Legs",
         choice2: "Chest",
         choice3: "Upper Back",
         choice4: "Shoulders",
         answer: 3,
      }, 
      {
         question: "Which is the largest muscle in human body?",
         choice1: "Gluteus Maximus",
         choice2: "Quadriceps",
         choice3: "Latissimus Dorsi",
         choice4: "Stapedius muscle",
         answer: 1,
      },  
      {
         question: "Who wrote the song '505'?",
         choice1: "Ariana Grande",
         choice2: "Lana Del Rey",
         choice3: "Alex Turner",
         choice4: "James Alan Hetfield",
         answer: 3,
      },       

];

let SCORE_POINTS = 100;
const MAX_QUESTIONS = 15;

const startGame = () => {
   questionCounter = 0;
   score = 0;
   availableQuestions = [...questions];
   getNewQuestion();
};

const getNewQuestion = () => {
   if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
      localStorage.setItem("mostRecentScore", score);
      return window.location.assign("/end.html");
   }

   questionCounter++;
   progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
   progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100} %`;
   const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
   currentQuestion = availableQuestions[questionsIndex];
   question.innerText = currentQuestion.question;

   choices.forEach((choice) => {
      const number = choice.dataset["number"];
      choice.innerText = currentQuestion["choice" + number];
   });

   availableQuestions.splice(questionsIndex, 1);

   acceptingAnswers = true;
};

choices.forEach((choice) => {
   choice.addEventListener("click", (e) => {
      if (!acceptingAnswers) return;

      acceptingAnswers = false;
      const selectedChoice = e.target;
      const selectedAnswer = selectedChoice.dataset["number"];

      let classToApply =
         selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
      if (classToApply === "correct") {
         score+=100;
         number.textContent = score;
      } else{score-=50; number.textContent=score;}      //  ca sa scada scorul //
      selectedChoice.parentElement.classList.add(classToApply);

      setTimeout(() => {
         selectedChoice.parentElement.classList.remove(classToApply);
      }, 500);
       
     getNewQuestion()
     
   });
});

choices.forEach((choice) => {
   const number = choice.dataset["number"];
   choice.innerText = currentQuestion["choice" + number];
});

startGame();
