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
}

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

    const leaderboard = Object.values(data).sort((a, b) => (b.points || 0) - (a.points || 0));
    const rank = leaderboard.findIndex(u => u.email === currentEmail) + 1;
    
    if (rank > 0) {
      document.getElementById('dashRank').textContent = '#' + rank;
    } else {
      document.getElementById('dashRank').textContent = '-';
    }
  });
}

function logoutUser() {
  if (confirm("Kya aap sach mein logout karna chahte hain?")) {
    localStorage.removeItem('currentUser');
    alert("Aap successfully logout ho gaye hain! 👋");
    window.location.href = 'index.html';
  }
}

loadDashboard();