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
  }  ,
  {
    question: "Sahi verb chuno: 'She ___ a beautiful song.'",
    options: ["sing", "sings", "singing", "sang"],
    correct: 1,
    explanation: "Present tense mein He/She/It ke saath verb mein 's' lagta hai."
  },
  {
    question: "Sahi past tense chuno: 'I ___ to the market yesterday.'",
    options: ["go", "goes", "went", "gone"],
    correct: 2,
    explanation: "'Yesterday' past time batata hai, isliye 'went' lagega."
  },
  {
    question: "Sahi preposition chuno: 'The cat is ___ the table.'",
    options: ["in", "on", "at", "for"],
    correct: 1,
    explanation: "Cheez ke upar hone ke liye 'on' use hota hai."
  },
  {
    question: "Inme se kaunsa adjective hai?",
    options: ["Run", "Beautiful", "Quickly", "Happiness"],
    correct: 1,
    explanation: "Beautiful ek adjective hai."
  },
  {
    question: "Sahi future tense chuno: 'I ___ help you tomorrow.'",
    options: ["will", "am", "did", "was"],
    correct: 0,
    explanation: "Future ke liye 'will' use hota hai."
  }  ,
  {
    question: "Sahi conjunction chuno: 'I like tea ___ coffee.'",
    options: ["but", "and", "because", "or"],
    correct: 1,
    explanation: "Do cheezon ko jodne ke liye 'and' use hota hai."
  },
  {
    question: "Sahi conjunction chuno: 'He is rich ___ not happy.'",
    options: ["and", "but", "so", "because"],
    correct: 1,
    explanation: "Ulta ya virudh baat batane ke liye 'but' use hota hai."
  },
  {
    question: "Inme se interjection kaunsa hai?",
    options: ["Run", "Wow!", "Beautiful", "Quickly"],
    correct: 1,
    explanation: "Wow! ek interjection hai jo achanak khushi vyakt karta hai."
  },
  {
    question: "Passive voice chuno:",
    options: ["Ram eats an apple.", "An apple is eaten by Ram.", "Ram is eating an apple.", "Ram will eat an apple."],
    correct: 1,
    explanation: "Passive voice mein object pehle aata hai aur 'by' use hota hai."
  },
  {
    question: "Indirect speech chuno:",
    options: ["He said, 'I am happy.'", "He said that he was happy.", "He says, 'I am happy.'", "He said, I am happy."],
    correct: 1,
    explanation: "Indirect speech mein quotes nahi hote aur tense change hota hai."
  },
  {
    question: "Sentence ke end mein kya lagta hai?",
    options: ["Comma (,)", "Period (.)", "Exclamation (!)", "Question Mark (?)"],
    correct: 1,
    explanation: "Statement ke end mein period (.) lagta hai."
  },
  {
    question: "Sahi punctuation chuno: 'How are you___'",
    options: [".", ",", "?", "!"],
    correct: 2,
    explanation: "Sawaal ke end mein question mark (?) lagta hai."
  },
  {
    question: "Sahi article chuno: 'He is ___ honest man.'",
    options: ["a", "an", "the", "no article"],
    correct: 1,
    explanation: "'Honest' vowel sound (o) se shuru hota hai, isliye 'an' lagega."
  },
  {
    question: "Sahi preposition chuno: 'She is good ___ mathematics.'",
    options: ["in", "at", "on", "for"],
    correct: 1,
    explanation: "'Good at' ek fixed phrase hai."
  },
  {
    question: "Sahi verb chuno: 'He ___ his homework before dinner.'",
    options: ["do", "does", "did", "done"],
    correct: 2,
    explanation: "Past tense mein 'did' use hota hai."
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
  // 1. Points update karo
  let totalPoints = parseInt(localStorage.getItem('points') || 0);
  totalPoints += earnedPoints;
  localStorage.setItem('points', totalPoints);

  // 2. Quiz Count update karo
  let quizCount = parseInt(localStorage.getItem('quizCount') || 0);
  quizCount += 1;
  localStorage.setItem('quizCount', quizCount);

  // 3. Streak Logic (Naya add karo)
  const today = new Date().toDateString();
  const lastPlayed = localStorage.getItem('lastPlayed');
  let streak = parseInt(localStorage.getItem('streak') || 0);

  if (lastPlayed !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (lastPlayed === yesterday.toDateString()) {
      streak += 1;
    } else {
      streak = 1;
    }
    localStorage.setItem('streak', streak);
    localStorage.setItem('lastPlayed', today);
  }

  // 4. Firebase mein save karo
  const currentUser = localStorage.getItem('currentUser');
  if (currentUser && window.firebaseDB) {
    const safeEmail = currentUser.replace(/[.#$\[\]]/g, '_');
    const userRef = window.firebaseRef(window.firebaseDB, 'users/' + safeEmail);
    
    window.firebaseGet(userRef).then((snapshot) => {
      let fbPoints = 0;
      let fbQuizCount = 0;
      
      if (snapshot.exists()) {
        const data = snapshot.val();
        fbPoints = data.points || 0;
        fbQuizCount = data.quizCount || 0;
      }
      
      window.firebaseSet(userRef, {
        points: fbPoints + earnedPoints,
        quizCount: fbQuizCount + 1,
        email: currentUser,
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