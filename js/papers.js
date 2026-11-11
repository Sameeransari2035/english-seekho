// ============================================
// PRACTICE PAPERS LOGIC
// ============================================
const paperQuestions = [
  { q: "Sahi article chuno: 'I ate ___ apple.'", options: ["a", "an", "the", "no article"], correct: 1 },
  { q: "Sahi verb chuno: 'She ___ to school every day.'", options: ["go", "goes", "going", "gone"], correct: 1 },
  { q: "Sahi past tense chuno: 'I ___ to the market yesterday.'", options: ["go", "goes", "went", "gone"], correct: 2 },
  { q: "Sahi preposition chuno: 'The cat is ___ the table.'", options: ["in", "on", "at", "for"], correct: 1 },
  { q: "Inme se kaunsa adjective hai?", options: ["Run", "Beautiful", "Quickly", "Happiness"], correct: 1 },
  { q: "Sahi future tense chuno: 'I ___ help you tomorrow.'", options: ["will", "am", "did", "was"], correct: 0 },
  { q: "Sahi conjunction chuno: 'I like tea ___ coffee.'", options: ["but", "and", "because", "or"], correct: 1 },
  { q: "Sahi conjunction chuno: 'He is rich ___ not happy.'", options: ["and", "but", "so", "because"], correct: 1 },
  { q: "Inme se interjection kaunsa hai?", options: ["Run", "Wow!", "Beautiful", "Quickly"], correct: 1 },
  { q: "Passive voice chuno:", options: ["Ram eats an apple.", "An apple is eaten by Ram.", "Ram is eating an apple.", "Ram will eat an apple."], correct: 1 },
  { q: "Indirect speech chuno:", options: ["He said, 'I am happy.'", "He said that he was happy.", "He says, 'I am happy.'", "He said, I am happy."], correct: 1 },
  { q: "Sentence ke end mein kya lagta hai?", options: ["Comma (,)", "Period (.)", "Exclamation (!)", "Question Mark (?)"], correct: 1 },
  { q: "Sahi punctuation chuno: 'How are you___'", options: [".", ",", "?", "!"], correct: 2 },
  { q: "Sahi article chuno: 'He is ___ honest man.'", options: ["a", "an", "the", "no article"], correct: 1 },
  { q: "Sahi preposition chuno: 'She is good ___ mathematics.'", options: ["in", "at", "on", "for"], correct: 1 },
  { q: "Sahi verb chuno: 'He ___ his homework before dinner.'", options: ["do", "does", "did", "done"], correct: 2 },
  { q: "Noun kya hota hai?", options: ["Kisi kaam ka naam", "Kisi vyakti, jagah ya cheez ka naam", "Kisi ki visheshta", "Kisi ka bhaav"], correct: 1 },
  { q: "Inme se 'Proper Noun' kaunsa hai?", options: ["boy", "city", "Delhi", "book"], correct: 2 },
  { q: "Sahi pronoun chuno: '___ is my sister.'", options: ["He", "She", "It", "They"], correct: 1 },
  { q: "Sahi verb chuno: 'She ___ a beautiful song.'", options: ["sing", "sings", "singing", "sang"], correct: 1 }
];

let currentQIndex = 0;
let paperScore = 0;
let selectedAnswers = {}; 
let timerInterval;
let timeLeft = 600; // 10 minutes = 600 seconds

const startScreen = document.getElementById('paperStartScreen');
const testScreen = document.getElementById('paperTestScreen');
const resultScreen = document.getElementById('paperResultScreen');
const timerEl = document.getElementById('paperTimer');

// Start Paper
document.getElementById('startPaperBtn').onclick = () => {
  startScreen.style.display = 'none';
  testScreen.style.display = 'block';
  loadQuestion();
  startTimer();
};

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    
    // Format time (05:09)
    seconds = seconds < 10 ? '0' + seconds : seconds;
    timerEl.textContent = `⏱️ ${minutes}:${seconds}`;

    // Red color when time is low
    if (timeLeft <= 60) {
      timerEl.style.color = '#ef4444';
    }

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      finishPaper(); // Auto submit
    }
  }, 1000);
}

function loadQuestion() {
  const q = paperQuestions[currentQIndex];
  document.getElementById('paperCurrentQ').textContent = currentQIndex + 1;
  document.getElementById('paperQuestionText').textContent = q.q;

  const optionsContainer = document.getElementById('paperOptionsContainer');
  optionsContainer.innerHTML = '';

  q.options.forEach((option, index) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    
    // Agar pehle select kiya hai toh highlight dikhao
    if (selectedAnswers[currentQIndex] === index) {
      btn.classList.add('selected');
    }

    btn.textContent = option;
    btn.onclick = () => {
      // Save answer
      selectedAnswers[currentQIndex] = index;
      
      // Remove selected from all
      optionsContainer.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
      // Add selected to current
      btn.classList.add('selected');
    };
    optionsContainer.appendChild(btn);
  });

  // Next Button logic
  const nextBtn = document.getElementById('paperNextBtn');
  if (currentQIndex === paperQuestions.length - 1) {
    nextBtn.textContent = 'Review / Submit';
    nextBtn.onclick = finishPaper;
  } else {
    nextBtn.textContent = 'Aagla →';
    nextBtn.onclick = () => {
      currentQIndex++;
      loadQuestion();
    };
  }
}

document.getElementById('paperSubmitBtn').onclick = () => {
  if (confirm("Kya aap sach mein test submit karna chahte hain?")) {
    finishPaper();
  }
};

function finishPaper() {
  clearInterval(timerInterval);
  testScreen.style.display = 'none';
  resultScreen.style.display = 'block';

  // Calculate score
  paperScore = 0;
  paperQuestions.forEach((q, index) => {
    if (selectedAnswers[index] === q.correct) {
      paperScore++;
    }
  });

  document.getElementById('paperFinalScore').textContent = paperScore;

  // Message
  const percentage = (paperScore / paperQuestions.length) * 100;
  let msg = '';
  if (percentage >= 80) msg = '🌟 Shandar! Aap exam ke liye tayyar hain!';
  else if (percentage >= 50) msg = '👍 Achha kiya! Thodi aur practice chahiye.';
  else msg = '💪 Koi baat nahi! Lessons padhkar dobara try karein.';

  document.getElementById('paperResultMessage').textContent = msg;
}