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

  const points = parseInt(localStorage.getItem('points') || 0);
  const quizCount = parseInt(localStorage.getItem('quizCount') || 0);

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
  renderCalendar(); // Calendar render karo
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
function calculateRank(currentEmail) {
  if (!window.firebaseDB) {
    setTimeout(() => calculateRank(currentEmail), 200);
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
// WEEKLY STREAK CALENDAR
// ============================================
function renderCalendar() {
  const calendarGrid = document.getElementById('calendarGrid');
  const monthYearEl = document.getElementById('currentMonthYear');
  const streakCountEl = document.getElementById('calStreakCount');

  if (!calendarGrid) return;

  const lastPlayed = localStorage.getItem('lastPlayed');
  const streak = parseInt(localStorage.getItem('streak') || 0);

  if (streakCountEl) streakCountEl.textContent = streak;

  const today = new Date();
  const currentMonth = today.toLocaleString('en-IN', { month: 'long', year: 'numeric' });
  if (monthYearEl) monthYearEl.textContent = currentMonth;

  calendarGrid.innerHTML = '';
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);

    const isToday = i === 0;
    let isPlayed = false;

    // Sirf exact match par tick lagao
    if (lastPlayed && date.toDateString() === lastPlayed) {
      isPlayed = true;
    }

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