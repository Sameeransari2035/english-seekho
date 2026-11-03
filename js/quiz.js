// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    question: "Noun kya hota hai?",
    options: [
      "Kisi kaam ka naam",
      "Kisi vyakti, jagah ya cheez ka naam",
      "Kisi ki visheshta",
      "Kisi ka bhaav"
    ],
    correct: 1,
    explanation: "Noun wo shabd hai jo vyakti, jagah, cheez ya bhaav ka naam batata hai."
  },
  {
    question: "Inme se 'Proper Noun' kaunsa hai?",
    options: ["boy", "city", "Delhi", "book"],
    correct: 2,
    explanation: "Delhi ek khaas jagah ka naam hai, isliye ye Proper Noun hai."
  },
  {
    question: "Sahi pronoun chuno: '___ is my sister.'",
    options: ["He", "She", "It", "They"],
    correct: 1,
    explanation: "Sister ke liye 'She' pronoun use hota hai."
  },
  {
    question: "Sahi article chuno: 'I ate ___ apple.'",
    options: ["a", "an", "the", "no article"],
    correct: 1,
    explanation: "'Apple' vowel sound se shuru hota hai, isliye 'an' lagega."
  },
  {
    question: "Sahi verb chuno: 'She ___ to school every day.'",
    options: ["go", "goes", "going", "gone"],
    correct: 1,
    explanation: "He/She/It ke saath verb mein 's' ya 'es' lagta hai — 'goes'."
  }
];

// ============================================
// STATE & DOM ELEMENTS
// ============================================
let currentQuestionIndex = 0;
let score = 0;
let answered = false;

const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const feedback = document.getElementById('feedback');
const nextBtn = document.getElementById('nextBtn');
const quizCard = document.getElementById('quizCard');
const resultCard = document.getElementById('resultCard');
const currentQSpan = document.getElementById('currentQ');
const totalQSpan = document.getElementById('totalQ');
const scoreDisplay = document.getElementById('scoreDisplay');
const progressFill = document.getElementById('progressFill');

// ============================================
// INIT
// ============================================
function initQuiz() {
  totalQSpan.textContent = quizQuestions.length;
  currentQuestionIndex = 0;
  score = 0;
  scoreDisplay.textContent = score;
  quizCard.style.display = 'block';
  resultCard.style.display = 'none';
  progressFill.style.width = '0%';
  loadQuestion();
}

// ============================================
// LOAD QUESTION
// ============================================
function loadQuestion() {
  answered = false;
  feedback.textContent = '';
  feedback.className = 'feedback';
  nextBtn.style.display = 'none';

  const q = quizQuestions[currentQuestionIndex];
  currentQSpan.textContent = currentQuestionIndex + 1;
  questionText.textContent = q.question;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressFill.style.width = progressPercent + '%';

  optionsContainer.innerHTML = '';
  q.options.forEach((option, index) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = option;
    btn.onclick = () => selectAnswer(index, btn);
    optionsContainer.appendChild(btn);
  });
}

// ============================================
// SELECT ANSWER
// ============================================
function selectAnswer(selectedIndex, btnElement) {
  if (answered) return;
  answered = true;

  const q = quizQuestions[currentQuestionIndex];
  const allOptions = optionsContainer.querySelectorAll('.option-btn');

  allOptions[q.correct].classList.add('correct');

  if (selectedIndex === q.correct) {
    score += 10;
    scoreDisplay.textContent = score;
    feedback.textContent = '✅ Sahi jawab! +10 points';
    feedback.className = 'feedback feedback-correct';
  } else {
    btnElement.classList.add('wrong');
    feedback.textContent = '❌ Galat! ' + q.explanation;
    feedback.className = 'feedback feedback-wrong';
  }

  allOptions.forEach(opt => opt.disabled = true);

  nextBtn.style.display = 'inline-block';
  if (currentQuestionIndex === quizQuestions.length - 1) {
    nextBtn.textContent = 'Results Dekho →';
  } else {
    nextBtn.textContent = 'Next Question →';
  }
}

// ============================================
// NEXT BUTTON
// ============================================
nextBtn.onclick = () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizQuestions.length) {
    loadQuestion();
  } else {
    showResults();
  }
};

// ============================================
// SHOW RESULTS
// ============================================
function showResults() {
  quizCard.style.display = 'none';
  resultCard.style.display = 'block';
  progressFill.style.width = '100%';

  const maxScore = quizQuestions.length * 10;
  document.getElementById('finalScore').textContent = score;
  document.getElementById('maxScore').textContent = maxScore;

  const percentage = (score / maxScore) * 100;
  let message = '';
  if (percentage === 100) {
    message = '🌟 Perfect! Tum toh genius ho!';
  } else if (percentage >= 80) {
    message = '🎉 Bahut badhiya! Thodi si aur practice!';
  } else if (percentage >= 50) {
    message = '👍 Achha kiya! Grammar dobara padho!';
  } else {
    message = '💪 Koi baat nahi! Lessons padhkar dobara try karo!';
  }
  document.getElementById('resultMessage').textContent = message;

  saveProgress(score);
}

// ============================================
// SAVE PROGRESS (LocalStorage)
// ============================================
function saveProgress(earnedPoints) {
  // LocalStorage mein save karo
  let totalPoints = parseInt(localStorage.getItem('points') || 0);
  totalPoints += earnedPoints;
  localStorage.setItem('points', totalPoints);

  let quizCount = parseInt(localStorage.getItem('quizCount') || 0);
  quizCount += 1;
  localStorage.setItem('quizCount', quizCount);

  // Firebase mein save karo (agar user logged in hai)
  const currentUser = localStorage.getItem('currentUser');
  if (currentUser && window.firebaseDB) {
    // Email se dots aur special characters hatao taaki valid path bane
    const safeEmail = currentUser.replace(/[.#$\[\]]/g, '_');
    const userRef = window.firebaseRef(window.firebaseDB, 'users/' + safeEmail);
    
    // Pehle purana data fetch karo
    window.firebaseGet(userRef).then((snapshot) => {
      let fbPoints = 0;
      let fbQuizCount = 0;
      
      if (snapshot.exists()) {
        const data = snapshot.val();
        fbPoints = data.points || 0;
        fbQuizCount = data.quizCount || 0;
      }
      
      // Naya data save karo
      window.firebaseSet(userRef, {
        points: fbPoints + earnedPoints,
        quizCount: fbQuizCount + 1,
        email: currentUser, // Asli email yahan save kar rahe hain
        lastUpdated: Date.now()
      }).then(() => {
        console.log('✅ Points saved to Firebase');
      }).catch((err) => {
        console.error('❌ Firebase save error:', err);
      });
    });
  }
}
// ============================================
// RESTART
// ============================================
function restartQuiz() {
  resultCard.style.display = 'none';
  quizCard.style.display = 'block';
  initQuiz();
}

// ============================================
// START
// ============================================
initQuiz();