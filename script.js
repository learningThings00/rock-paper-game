let score = JSON.parse(localStorage.getItem("score")) || {
        wins: 0,
        losses: 0,
        ties: 0,
      }; // we used a default value cause after resets the score object becomes null so we give a default value to it
      updateScore();
      /*
      if (!score) {
      wins: 0,
      losses: 0, // sp instead deafault we can use this code
      ties: 0
      };
      */

      let isPlaying = false;
      let intervalId;

      function autoPlay() {
        
        if (!isPlaying) {
          intervalId = setInterval(() => {
            const playerMove = randomMove();
            playGame(playerMove);
        }, 1000);
        
        isPlaying = true;

        document.querySelector('.js-auto-play-button').innerText = 'Stop Playing';
        } else {
          clearInterval(intervalId);
          isPlaying = false;
          document.querySelector('.js-auto-play-button').innerText = 'Auto Play';
        }
        
      }

      function randomMove() {
        const randomNum = Math.random();

        if (randomNum >= 0 && randomNum < 1 / 3) {
          return "rock";
        } else if (randomNum >= 1 / 3 && randomNum < 2 / 3) {
          return "paper";
        } else if (randomNum >= 2 / 3 && randomNum < 1) {
          return "scissors";
        }
      }

      document.querySelector('.js-rock-button')
      .addEventListener('click', () =>  playGame('rock'));

      document.querySelector('.js-paper-button')
      .addEventListener('click', () =>  playGame('paper'));

      document.querySelector('.js-scissors-button')
      .addEventListener('click', () =>  playGame('scissors'));

      document.querySelector('.js-auto-play-button')
      .addEventListener('click', () => autoPlay());

      document.querySelector('.js-reset-button')
      .addEventListener('click', () => {
        resetMessage();
        isVisible = true;
      });
      


      let isVisible = false;

      document.body.addEventListener('keydown', (event) => {
        if (event.key === 'r' && !isVisible) {
          playGame('rock');
        } else if (event.key === 'p' && !isVisible) {
          playGame('paper');
        } else if (event.key === 's' && !isVisible) {
          playGame('scissors');
        } else if (event.key === 'a'  && !isVisible) {
          autoPlay();
        } else if (event.key === 'Backspace') {
          resetMessage();
          isVisible = true;
        } else if (event .key === 'y' && isVisible) {
          yesAction();
          isVisible = false;
        } else if (event.key === 'n' && isVisible) {
          noAction();
          isVisible = false;
        }
      });

      function playGame(playerMove) {
        const computerMove = randomMove();

        let result = "";

        if (playerMove === "rock") {
          if (computerMove === "rock") {
            result = "Tie.";
          } else if (computerMove === "paper") {
            result = "You lose.";
          } else if (computerMove === "scissors") {
            result = "You win!";
          }
        } else if (playerMove === "paper") {
          if (computerMove === "rock") {
            result = "You win!";
          } else if (computerMove === "paper") {
            result = "Tie.";
          } else if (computerMove === "scissors") {
            result = "You lose.";
          }
        } else if (playerMove === "scissors") {
          if (computerMove === "rock") {
            result = "You lose.";
          } else if (computerMove === "paper") {
            result = "You win!";
          } else if (computerMove === "scissors") {
            result = "Tie.";
          }
        }

        if (result === "You win!") {
          score.wins += 1;
        } else if (result === "You lose.") {
          score.losses += 1;
        } else if (result === "Tie.") {
          score.ties += 1;
        }

        localStorage.setItem("score", JSON.stringify(score));

        updateScore();

        document.querySelector(".js-result").innerHTML = result;

        document.querySelector(".js-moves").innerHTML =
          `You <img class="move-icon" src="images/${playerMove}-emoji.png" /> <img class="move-icon" src="images/${computerMove}-emoji.png" /> Computer `;
      }

      function resetScore() {
        score.wins = 0;
        score.losses = 0;
        score.ties = 0;
        localStorage.removeItem("score");
        updateScore();
        document.querySelector(".js-result").innerHTML = "";
        document.querySelector(".js-moves").innerHTML = "";
      }

      function updateScore() {
        document.querySelector(".js-score").innerHTML =
          `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}.`;
      }

      function resetMessage() {
        document.querySelector('.js-confirmation-message').innerHTML = `<div>
        Are you sure you want to reset the score?
        </div>
        <button class="js-yes-button cnfrm-btn">Yes</button>
        <button class="js-no-button cnfrm-btn">No</button>`;

        document.querySelector('.js-yes-button')
        .addEventListener('click', () => {
          yesAction();
          isVisible = false;
        });

        document.querySelector('.js-no-button')
        .addEventListener('click', () => {
          noAction();
          isVisible = false;
        });

      }

      function yesAction() {
        resetScore();
        document.querySelector('.js-confirmation-message').innerHTML = '';
      }

      function noAction() {
        document.querySelector('.js-confirmation-message').innerHTML = '';
      }