// ============================================
// WORD SCRAMBLE GAME
// ============================================
const wordsData = [
  { word: "APPLE", hint: "Ek phal (Fruit)" },
  { word: "TEACHER", hint: "Jo padhata hai (Person)" },
  { word: "SCHOOL", hint: "Jahan hum padhne jaate hain (Place)" },
  { word: "FRIEND", hint: "Achha dost (Person)" },
  { word: "WATER", hint: "Peene ki cheez (Liquid)" },
  { word: "COMPUTER", hint: "Electronic device (Machine)" },
  { word: "MOBILE", hint: "Call karne ki cheez (Device)" },
  { word: "INDIA", hint: "Hamara desh (Country)" },
  { word: "MUSIC", hint: "Sangeet (Art)" },
  { word: "HAPPY", hint: "Khush (Emotion)" }
];

let currentWord = "";
let currentHint = "";
let score = 0;
let lives = 3;
let usedWords = [];

const scrambledWordEl = document.getElementById('scrambledWord');
const hintBoxEl = document.getElementById('hintBox');
const userInput = document.getElementById('userInput');
const feedbackEl = document.getElementById('gameFeedback');
const scoreEl = document.getElementById('gameScore');
const livesEl = document.getElementById('gameLives');
const submitBtn = document.getElementById('submitBtn');
const skipBtn = document.getElementById('skipBtn');

// Word ko scramble (shuffle) karne ka function
function scrambleWord(word) {
  let arr = word.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join(' ');
}

function loadNewWord() {
  if (lives <= 0) {
    gameOver();
    return;
  }

  if (usedWords.length >= wordsData.length) {
    usedWords = [];
  }

  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * wordsData.length);
  } while (usedWords.includes(randomIndex));

  usedWords.push(randomIndex);
  const data = wordsData[randomIndex];
  currentWord = data.word;
  currentHint = data.hint;

  hintBoxEl.textContent = "Hint: " + currentHint;
  scrambledWordEl.textContent = scrambleWord(currentWord);
  userInput.value = "";
  userInput.focus();
  feedbackEl.textContent = "";
  feedbackEl.className = 'game-feedback';
}

function checkAnswer() {
  let userAns = userInput.value.trim().toUpperCase();
  
  if (userAns === "") {
    feedbackEl.textContent = "⚠️ Pehle word toh likho!";
    feedbackEl.className = 'game-feedback warning';
    return;
  }

  if (userAns === currentWord) {
    score += 10;
    scoreEl.textContent = score;
    feedbackEl.textContent = "✅ Sahi Jawab! +10 Points";
    feedbackEl.className = 'game-feedback success';
    
    // Points save karo LocalStorage mein
    let totalPoints = parseInt(localStorage.getItem('points') || 0);
    totalPoints += 10;
    localStorage.setItem('points', totalPoints);

    setTimeout(loadNewWord, 1000);
  } else {
    lives -= 1;
    livesEl.textContent = lives;
    feedbackEl.textContent = "❌ Galat! Sahi word tha: " + currentWord;
    feedbackEl.className = 'game-feedback error';
    
    if (lives <= 0) {
      setTimeout(gameOver, 1500);
    } else {
      setTimeout(loadNewWord, 1500);
    }
  }
}

function gameOver() {
  scrambledWordEl.textContent = "GAME OVER";
  hintBoxEl.textContent = `Aapka Final Score: ${score}`;
  feedbackEl.innerHTML = `<button class="btn btn-primary" onclick="location.reload()">🔄 Dobara Khelo</button>`;
  feedbackEl.className = 'game-feedback warning';
  userInput.disabled = true;
  submitBtn.disabled = true;
  skipBtn.disabled = true;
}

// Event Listeners
submitBtn.onclick = checkAnswer;

skipBtn.onclick = () => {
  if (lives > 0) {
    lives -= 1;
    livesEl.textContent = lives;
    loadNewWord();
  }
};

// Enter dabane par bhi check ho
userInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    checkAnswer();
  }
});

// Start Game
loadNewWord();