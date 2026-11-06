// ============================================
// PROFILE PAGE LOGIC
// ============================================
const levels = [
  { name: 'Beginner', min: 0, max: 50, icon: '🌱' },
  { name: 'Learner', min: 50, max: 150, icon: '📚' },
  { name: 'Intermediate', min: 150, max: 300, icon: '🚀' },
  { name: 'Advanced', min: 300, max: 500, icon: '⭐' },
  { name: 'Master', min: 500, max: 1000, icon: '👑' }
];

function loadProfile() {
  const currentUser = localStorage.getItem('currentUser');
  
  if (!currentUser) {
    alert("⚠️ Profile dekhne ke liye pehle Login karein!");
    window.location.href = 'login.html';
    return;
  }

  // Naam nikaalo
  let userName = localStorage.getItem('userName');
  if (!userName || userName === 'User') {
    userName = currentUser.split('@')[0];
    userName = userName.replace(/[0-9]/g, '');
    userName = userName.charAt(0).toUpperCase() + userName.slice(1);
  }

  // Profile Card update
  document.getElementById('profileName').textContent = userName;
  document.getElementById('profileEmail').textContent = currentUser;
  document.getElementById('profileAvatar').textContent = userName.charAt(0).toUpperCase();

  // Points
  const points = parseInt(localStorage.getItem('points') || 0);
  const quizCount = parseInt(localStorage.getItem('quizCount') || 0);
  document.getElementById('profilePoints').textContent = points;
  document.getElementById('profileQuizzes').textContent = quizCount;

  // Level
  let currentLevel = levels[0];
  for (let i = levels.length - 1; i >= 0; i--) {
    if (points >= levels[i].min) {
      currentLevel = levels[i];
      break;
    }
  }
  document.getElementById('profileLevel').textContent = `${currentLevel.icon} ${currentLevel.name}`;

  // Rank Firebase se
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
      document.getElementById('profileRank').textContent = '-';
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
    document.getElementById('profileRank').textContent = rank !== '-' ? '#' + rank : '-';
  });
}

function editName() {
  const currentName = localStorage.getItem('userName') || '';
  let newName = prompt("Apna naya naam likhein:", currentName);
  
  if (newName !== null && newName.trim() !== "") {
    newName = newName.trim();
    localStorage.setItem('userName', newName);
    loadProfile();
    if (typeof updateNavbar === 'function') updateNavbar();
    alert("Naam successfully update ho gaya! ✅");
  }
}

function logoutUser() {
  if (confirm("Kya aap sach mein logout karna chahte hain?")) {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userName');
    window.location.href = 'index.html';
  }
}

// Start
document.addEventListener('DOMContentLoaded', loadProfile);



