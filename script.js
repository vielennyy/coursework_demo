// const questions = [
//     {
//       imgSource: "Shevchenko.jpg",
//       options: ["Іван Котляревський", "Григорій Сковорода", "Тарас Шевченко", "Іван Франко"],
//       answer: "Тарас Шевченко",
//     },
//     {
//       imgSource: "Skovoroda.jpg",
//       options: ["Григорій Сковорода", "Тарас Шевченко", "Іван Котляревський", "Іван Франко",],
//       answer: "Григорій Сковорода",
//     },
//     {
//         imgSource: "Hrushevskyi.jpg",
//       options: ["Володимир Винниченко", "Михайло Грушевський", "Симон Петлюра", "Павло Скоропадський"],
//       answer: "Михайло Грушевський",
//     },
//     {
//         imgSource: "Bandera.jpg",
//       options: ["Роман Шухевич", "Михайло Грушевський", "Євген Коновалець", "Степан Бандера"],
//       answer: "Степан Бандера",
//     },
//     {
//         imgSource: "Zelensky.jpg",
//       options: ["Віктор Ющенко", "Андрій Єрмак", "Володимир Зеленський", "Петро Порошенко"],
//       answer: "Володимир Зеленський",
//     },
//   ];



var questionsPerson = [];
async function getDataPerson(){
  let data;
  data = await fetch("./questionsJSON/person.json")
  questionsPerson = await data.json();
  var item;
  for (item in questionsPerson){
    var optionString = questionsPerson[item].options;
    // console.log(content[item]);
    var optionToArray = optionString.split(",");
    questionsPerson[item].options = optionToArray;
  }
  // questions = content;
  console.log(questionsPerson);  
}

getDataPerson();

var questionsArt = [];
async function getDataArt(){
  let data;
  data = await fetch("./questionsJSON/art.json");
  questionsArt = await data.json();
  var item;
  for (item in questionsArt){
    var optionString = questionsArt[item].options;
    // console.log(content[item]);
    var optionToArray = optionString.split(",");
    questionsArt[item].options = optionToArray;
  }
  // questions = content;
  console.log(questionsArt);
}
getDataArt();

var questionsArchitecture = [];
async function getDataArchitecture(){
  let data;
  data = await fetch("./questionsJSON/architecture.json");
  questionsArchitecture = await data.json();
  var item;
  for (item in questionsArchitecture){
    var optionString = questionsArchitecture[item].options;
    // console.log(content[item]);
    var optionToArray = optionString.split(",");
    questionsArchitecture[item].options = optionToArray;
  }
  // questions = content;
  console.log(questionsArchitecture);
}
getDataArchitecture();

// getData();

const startCard = document.querySelector("#start-card");
const questionCard = document.querySelector("#question-card");
const resultCard = document.querySelector("#result-card");

//hide all cards
function hideCards() {
    startCard.setAttribute("hidden", true);
    questionCard.setAttribute("hidden", true);
    resultCard.setAttribute("hidden", true);
}

const resultDiv = document.querySelector("#result-div");
const resultText = document.querySelector("#result-text");

//hide result div
function hideResultText() {
  resultDiv.style.display = "none";
}

function shuffle(questions) {
  let currentIndex = questions.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [questions[currentIndex], questions[randomIndex]] = [
      questions[randomIndex], questions[currentIndex]];
  }
}

// shuffle(questions);

//these variables are required globally
var intervalID;
var time;
var currentQuestion;



document.querySelector("#category-buttons").addEventListener("click", startQuiz);

  // getDataPerson();
// function openData(event) {
//   category = event.target.textContent;
//   console.log(category);
// }

  // if (category === "Архітектура") {
  //   getDataArchitecture();
  // }
  // else if (category === "Образотворче мистецтво") {
  //   getDataArt();
  // }
  // else {
  //   getDataPerson();
  // }
  // console.log(questions);


// console.log(questions);

// startQuiz();

// document.querySelector("#start-button").addEventListener("click", startQuiz);
// document.querySelector("#start-button").addEventListener("click", startQuiz);


let score = 0;
const mySound = new Audio('audio.m4a');
mySound.volume = 0.05;
function musicOn() {
  mySound.play();
}

function musicOff() {
  mySound.pause();
}

var questions = [];
var category;
var imgFolder;
function startQuiz(event) {
    //hide any visible cards, show the question card
    hideCards();
    category = event.target.textContent;
    console.log(category);

    if (category === "Архітектура") {
      questions = questionsArchitecture;
      imgFolder = "architecture";
    }
    else if (category === "Образотворче мистецтво") {
      questions = questionsArt;
      imgFolder = "art";
    }
    else {
      questions = questionsPerson;
      imgFolder = "person";
    }
    console.log(questions);
    shuffle(questions);
    questionCard.removeAttribute("hidden");
  
    //assign 0 to currentQuestion when start button is clicked, then display the current question on the page
    currentQuestion = 0;
    displayQuestion();
    musicOn();
  
    //set total time depending on number of questions
    time = questions.length * 10;
    // time = 15;

    //executes function "countdown" every 1000ms to update time and display on page
    intervalID = setInterval(countdown, 1000);
  
    //invoke displayTime here to ensure time appears on the page as soon as the start button is clicked, not after 1 second
    displayTime();
  }

  //reduce time by 1 and display new value, if time runs out then end quiz
function countdown() {
    time--;
    displayTime();
    if (time < 1) {
    //   currentQuestion++;
    // //if we have not run out of questions then display next question, else end quiz
      // if (currentQuestion < questions.length) {
      //   displayQuestion();
      // } else {
      //   endQuiz();
      // }
      endQuiz();
    }
  }

  
  
  //display time on page
  const timeDisplay = document.querySelector("#time");
  function displayTime() {
    timeDisplay.textContent = time;
  }
  
  //display the question and answer options for the current question
  function displayQuestion() {
    let question = questions[currentQuestion];
    let options = question.options;

    shuffle(options);
  
    let questionIMG = document.querySelector("#question-img");
    inputIMG = `<img src="./images/%category%/%image%" height="300px"></img>`;
    
    inputIMG = inputIMG
                      .replace("%category%", imgFolder)
                      .replace("%image%", question.imgSource);
    questionIMG.innerHTML = inputIMG;
  
    for (let i = 0; i < options.length; i++) {
      let option = options[i];
      let optionButton = document.querySelector("#option" + i);
      optionButton.textContent = option;
    }

    // timer();
  }
  
  //behaviour when an answer button is clicked: click event bubbles up to div with id "quiz-options"
  //eventObject.target identifies the specific button element that was clicked on
  document.querySelector("#quiz-options").addEventListener("click", checkAnswer);
  
  //Compare the text content of the option button with the answer to the current question
  function optionIsCorrect(optionButton) {
    return optionButton.textContent === questions[currentQuestion].answer;
  }
  
  //if answer is incorrect, penalise time
  function checkAnswer(eventObject) {
    let optionButton = eventObject.target;
    console.log(optionButton.textContent);
    resultDiv.style.display = "block";
    if (optionIsCorrect(optionButton)) {
      score ++;
      resultText.textContent = "Правильно!";
      setTimeout(hideResultText, 1000);
    } else {
      resultText.textContent = "Неправильно!";
      setTimeout(hideResultText, 1000);
      if (time >= 10) {
        time = time - 10;
        displayTime();
      } else {
        //if time is less than 10, display time as 0 and end quiz
        //time is set to zero in this case to avoid displaying a negative number in cases where a wrong answer is submitted with < 10 seconds left on the timer
        time = 0;
        displayTime();
        endQuiz();
      }
    }
  
    //increment current question by 1
    currentQuestion++;
    //if we have not run out of questions then display next question, else end quiz
    if (currentQuestion < questions.length) {
      displayQuestion();
    } else {
      endQuiz();
    }
  }
  
  //display scorecard and hide other divs
  // const score = document.querySelector("#score");
  
  //at end of quiz, clear the timer, hide any visible cards and display the scorecard and display the score as the remaining time
  function endQuiz() {
    musicOff();
    clearInterval(intervalID);
    hideCards();
    showResult();
    // resultCard.removeAttribute("hidden");
    // score.textContent = time;
  }

  function showResult() {

    resultCard.removeAttribute("hidden");

    const resultsTemplate = `
			<h2 class="title">%title%</h2>
			<h3 class="summary">%message%</h3>
			<p class="result">%result%</p>
      <button class="quiz-try again" id="again">Спробувати знову</button>
			`;
    let title, message;

    if (score === questions.length) {
      title = 'Вітаю!';
      message = 'Ви відповіли правильно на всі запитання!';
    }
    else if ((score * 100)/questions.length >= 50) {
      title = 'Добрий результат!';
      message = 'Ви відповіли правильно на більшу частину запитань.';
    }
    else {
      title = 'Варто ще потренуватись!';
      message = 'Ви відповіли правильно на меншу частину запитань.';
    }

    let result = `${score} з ${questions.length}`;

    const finalMessage = resultsTemplate
                    .replace('%title%', title)
                    .replace('%message%', message)
                    .replace('%result%', result);
    
    resultCard.innerHTML = finalMessage;

    const againButton = document.querySelector("#again");
    againButton.addEventListener("click", returnToStart);
  }

//Hide leaderboard card show start card
function returnToStart() {
  shuffle(questions);
  hideCards();
  score = 0;
  startCard.removeAttribute("hidden");
}
  
