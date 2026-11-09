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