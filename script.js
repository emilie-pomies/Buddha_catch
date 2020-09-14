const canvas = document.getElementById('canvas');
const score = document.getElementById('score');
const days = document.getElementById('days');
const endScreen = document.getElementById('endScreen');

daysLeft = 60;
gameOverNumber = 50;
loopPlay = false;

function start() {
  count = 0;
  getFaster = 2000;
  daysRemaining = daysLeft; 

  canvas.innerHTML = '';
  score.innerHTML = count;
  days.innerHTML = daysRemaining;

  // make sure to not play loop several times
  loopPlay ? '' : game();   
  loopPlay = true;

  function game() {
    let randomTime = Math.round(Math.random() * getFaster);
    getFaster > 700 ? getFaster = (getFaster * 0.90) : '';
  
    setTimeout(() => {
      if (daysRemaining === 0){
        youWin();
      } else if (canvas.childElementCount < gameOverNumber){
        buddhaPop();
        game();
      } else {
        gameOver();
      }
    }, randomTime);  
  };

  const gameOver = () => {
    endScreen.innerHTML = `<div class="gameOver">Perdu!<p>Un jour, la zenitude<br> tu auras</p><span>Score: ${count}</span> </div>`;
    endScreen.style.visibility = 'visible';
    endScreen.style.opacity = '1';
    loopPlay = false;
  };

  const youWin = () => {
      //precision du tir arrondi à l'entier le plus proche en %
    let accuracy = Math.round(count / daysLeft * 100);
    endScreen.innerHTML = `<div class="youWin">Gagné!<br>Zen, tu es<br><span>Score: ${accuracy} %</span></div>`;
    endScreen.style.visibility = 'visible';
    endScreen.style.opacity = '1';
    loopPlay = false; 
  };
};

// create random element
function buddhaPop() {
  let buddha = new Image();

  buddha.src = "./media/basic-pics/moine.png"

  buddha.classList.add('buddha');
  buddha.classList.add('buddha-bis');
  buddha.style.top = Math.random() * 500 + 'px';
  buddha.style.left = Math.random() * 500 + 'px';

  let x, y;
  x = y = (Math.random() * 45) + 30;
  buddha.style.setProperty('--x', `${ x }px`);
  buddha.style.setProperty('--y', `${ y }px`);

  let plusMinus = Math.random() < 0.5 ? -1 : 1;
  let trX = Math.random() * 500 * plusMinus;
  let trY = Math.random() * 500 * plusMinus;
  buddha.style.setProperty('--trX', `${ trX }%`);
  buddha.style.setProperty('--trY', `${ trY }%`);

  canvas.appendChild(buddha);
};

// countdown on click
canvas.addEventListener('click', () => {
  if (daysRemaining > 0) {
    daysRemaining--;
    days.innerHTML = daysRemaining;
  }
});

// remove element clicked
document.addEventListener("click", function(e){
  let targetElement = e.target || e.srcElement;

  if (targetElement.classList.contains('buddha')) {
    targetElement.remove();
    count++;
    score.innerHTML = count;
  };
});

// hide and screen on click
endScreen.addEventListener('click', () => {
  start();
  setTimeout(() => {
    endScreen.style.visibility = 'hidden';
  }, 1000);
});