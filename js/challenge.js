// ============================================
// DAILY CHALLENGE
// ============================================
const challengeQuestions = [
  {
    question: "Sahi verb chuno: 'He ___ his homework before dinner.'",
    options: ["do", "does", "did", "done"],
    correct: 2,
    explanation: "Past tense mein 'did' use hota hai."
  },
  {
    question: "Sahi preposition chuno: 'She is good ___ mathematics.'",
    options: ["in", "at", "on", "for"],
    correct: 1,
    explanation: "'Good at' ek fixed phrase hai."
  },
  {
    question: "Inme se kaunsa 'Adjective' hai?",
    options: ["Quickly", "Beautiful", "Run", "Happiness"],
    correct: 1,
    explanation: "Beautiful ek adjective hai (visheshan)."
  },
  {
    question: "Sahi sentence chuno:",
    options: ["I has a car.", "I have a car.", "I is a car.", "I am a car."],
    correct: 1,
    explanation: "'I' ke saath hamesha 'have' use hota hai."
  },
  {
    question: "Sahi article chuno: 'He is ___ honest man.'",
    options: ["a", "an", "the", "no article"],
    correct: 1,
    explanation: "'Honest' vowel sound (o) se shuru hota hai, isliye 'an' lagega."
  }
];

let currentQuestionIndex = 0;
let score = 0;
let answered = false;
const todayStr = new Date().toDateString();

const startScreen = document.getElementById('challengeStart');
const quizScreen = document.getElementById('challengeQuiz');
const resultScreen = document.getElementById('challengeResult');
const alreadyPlayedScreen = document.getElementById('alreadyPlayed');

// Check if already played
function initChallenge() {
  const lastPlayed = localStorage.getItem('dailyChallengeDate');
  if (lastPlayed === todayStr) {
    startScreen.style.display = 'none';
    quizScreen.style.display = 'none';
    resultScreen.style.display = 'none';
    alreadyPlayedScreen.style.display = 'block';
  } else {
    startScreen.style.display = 'block';
  }
}

// Start Challenge
document.getElementById('startChallengeBtn').onclick = () => {
  if (!localStorage.getItem('currentUser')) {
    alert("⚠️ Challenge khelne ke liye pehle Login karein!");
    window.location.href = 'login.html';
    return;
  }

  startScreen.style.display = 'none';
  quizScreen.style.display = 'block';
  currentQuestionIndex = 0;
  score = 0;
  document.getElementById('totalQ').textContent = challengeQuestions.length;
  loadQuestion();
};

function loadQuestion() {
  answered = false;
  document.getElementById('feedback').textContent = '';
  document.getElementById('feedback').className = 'feedback';
  document.getElementById('nextBtn').style.display = 'none';

  const q = challengeQuestions[currentQuestionIndex];
  document.getElementById('currentQ').textContent = currentQuestionIndex + 1;
  document.getElementById('questionText').textContent = q.question;

  const progressPercent = (currentQuestionIndex / challengeQuestions.length) * 100;
  document.getElementById('progressFill').style.width = progressPercent + '%';

  const optionsContainer = document.getElementById('optionsContainer');
  optionsContainer.innerHTML = '';
  
  q.options.forEach((option, index) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = option;
    btn.onclick = () => selectAnswer(index, btn);
    optionsContainer.appendChild(btn);
  });
}

function selectAnswer(selectedIndex, btnElement) {
  if (answered) return;
  answered = true;

  const q = challengeQuestions[currentQuestionIndex];
  const allOptions = document.getElementById('optionsContainer').querySelectorAll('.option-btn');
  allOptions[q.correct].classList.add('correct');

  if (selectedIndex === q.correct) {
    score += 20; // Double points!
    document.getElementById('scoreDisplay').textContent = score;
    document.getElementById('feedback').textContent = '✅ Sahi jawab! +20 points';
    document.getElementById('feedback').className = 'feedback feedback-correct';
  } else {
    btnElement.classList.add('wrong');
    document.getElementById('feedback').textContent = '❌ Galat! ' + q.explanation;
    document.getElementById('feedback').className = 'feedback feedback-wrong';
  }

  allOptions.forEach(opt => opt.disabled = true);
  document.getElementById('nextBtn').style.display = 'inline-block';
  
  if (currentQuestionIndex === challengeQuestions.length - 1) {
    document.getElementById('nextBtn').textContent = 'Results Dekho →';
  } else {
    document.getElementById('nextBtn').textContent = 'Next Question →';
  }
}

document.getElementById('nextBtn').onclick = () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < challengeQuestions.length) {
    loadQuestion();
  } else {
    showResults();
  }
};

function showResults() {
  quizScreen.style.display = 'none';
  resultScreen.style.display = 'block';

  localStorage.setItem('dailyChallengeDate', todayStr);

  const maxScore = challengeQuestions.length * 20;
  document.getElementById('finalScore').textContent = score;

  const percentage = (score / maxScore) * 100;
  let message = '';
  
  if (percentage >= 80) {
    message = '🌟 Shandar! Tumne challenge jeet liya aur double points kamaye!';
    document.getElementById('resultIcon').textContent = '🏆';
    document.getElementById('resultTitle').textContent = 'Challenge Passed!';
  } else if (percentage >= 50) {
    message = '👍 Achha kiya! Thodi si aur practice!';
    document.getElementById('resultIcon').textContent = '🎉';
  } else {
    message = '💪 Koi baat nahi! Kal phir se try karein!';
    document.getElementById('resultIcon').textContent = '😅';
  }
  document.getElementById('resultMessage').textContent = message;
    if (percentage >= 80) {
    setTimeout(() => {
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#6366f1', '#a855f7', '#fbbf24', '#10b981']
        });
      }
    }, 300);
  }

  // Save to LocalStorage
  let totalPoints = parseInt(localStorage.getItem('points') || 0);
  totalPoints += score;
  localStorage.setItem('points', totalPoints);

  // Save to Firebase
  const currentUser = localStorage.getItem('currentUser');
  if (currentUser && window.firebaseDB) {
    const safeEmail = currentUser.replace(/[.#$\[\]]/g, '_');
    const userRef = window.firebaseRef(window.firebaseDB, 'users/' + safeEmail);
    window.firebaseGet(userRef).then((snapshot) => {
      let fbPoints = 0;
      if (snapshot.exists()) fbPoints = snapshot.val().points || 0;
      window.firebaseSet(userRef, {
        points: fbPoints + score,
        email: currentUser,
        lastUpdated: Date.now()
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', initChallenge);