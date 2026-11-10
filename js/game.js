// ============================================
// WORD SCRAMBLE GAME (Level System)
// ============================================

// Words ko Levels mein baant diya hai
const wordsData = {
  1: [ // Easy (3-4 letters)
    { word: "CAT", hint: "Ek paltu janwar (Animal)" },
    { word: "DOG", hint: "Wafadar janwar (Animal)" },
    { word: "BOOK", hint: "Padhne ki cheez (Object)" },
    { word: "TREE", hint: "Jiske patte hote hain (Nature)" },
    { word: "MILK", hint: "Safed peene ki cheez (Drink)" }
  ],
  2: [ // Medium (5-6 letters)
    { word: "APPLE", hint: "Ek phal (Fruit)" },
    { word: "WATER", hint: "Peene ki cheez (Liquid)" },
    { word: "SCHOOL", hint: "Jahan hum padhne jaate hain (Place)" },
    { word: "FRIEND", hint: "Achha dost (Person)" },
    { word: "INDIA", hint: "Hamara desh (Country)" }
  ],
  3: [ // Hard (7+ letters)
    { word: "COMPUTER", hint: "Electronic device (Machine)" },
    { word: "TEACHER", hint: "Jo padhata hai (Person)" },
    { word: "BEAUTIFUL", hint: "Dekhne mein accha (Adjective)" },
    { word: "MOUNTAIN", hint: "Oonchi pahadi (Nature)" },
    { word: "ENGLISH", hint: "Wo bhasha jo hum seekh rahe hain (Language)" }
  ]
};

let currentLevel = 1;
let currentWord = "";
let currentHint = "";
let score = 0;
let lives = 3;
let usedWords = []; // Har level ke liye alag

const scrambledWordEl = document.getElementById('scrambledWord');
const hintBoxEl = document.getElementById('hintBox');
const userInput = document.getElementById('userInput');
const feedbackEl = document.getElementById('gameFeedback');
const scoreEl = document.getElementById('gameScore');
const levelEl = document.getElementById('gameLevel');
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

  // Agar current level ke saare words khel liye, toh next level par jao
  const currentLevelWords = wordsData[currentLevel];
  if (usedWords.length >= currentLevelWords.length) {
    if (currentLevel < 3) {
      // Level Up!
      currentLevel++;
      usedWords = []; // Naye level ke liye reset
      levelEl.textContent = currentLevel;
      feedbackEl.textContent = `🎉 Level Up! Ab aap Level ${currentLevel} par hain.`;
      feedbackEl.className = 'game-feedback success';
      
      // 1.5 second baad naya word dikhao
      setTimeout(() => {
        loadNewWordFromLevel();
      }, 1500);
      return;
    } else {
      // Agar Level 3 bhi khatam ho gaya (Game Jeet gaye!)
      winGame();
      return;
    }
  }

  loadNewWordFromLevel();
}

function loadNewWordFromLevel() {
  const currentLevelWords = wordsData[currentLevel];
  let randomIndex;
  
  // Aisa word chuno jo pehle use nahi hua
  do {
    randomIndex = Math.floor(Math.random() * currentLevelWords.length);
  } while (usedWords.includes(randomIndex));

  usedWords.push(randomIndex);
  const data = currentLevelWords[randomIndex];
  
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
    // Level ke hisaab se points do (Level 1 = 10, Level 2 = 20, Level 3 = 30)
    let pointsEarned = currentLevel * 10;
    score += pointsEarned;
    scoreEl.textContent = score;
    feedbackEl.textContent = `✅ Sahi Jawab! +${pointsEarned} Points`;
    feedbackEl.className = 'game-feedback success';
    
    // Points save karo LocalStorage mein
    let totalPoints = parseInt(localStorage.getItem('points') || 0);
    totalPoints += pointsEarned;
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

function winGame() {
  scrambledWordEl.textContent = "🏆 YOU WIN!";
  hintBoxEl.textContent = `Shandar! Aapne saare levels paar kar liye. Final Score: ${score}`;
  feedbackEl.innerHTML = `<button class="btn btn-primary" onclick="location.reload()">🔄 Phir Se Khelo</button>`;
  feedbackEl.className = 'game-feedback success';
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