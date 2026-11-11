// ============================================
// DASHBOARD LOGIC
// ============================================
const levels = [
  { name: 'Beginner', min: 0, max: 50, icon: '🌱' },
  { name: 'Learner', min: 50, max: 150, icon: '📚' },
  { name: 'Intermediate', min: 150, max: 300, icon: '🚀' },
  { name: 'Advanced', min: 300, max: 500, icon: '⭐' },
  { name: 'Master', min: 500, max: 1000, icon: '👑' }
];


// Weekly Reset Logic
function checkWeeklyReset() {
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser || !window.firebaseDB) return;

  // Pata karo aaj kaunsa din hai (0=Sunday, 1=Monday...)
  const today = new Date();
  const dayOfWeek = today.getDay();
  
  // Agar Monday hai (ya Monday ke baad hai) aur is hafte reset nahi hua hai
  const lastResetStr = localStorage.getItem('lastWeeklyReset');
  const thisMondayStr = getMondayDateString();
  
  if (lastResetStr !== thisMondayStr) {
    // Reset karo
    const safeEmail = currentUser.replace(/[.#$\[\]]/g, '_');
    const userRef = window.firebaseRef(window.firebaseDB, 'users/' + safeEmail);
    
    window.firebaseSet(userRef, { weeklyPoints: 0 }).then(() => {
      localStorage.setItem('lastWeeklyReset', thisMondayStr);
    });
  }
}

function getMondayDateString() {
  const d = new Date();
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff)).toDateString();
}

// Call it
checkWeeklyReset();


function loadDashboard() {
  const currentUser = localStorage.getItem('currentUser');
  
  if (!currentUser) {
    alert("⚠️ Dashboard dekhne ke liye pehle Login karein!");
    window.location.href = 'login.html';
    return;
  }

  document.getElementById('dashEmail').textContent = currentUser;

  // 👇 NAYA: Firebase se points fetch karke localStorage sync karo
  if (window.firebaseDB) {
    const safeEmail = currentUser.replace(/[.#$\[\]]/g, '_');
    const userRef = window.firebaseRef(window.firebaseDB, 'users/' + safeEmail);
    
    window.firebaseGet(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        // Firebase points ko localStorage mein sync karo
        if (data.points !== undefined) {
          localStorage.setItem('points', data.points);
        }
        if (data.quizCount !== undefined) {
          localStorage.setItem('quizCount', data.quizCount);
        }
      }
      // Sync ke baad UI update karo
      renderDashboardUI(currentUser);
    }).catch(() => {
      renderDashboardUI(currentUser); // Firebase fail ho toh localStorage se
    });
  } else {
    renderDashboardUI(currentUser);
  }
}

// Purana dashboard code is function mein move karo
function renderDashboardUI(currentUser) {
  const points = parseInt(localStorage.getItem('points') || 0);
  const quizCount = parseInt(localStorage.getItem('quizCount') || 0);
  
  // ... baaki ka existing code (level calc, rank, calendar) yahan rakho

  document.getElementById('dashPoints').textContent = points;
  document.getElementById('dashQuizCount').textContent = quizCount;

  let currentLevel = levels[0];
  for (let i = levels.length - 1; i >= 0; i--) {
    if (points >= levels[i].min) {
      currentLevel = levels[i];
      break;
    }
  }

  document.getElementById('levelName').textContent = `${currentLevel.icon} ${currentLevel.name}`;
  
  const levelRange = currentLevel.max - currentLevel.min;
  const progressInLevel = points - currentLevel.min;
  let levelProgress = (progressInLevel / levelRange) * 100;
  if (levelProgress > 100) levelProgress = 100;
  
  document.getElementById('levelFill').style.width = levelProgress + '%';
  
  const remaining = currentLevel.max - points;
  if (remaining > 0) {
    document.getElementById('levelPoints').textContent = `${points} / ${currentLevel.max} points`;
    document.getElementById('levelHint').textContent = `Agle level tak ${remaining} points aur chahiye!`;
  } else {
    document.getElementById('levelPoints').textContent = `${points} Points`;
    document.getElementById('levelHint').textContent = 'Tum top level par ho! 🎉';
  }

  calculateRank(currentUser);
  renderCalendar();
  renderBadges();  // Calendar render karo
}

// ============================================
// FEEDBACK SYSTEM
// ============================================
function initFeedback() {
  const form = document.getElementById('feedbackForm');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const rating = document.querySelector('input[name="rating"]:checked');
    const text = document.getElementById('feedbackText').value.trim();
    
    if (!rating) {
      alert("Kripya rating dein!");
      return;
    }

    const currentUser = localStorage.getItem('currentUser') || 'Anonymous';
    const feedback = {
      email: currentUser,
      rating: parseInt(rating.value),
      message: text,
      timestamp: Date.now()
    };

    let feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
    feedbacks.push(feedback);
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));

    if (window.firebaseDB && window.firebasePush) {
      const feedbackRef = window.firebaseRef(window.firebaseDB, 'feedbacks');
      window.firebasePush(feedbackRef, feedback)
        .then(() => console.log('✅ Feedback saved to Firebase'))
        .catch(err => console.error('❌ Error:', err));
    }

    form.style.display = 'none';
    document.getElementById('feedbackSuccess').style.display = 'block';
    
    if (typeof showToast === 'function') {
      showToast("Feedback successfully submit ho gaya! Dhanyawans.", "success");
    }
    
    setTimeout(() => {
      form.style.display = 'block';
      document.getElementById('feedbackSuccess').style.display = 'none';
      form.reset();
    }, 3000);
  });
}

// ============================================
// CALCULATE RANK
// ============================================
function calculateRank(currentEmail, retryCount = 0) {
  if (!window.firebaseDB) {
    if (retryCount > 20) { // 4 second baad give up
      document.getElementById('dashRank').textContent = '-';
      return;
    }
    setTimeout(() => calculateRank(currentEmail, retryCount + 1), 200);
    return;
  }

  const db = window.firebaseDB;
  const usersRef = window.firebaseRef(db, 'users');
  
  window.firebaseOnValue(usersRef, (snapshot) => {
    const data = snapshot.val();
    if (!data) {
      document.getElementById('dashRank').textContent = '-';
      return;
    }

    const usersArray = Object.values(data);
    usersArray.sort((a, b) => (b.points || 0) - (a.points || 0));

    let rank = '-';
    for (let i = 0; i < usersArray.length; i++) {
      if (usersArray[i].email === currentEmail) {
        rank = i + 1;
        break;
      }
    }
    
    document.getElementById('dashRank').textContent = rank !== '-' ? '#' + rank : '-';
  });
}

// ============================================
// LOGOUT FUNCTION
// ============================================
function logoutUser() {
  if (confirm("Kya aap sach mein logout karna chahte hain?")) {
    localStorage.removeItem('currentUser');
    
    if (typeof showToast === 'function') {
      showToast("Successfully logout ho gaye! 👋", "success");
    } else {
      alert("Aap successfully logout ho gaye hain! 👋");
    }
    
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1000);
  }
}

// ============================================
// WEEKLY STREAK CALENDAR (FIXED)
// ============================================
function renderCalendar() {
  const calendarGrid = document.getElementById('calendarGrid');
  const monthYearEl = document.getElementById('currentMonthYear');
  const streakCountEl = document.getElementById('calStreakCount');

  if (!calendarGrid) return;

  // 👇 NAYA: playedDates array use karo
  let playedDates = [];
  try {
    playedDates = JSON.parse(localStorage.getItem('playedDates') || '[]');
  } catch (e) {
    playedDates = [];
  }

  // Purane lastPlayed ko bhi include karo (backward compatibility)
  const lastPlayed = localStorage.getItem('lastPlayed');
  if (lastPlayed && !playedDates.includes(lastPlayed)) {
    playedDates.push(lastPlayed);
  }

  // Streak calculate karo (aaj se peeche tak consecutive din)
  let streak = 0;
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const checkDate = new Date();
    checkDate.setDate(today.getDate() - i);
    if (playedDates.includes(checkDate.toDateString())) {
      streak++;
    } else {
      break;
    }
  }

  if (streakCountEl) streakCountEl.textContent = streak;
  localStorage.setItem('streak', streak);

  // Month/Year header
  const currentMonth = today.toLocaleString('en-IN', { month: 'long', year: 'numeric' });
  if (monthYearEl) monthYearEl.textContent = currentMonth;

  calendarGrid.innerHTML = '';
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);

    const isToday = i === 0;
    const isPlayed = playedDates.includes(date.toDateString()); // 👈 sahi check

    const dayBox = document.createElement('div');
    dayBox.className = `cal-day ${isToday ? 'today' : ''} ${isPlayed ? 'played' : ''}`;
    dayBox.innerHTML = `
      <span class="cal-day-name">${dayNames[date.getDay()]}</span>
      <span class="cal-date">${date.getDate()}</span>
      ${isPlayed ? '<span class="cal-check">✅</span>' : ''}
    `;
    calendarGrid.appendChild(dayBox);
  }
}

// ============================================
// START
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  loadDashboard();
  initFeedback();
  loadWordOfTheDay();
});


// ============================================
// BADGES SYSTEM
// ============================================
const allBadges = [
  { id: 'first_steps', icon: '🌱', title: 'First Steps', desc: 'Pehli baar quiz khela', condition: (stats) => stats.quizCount >= 1 },
  { id: 'century', icon: '💯', title: 'Century', desc: '100 points kamaye', condition: (stats) => stats.points >= 100 },
  { id: 'streak_master', icon: '🔥', title: 'Streak Master', desc: '3 din lagatar practice ki', condition: (stats) => stats.streak >= 3 },
  { id: 'grammar_guru', icon: '🧠', title: 'Grammar Guru', desc: 'Quiz mein 100% score', condition: (stats) => stats.perfectQuiz === true },
  { id: 'challenge_champ', icon: '⚡', title: 'Challenger', desc: 'Daily Challenge pass kiya', condition: (stats) => stats.challengePassed === true },
  { id: 'level_up', icon: '🚀', title: 'Level Up', desc: 'Beginner level cross kiya', condition: (stats) => stats.points >= 50 }
];

function renderBadges() {
  const badgesGrid = document.getElementById('badgesGrid');
  if (!badgesGrid) return;

  // User ke current stats nikaalo
  const stats = {
    points: parseInt(localStorage.getItem('points') || 0),
    quizCount: parseInt(localStorage.getItem('quizCount') || 0),
    streak: parseInt(localStorage.getItem('streak') || 0),
    perfectQuiz: localStorage.getItem('perfectQuiz') === 'true',
    challengePassed: localStorage.getItem('challengePassed') === 'true'
  };

  badgesGrid.innerHTML = ''; // Clear before rendering

  allBadges.forEach(badge => {
    const isUnlocked = badge.condition(stats);
    
    // Agar unlocked hai, toh usko save kar lo taaki permanently unlock rahe
    if (isUnlocked) {
      localStorage.setItem(`badge_${badge.id}`, 'true');
    }

    // Check karo ki pehle se unlock hai kya (permanent)
    const isPermanentlyUnlocked = localStorage.getItem(`badge_${badge.id}`) === 'true' || isUnlocked;

    const card = document.createElement('div');
    card.className = `badge-card ${isPermanentlyUnlocked ? 'unlocked' : 'locked'}`;
    
    card.innerHTML = `
      <div class="badge-icon">${badge.icon}</div>
      <div class="badge-title">${badge.title}</div>
      <div class="badge-desc">${badge.desc}</div>
    `;
    
    badgesGrid.appendChild(card);
  });
}


// ============================================
// WORD OF THE DAY LOGIC
// ============================================

// Alag words ki list (Aap isme jitne chahein words add kar sakte hain)
const dailyWords = [
  { word: "Serendipity", hindi: "सुखद संयोग (Sukhad Sanyog)", meaning: "Finding something good without looking for it.", example: "Meeting my old friend at the airport was pure serendipity." },
  { word: "Ephemeral", hindi: "क्षणभंगुर (Kshanbhangur)", meaning: "Lasting for a very short time.", example: "The beauty of a rainbow is ephemeral." },
  { word: "Resilience", hindi: "लचीलापन (Lachilapan)", meaning: "The ability to bounce back from difficulties.", example: "She showed great resilience after losing her job." },
  { word: "Ineffable", hindi: "अवर्णनीय (Avarnaniya)", meaning: "Too great to be expressed in words.", example: "The view from the mountain was ineffable." },
  { word: "Euphoria", hindi: "अत्यधिक खुशी (Atyadhik Khushi)", meaning: "A feeling of intense excitement and happiness.", example: "The team felt euphoria after winning the championship." },
  { word: "Wanderlust", hindi: "घूमने की चाह (Ghumne ki Chaah)", meaning: "A strong desire to travel.", example: "Her wanderlust took her to over 30 countries." },
  { word: "Petrichor", hindi: "मिट्टी की सोंधी खुशबू (Mitti ki Sondhi Khushbu)", meaning: "The pleasant smell of earth after rain.", example: "The petrichor after the first rain is amazing." },
  { word: "Eloquence", hindi: "वाक्पटुता (Vakpatuta)", meaning: "Fluent or persuasive speaking or writing.", example: "The leader spoke with great eloquence." },
  { word: "Solitude", hindi: "एकांत (Ekant)", meaning: "The state of being alone, often peaceful.", example: "He enjoyed the solitude of the early morning." },
  { word: "Awe", hindi: "विस्मय (Vismay)", meaning: "A feeling of great respect mixed with wonder.", example: "We stood in awe of the beautiful sunset." },
  { word: "Nostalgia", hindi: "पुरानी यादें (Purani Yaadein)", meaning: "A sentimental longing for the past.", example: "Old songs fill me with nostalgia." },
  { word: "Altruism", hindi: "परोपकार (Paropkar)", meaning: "Selfless concern for the well-being of others.", example: "Her altruism led her to volunteer at the shelter." },
  { word: "Clarity", hindi: "स्पष्टता (Spashtata)", meaning: "The quality of being clear.", example: "He explained the concept with great clarity." },
  { word: "Tenacity", hindi: "दृढ़ता (Dridhta)", meaning: "The quality of holding on firmly.", example: "Her tenacity helped her finish the marathon." },
  { word: "Authentic", hindi: "प्रामाणिक (Pramanik)", meaning: "Genuine, real, not fake.", example: "This is an authentic Italian restaurant." }
];

function loadWordOfTheDay() {
  const container = document.getElementById('wordOfDayCard');
  if (!container) return;

  // Aaj ki date nikaalo (taaki har din word badle)
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
  
  // Date ke hisaab se word select karo (same din par same word aayega)
  const wordIndex = dayOfYear % dailyWords.length;
  const data = dailyWords[wordIndex];

  container.innerHTML = `
    <div class="wod-header">
      <h3 class="wod-word">${data.word}</h3>
      <button class="wod-audio-btn" onclick="speakWodWord('${data.word}')" title="Sunne ke liye click karein">🔊</button>
    </div>
    <p class="wod-hindi">${data.hindi}</p>
    <p class="wod-meaning"><strong>Meaning:</strong> ${data.meaning}</p>
    <div class="wod-example">
      <strong>Example:</strong> "${data.example}"
    </div>
  `;
}

// Pronunciation function
function speakWodWord(word) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }
}


// ============================================
// RESET PROGRESS (FACTORY RESET)
// ============================================
function resetProgress() {
  // 1. User se double confirm karo
  const confirm1 = confirm("⚠️ Kya aap sach mein apna saara progress reset karna chahte hain?\n\nAapke saare Points, Badges aur Streak delete ho jayenge.");
  
  if (!confirm1) return; // Agar Cancel daba diya toh ruk jao

  const confirm2 = confirm("🚨 FINAL WARNING!\n\nKya aap bilkul sure hain? Ye action wapas nahi ho sakta.");
  
  if (!confirm2) return;

  // 2. LocalStorage se saara data delete karo
  localStorage.removeItem('points');
  localStorage.removeItem('quizCount');
  localStorage.removeItem('streak');
  localStorage.removeItem('lastPlayed');
  localStorage.removeItem('playedDates');
  localStorage.removeItem('dailyChallengeDate');
  localStorage.removeItem('perfectQuiz');
  localStorage.removeItem('challengePassed');
  localStorage.removeItem('lastRankToast');

  // Saare badges unlock data delete karo
  const badges = ['first_steps', 'century', 'streak_master', 'grammar_guru', 'challenge_champ', 'level_up'];
  badges.forEach(b => localStorage.removeItem(`badge_${b}`));

  // Saare lessons read/unlock data delete karo
  for (let i = 1; i <= 30; i++) {
    localStorage.removeItem(`lesson_${i}_read`);
    localStorage.removeItem(`lesson_${i}_unlocked`);
    localStorage.removeItem(`level_${i}_passed`);
  }

   // 3. Firebase se bhi points delete karo (0 kar do)
  const currentUser = localStorage.getItem('currentUser');
  if (currentUser && window.firebaseDB && window.firebaseSet) {
    const safeEmail = currentUser.replace(/[.#$\[\]]/g, '_');
    const userRef = window.firebaseRef(window.firebaseDB, 'users/' + safeEmail);

    window.firebaseSet(userRef, {
      email: currentUser,
      points: 0,
      quizCount: 0,
      lastUpdated: Date.now()
    }).then(() => {
      if (typeof showToast === 'function') {
        showToast("Tumhara progress successfully reset ho gaya!", "success");
      }
      
      // 1.5 second baad page refresh karo taaki sab 0 dikhe
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }).catch((err) => {
      console.error('❌ Reset error:', err);
      alert("Data reset karne mein error aaya. Kripya Firebase Rules check karein.");
    });
  } else {
    // Agar Firebase nahi hai, toh sirf page refresh karo
    alert("Progress reset ho gaya (Local storage se).");
    window.location.reload();
  }
}