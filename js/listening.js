// ============================================
// LISTENING TEST LOGIC
// ============================================

const listeningTests = [
  {
    story: "Tom woke up early on Saturday morning. He decided to go to the park near his house. He took his bicycle and rode there. At the park, he saw many children playing. He joined them and they played football for two hours. After that, Tom felt hungry. He bought an ice cream from a nearby shop and ate it. He returned home in the afternoon and felt very happy.",
    questions: [
      { q: "Where did Tom go on Saturday morning?", options: ["School", "Market", "Park", "Library"], correct: 2 },
      { q: "What did Tom take with him?", options: ["A car", "A bicycle", "A ball", "A book"], correct: 1 },
      { q: "What game did the children play?", options: ["Cricket", "Tennis", "Football", "Hockey"], correct: 2 },
      { q: "What did Tom buy from the shop?", options: ["Chocolate", "Ice cream", "Water", "Chips"], correct: 1 }
    ]
  },
  {
    story: "Sarah is a doctor. She works at a big hospital in Delhi. Every day, she wakes up at 6 AM and goes to the hospital by bus. She treats many patients, especially children. She loves her job because she wants to help people. After work, she returns home and cooks dinner for her family. On Sundays, she visits her parents and spends time with them.",
    questions: [
      { q: "What is Sarah's profession?", options: ["Teacher", "Doctor", "Engineer", "Nurse"], correct: 1 },
      { q: "How does she go to the hospital?", options: ["By car", "By train", "By bus", "By bike"], correct: 2 },
      { q: "Why does she love her job?", options: ["She earns a lot of money", "She wants to help people", "She gets holidays", "She likes the hospital food"], correct: 1 },
      { q: "What does she do on Sundays?", options: ["She works at the hospital", "She visits her parents", "She goes to the market", "She sleeps all day"], correct: 1 }
    ]
  },
  {
    story: "Rahul is a student studying in college. He lives in a small apartment with his friend, Rohan. Every morning, they cook breakfast together and then go to their classes. In the evening, Rahul likes to read books and Rohan prefers to play video games. They both love English movies. On weekends, they watch a movie together and order pizza. They are very good friends.",
    questions: [
      { q: "Where does Rahul live?", options: ["In a hostel", "In a small apartment", "In a big house", "With his parents"], correct: 1 },
      { q: "What does Rahul do in the evening?", options: ["Plays video games", "Reads books", "Watches TV", "Cooks food"], correct: 1 },
      { q: "What do they do on weekends?", options: ["Go to the park", "Study together", "Watch a movie and order pizza", "Sleep all day"], correct: 2 }
    ]
  }
];

let currentTestIndex = Math.floor(Math.random() * listeningTests.length);
let selectedAnswers = {};
let isPlaying = false;

const startScreen = document.getElementById('listenStartScreen');
const audioScreen = document.getElementById('listenAudioScreen');
const questionsScreen = document.getElementById('listenQuestionsScreen');
const resultScreen = document.getElementById('listenResultScreen');

// Start Test
document.getElementById('startListeningBtn').onclick = () => {
  startScreen.style.display = 'none';
  audioScreen.style.display = 'block';
};

// Play Audio
document.getElementById('playStoryBtn').onclick = () => {
  if (isPlaying) return;
  isPlaying = true;
  
  const test = listeningTests[currentTestIndex];
  const utterance = new SpeechSynthesisUtterance(test.story);
  utterance.lang = 'en-US';
  utterance.rate = 0.85; // Thoda slow for comprehension
  
  utterance.onend = () => {
    isPlaying = false;
    document.getElementById('playStoryBtn').style.display = 'none';
    document.getElementById('replayStoryBtn').style.display = 'inline-block';
  };

  document.getElementById('playStoryBtn').textContent = "🔊 Play Ho Raha Hai...";
  window.speechSynthesis.speak(utterance);
};

// Replay Audio
document.getElementById('replayStoryBtn').onclick = () => {
  if (window.speechSynthesis.speaking) window.speechSynthesis.cancel();
  document.getElementById('playStoryBtn').click(); // Call play again
};

// Show Questions
document.getElementById('showQuestionsBtn').onclick = () => {
  if (window.speechSynthesis.speaking) window.speechSynthesis.cancel();
  
  audioScreen.style.display = 'none';
  questionsScreen.style.display = 'block';
  
  loadQuestions();
};

// Load Questions
function loadQuestions() {
  const test = listeningTests[currentTestIndex];
  const container = document.getElementById('listenQuestionsContainer');
  container.innerHTML = '';
  selectedAnswers = {};

  test.questions.forEach((q, qIndex) => {
    const qDiv = document.createElement('div');
    qDiv.className = 'question-block';
    
    let optionsHTML = '';
    q.options.forEach((opt, oIndex) => {
      optionsHTML += `
        <label class="reading-option">
          <input type="radio" name="q${qIndex}" value="${oIndex}" onchange="selectListenAnswer(${qIndex}, ${oIndex})">
          <span>${opt}</span>
        </label>
      `;
    });

    qDiv.innerHTML = `
      <p style="font-weight: 600; margin-bottom: 0.8rem;">${qIndex + 1}. ${q.q}</p>
      <div class="reading-options">${optionsHTML}</div>
    `;
    container.appendChild(qDiv);
  });
}

function selectListenAnswer(qIndex, oIndex) {
  selectedAnswers[qIndex] = oIndex;
}

// Submit Answers
document.getElementById('submitListeningBtn').onclick = () => {
  const test = listeningTests[currentTestIndex];
  
  if (Object.keys(selectedAnswers).length < test.questions.length) {
    alert("Kripya saare questions ke answers select karein!");
    return;
  }

  let correctCount = 0;
  test.questions.forEach((q, index) => {
    if (selectedAnswers[index] === q.correct) {
      correctCount++;
    }
  });

  const total = test.questions.length;
  const percentage = (correctCount / total) * 100;

  questionsScreen.style.display = 'none';
  resultScreen.style.display = 'block';

  document.getElementById('listenFinalScore').textContent = correctCount;
  document.getElementById('listenMaxScore').textContent = total;

  const resultMsg = document.getElementById('listenResultMessage');
  
  if (percentage === 100) {
    resultMsg.textContent = "🌟 Perfect! Aapne saare jawab sahi diye. +20 Points!";
    addListeningPoints(20);
    if (typeof confetti === 'function') {
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    }
  } else if (percentage >= 50) {
    resultMsg.textContent = "👍 Achha kiya! Thodi si aur practice karein. +10 Points!";
    addListeningPoints(10);
  } else {
    resultMsg.textContent = "💪 Koi baat nahi! Audio ko dhyan se sunein aur dobara try karein.";
  }
};

// Save Points
function addListeningPoints(points) {
  let totalPoints = parseInt(localStorage.getItem('points') || 0) + points;
  localStorage.setItem('points', totalPoints);

  const currentUser = localStorage.getItem('currentUser');
  if (currentUser && window.firebaseDB) {
    const safeEmail = currentUser.replace(/[.#$\[\]]/g, '_');
    const userRef = window.firebaseRef(window.firebaseDB, 'users/' + safeEmail);
    window.firebaseGet(userRef).then((snapshot) => {
      let fbPoints = 0;
      if (snapshot.exists()) fbPoints = snapshot.val().points || 0;
      window.firebaseSet(userRef, {
        points: fbPoints + points,
        email: currentUser,
        lastUpdated: Date.now()
      });
    });
  }
}