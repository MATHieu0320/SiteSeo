let ApiContry, verification;
let btn = document.querySelectorAll(".btn");
function prise() {
  fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((resultat) => {
      ApiContry = resultat;

      /////Question///
      Selection = resultat[Math.floor(Math.random() * 240)];
      Lepays = Selection.translations.fra.common.toString();
      question.innerHTML = `<li>Quelle est la capitale de ce pays<br> ${Lepays} ? </li>`;
      // choix/////////
      capital = Selection.capital.toString().toUpperCase();
      random1 = resultat[Math.floor(Math.random() * 240)].capital.toString();
      random2 = resultat[Math.floor(Math.random() * 240)].capital.toString();
      random3 = resultat[Math.floor(Math.random() * 240)].capital.toString();
      console.log(capital, random1, random2, random3);
      let tableau = [];
      tableau.concat(random1, random2, random3);
      const array = [random1, random2, capital, random3];

      const shuffledArray = array.sort((a, b) => 0.5 - Math.random());
      choice1.textContent = array[0];
      choice2.textContent = array[1];
      choice3.textContent = array[2];
      choice0.textContent = array[3];
      verification = capital;
      console.log(verification);
    });
}
prise();
let progressQuiz = 0;
let indexQuiz = 0;
let scoreQuiz = 0;
let score = 0;

setTimeout(() => {
  async function displayQuestion(params) {
    prise();

    progress.textContent = `Question : ${progressQuiz}/10`;
  }
  const displayResult = () => {
    score.textContent = scoreQuiz + " Points";
  };
  const pageFinal = () => {
    document.querySelector("body").innerHTML = `
<div class="container">
      <h1> Quiz terminée !</h1>
       <p id="progress1">Votre score est de ${scoreQuiz}/10</p>
      
       <button id="reloadBtn">Recommencer</button>
</div>
  `;
    indexQuiz = 0;
    progressQuiz = 1;
    scoreQuiz = 0;

    // Bouton recommencer
    reloadBtn.addEventListener("click", () => location.reload());
  };

  btn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      console.log(random1, random2, random3, capital);
      console.log(e.target.innerText, question.textContent, verification);

      if (verification === e.target.innerText) {
        console.log("juste");

        scoreQuiz++;
        displayResult();
        yesorno.innerHTML = `<span>Juste</span>`;
      } else if (verification != e.target.innerText) {
        yesorno.innerHTML = `<span>fausse</span>`;
      }
      if (indexQuiz >= 0) {
        indexQuiz++;
        progressQuiz++;

        // quizQuestion.textContent = questions[indexQuiz].text;
        // choice4.textContent = capital;
        displayResult();
        displayQuestion();
      }
      if (indexQuiz < -1) {
        indexQuiz++;

        progressQuiz++;
        displayQuestion();
        displayResult();
        // quizQuestion.textContent = questions[indexQuiz].text;
      }
      if (progressQuiz === 10) {
        pageFinal();
        displayResult();
      }
      displayQuestion();
    });
  });
}, 1000);
