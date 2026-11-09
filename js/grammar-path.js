// ============================================
// LEARNING PATH DATA
// ============================================
const pathData = [
    {
    level: 1,
    name: "Beginner",
    icon: "🌱",
    color: "#10b981",
    lessons: [1, 2, 3, 4, 16, 17, 18, 19, 20, 21], // 👈 Yahan naye lesson numbers add karo
    boss: {
      title: "Beginner Boss",
      icon: "👾",
      questions: [
        { q: "Inme se 'Proper Noun' kaunsa hai?", options: ["boy", "city", "Delhi", "book"], correct: 2 },
        { q: "Sahi pronoun chuno: '___ is my sister.'", options: ["He", "She", "It", "They"], correct: 1 },
        { q: "Sahi article chuno: 'I ate ___ apple.'", options: ["a", "an", "the", "no article"], correct: 1 },
        { q: "Sahi verb chuno: 'She ___ to school every day.'", options: ["go", "goes", "going", "gone"], correct: 1 },
        { q: "Noun kya hota hai?", options: ["Kisi kaam ka naam", "Kisi vyakti, jagah ya cheez ka naam", "Kisi ki visheshta", "Kisi ka bhaav"], correct: 1 }
      ]
    }
  },
  {
    level: 2,
    name: "Intermediate",
    icon: "🚀",
    color: "#6366f1",
    lessons: [5, 6, 7, 8],
    boss: {
      title: "Intermediate Boss",
      icon: "👹",
      questions: [
        { q: "Sahi past tense: 'I ___ yesterday.'", options: ["go", "goes", "went", "gone"], correct: 2 },
        { q: "Sahi future: 'I ___ help you.'", options: ["will", "am", "did", "was"], correct: 0 },
        { q: "Sahi preposition: 'Cat is ___ table.'", options: ["in", "on", "at", "for"], correct: 1 }
      ]
    }
  },
  {
    level: 3,
    name: "Advanced",
    icon: "⭐",
    color: "#f59e0b",
    lessons: [9, 10, 11, 12],
    boss: {
      title: "Advanced Boss",
      icon: "🐉",
      questions: [
        { q: "Adjective kaunsa hai?", options: ["Run", "Beautiful", "Quickly", "Happy"], correct: 1 },
        { q: "Conjunction: 'Tea ___ coffee.'", options: ["but", "and", "because", "or"], correct: 1 },
        { q: "Interjection kaunsa hai?", options: ["Run", "Wow!", "Beautiful", "Quickly"], correct: 1 }
      ]
    }
  },
  {
    level: 4,
    name: "Master",
    icon: "👑",
    color: "#ec4899",
    lessons: [13, 14, 15],
    boss: {
      title: "Master Boss",
      icon: "👺",
      questions: [
        { q: "Passive voice chuno:", options: ["Ram eats apple", "Apple is eaten by Ram", "Ram is eating", "Ram will eat"], correct: 1 },
        { q: "Indirect speech:", options: ["He said 'I am happy'", "He said that he was happy", "He says 'I am happy'", "He said, I am happy"], correct: 1 },
        { q: "Sahi punctuation: 'How are you___'", options: [".", ",", "?", "!"], correct: 2 }
      ]
    }
  }
];

// ============================================
// STATE
// ============================================
let currentBossLevel = null;
let bossQuestionIndex = 0;
let bossScore = 0;

// ============================================
// RENDER PATH
// ============================================
function renderPath() {
  const wrapper = document.getElementById('pathWrapper');
  wrapper.innerHTML = '';

  pathData.forEach((level, index) => {
    // Check karo ki level unlocked hai ya nahi
    const isUnlocked = isLevelUnlocked(level.level);
    const isPassed = isLevelPassed(level.level);

    const levelDiv = document.createElement('div');
    levelDiv.className = `path-level ${isUnlocked ? 'unlocked' : 'locked'} ${isPassed ? 'passed' : ''}`;

    // Level Header
    let headerHTML = `
      <div class="level-header" style="border-color: ${level.color}">
        <div class="level-badge" style="background: ${level.color}">
          ${level.icon}
        </div>
        <div class="level-title-area">
          <h2>Level ${level.level}: ${level.name}</h2>
          <p>${isPassed ? '✅ Passed' : isUnlocked ? '🔓 Unlocked' : '🔒 Locked'}</p>
        </div>
      </div>
    `;

    // Lessons
        let lessonsHTML = '<div class="level-lessons">';
    level.lessons.forEach((lessonNum, index) => {
      const isLessonRead = localStorage.getItem(`lesson_${lessonNum}_read`) === 'true';
      const displayNum = index + 1; // 👈 Display ke liye 1, 2, 3...
      
      lessonsHTML += `
        <a href="lesson.html?lesson=${lessonNum}" 
           class="path-lesson ${isLessonRead ? 'done' : ''} ${!isUnlocked ? 'disabled' : ''}"
           onclick="${!isUnlocked ? 'event.preventDefault()' : ''}">
          <span class="path-lesson-num">${displayNum}</span>
          <span class="path-lesson-title">Lesson ${displayNum}</span>
          ${isLessonRead ? '<span class="path-check">✅</span>' : ''}
        </a>
      `;
    });
    lessonsHTML += '</div>';

    // Boss
    const allLessonsRead = level.lessons.every(num => 
      localStorage.getItem(`lesson_${num}_read`) === 'true'
    );

    let bossHTML = `
      <div class="level-boss ${allLessonsRead && isUnlocked ? 'active' : 'inactive'}">
        <div class="boss-info">
          <span class="boss-icon">${level.boss.icon}</span>
          <div>
            <h3>${level.boss.title}</h3>
            <p>${allLessonsRead ? 'Saare lessons padh liye! Boss ko harayo!' : 'Pehle saare lessons padho.'}</p>
          </div>
        </div>
        <button class="btn btn-primary boss-btn" 
                onclick="startBoss(${level.level})"
                ${!allLessonsRead || !isUnlocked || isPassed ? 'disabled' : ''}>
          ${isPassed ? '✅ Defeated' : '⚔️ Fight Boss'}
        </button>
      </div>
    `;

    levelDiv.innerHTML = headerHTML + lessonsHTML + bossHTML;
    wrapper.appendChild(levelDiv);
  });
}

// ============================================
// LOCK LOGIC
// ============================================
function isLevelUnlocked(levelNum) {
  if (levelNum === 1) return true; // Level 1 hamesha unlocked
  // Pichhla level pass hona chahiye
  return localStorage.getItem(`level_${levelNum - 1}_passed`) === 'true';
}

function isLevelPassed(levelNum) {
  return localStorage.getItem(`level_${levelNum}_passed`) === 'true';
}

// ============================================
// BOSS FIGHT
// ============================================
function startBoss(levelNum) {
  const level = pathData.find(l => l.level === levelNum);
  if (!level) return;

  currentBossLevel = levelNum;
  bossQuestionIndex = 0;
  bossScore = 0;

  // Boss questions shuffle
  window.bossQuestions = shuffleArray(level.boss.questions).map(q => {
    const originalText = q.options[q.correct];
    const shuffledOpts = shuffleArray(q.options);
    const newCorrect = shuffledOpts.indexOf(originalText);
    return { ...q, options: shuffledOpts, correct: newCorrect };
  });

  // Modal dikhao
  showBossModal(level);
}

function showBossModal(level) {
  // Purana modal hatao
  const oldModal = document.getElementById('bossModal');
  if (oldModal) oldModal.remove();

  // Naya modal banao
  const modal = document.createElement('div');
  modal.id = 'bossModal';
  modal.className = 'boss-modal';
  modal.innerHTML = `
    <div class="boss-modal-content">
      <div class="boss-header">
        <span class="boss-icon-large">${level.boss.icon}</span>
        <h2>${level.boss.title}</h2>
        <p>Boss ko harane ke liye sahi jawab do!</p>
      </div>
      <div class="boss-question-area" id="bossQuestionArea">
        <!-- Questions yahan aayenge -->
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  renderBossQuestion();
}

function renderBossQuestion() {
  const area = document.getElementById('bossQuestionArea');
  if (!area) return;

  const q = window.bossQuestions[bossQuestionIndex];
  if (!q) {
    // Boss fight khatam
    endBossFight();
    return;
  }

  area.innerHTML = `
    <div class="boss-progress">Question ${bossQuestionIndex + 1} / ${window.bossQuestions.length}</div>
    <h3 class="boss-question-text">${q.q}</h3>
    <div class="boss-options" id="bossOptions"></div>
  `;

  const optionsDiv = document.getElementById('bossOptions');
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt;
    btn.onclick = () => checkBossAnswer(i, btn);
    optionsDiv.appendChild(btn);
  });
}

function checkBossAnswer(selectedIndex, btnElement) {
  const q = window.bossQuestions[bossQuestionIndex];
  const allBtns = document.querySelectorAll('#bossOptions .option-btn');
  
  allBtns[q.correct].classList.add('correct');

  if (selectedIndex === q.correct) {
    bossScore++;
    btnElement.classList.add('correct');
  } else {
    btnElement.classList.add('wrong');
  }

  allBtns.forEach(b => b.disabled = true);

  setTimeout(() => {
    bossQuestionIndex++;
    renderBossQuestion();
  }, 1000);
}

function endBossFight() {
  const totalQuestions = window.bossQuestions.length;
  const percentage = (bossScore / totalQuestions) * 100;

  const modalContent = document.querySelector('.boss-modal-content');
  
  if (percentage >= 66) { // 2 out of 3 correct = pass
    // Passed!
    localStorage.setItem(`level_${currentBossLevel}_passed`, 'true');
    
    modalContent.innerHTML = `
      <div class="boss-result win">
        <div class="boss-result-icon">🏆</div>
        <h2>Boss Defeated!</h2>
        <p>Shandar! Tumne ${bossScore}/${totalQuestions} sahi kiye.</p>
        <p class="boss-reward">🎉 Level ${currentBossLevel + 1} Unlocked!</p>
        <button class="btn btn-primary" onclick="closeBossModal()">Continue</button>
      </div>
    `;

    // Confetti
    if (typeof confetti === 'function') {
      confetti({ particleCount: 200, spread: 90, origin: { y: 0.6 } });
    }
  } else {
    // Failed
    modalContent.innerHTML = `
      <div class="boss-result lose">
        <div class="boss-result-icon">💀</div>
        <h2>Boss Jit Gaya!</h2>
        <p>Tumne ${bossScore}/${totalQuestions} sahi kiye. Thodi aur practice chahiye.</p>
        <button class="btn btn-secondary" onclick="closeBossModal()">Wapas Jao</button>
      </div>
    `;
  }
}

function closeBossModal() {
  const modal = document.getElementById('bossModal');
  if (modal) modal.remove();
  renderPath(); // Path refresh karo
}

// ============================================
// SHUFFLE
// ============================================
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ============================================
// START
// ============================================
document.addEventListener('DOMContentLoaded', renderPath);