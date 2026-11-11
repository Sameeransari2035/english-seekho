// ============================================
// LEADERBOARD LOGIC (All Time & Weekly)
// ============================================
let currentView = 'alltime'; // 'alltime' or 'weekly'

function initLeaderboard() {
  if (!window.firebaseDB) {
    setTimeout(initLeaderboard, 100);
    return;
  }

  const db = window.firebaseDB;
  const usersRef = window.firebaseRef(db, 'users');
  
  const topScoresQuery = window.firebaseQuery(
    usersRef, 
    window.firebaseOrderByChild(currentView === 'alltime' ? 'points' : 'weeklyPoints'), 
    window.firebaseLimitToLast(20)
  );

  // Purana listener hatao (agar switch kiya hai toh)
  if (window.currentLeaderboardUnsubscribe) {
    window.currentLeaderboardUnsubscribe();
  }

  window.firebaseOnValue(topScoresQuery, (snapshot) => {
    const data = snapshot.val();
    const podium = document.getElementById('podium');
    const rankingList = document.getElementById('rankingList');
    const emptyState = document.getElementById('emptyLeaderboard');

    if (!data) {
      podium.innerHTML = '';
      rankingList.innerHTML = '';
      emptyState.style.display = 'block';
      document.querySelector('.podium-section').style.display = 'none';
      document.querySelector('.ranking-section').style.display = 'none';
      return;
    }

    emptyState.style.display = 'none';
    document.querySelector('.podium-section').style.display = 'block';
    document.querySelector('.ranking-section').style.display = 'block';

    // Points key ke hisaab se sort karo
    const pointsKey = currentView === 'alltime' ? 'points' : 'weeklyPoints';
    
    const leaderboard = Object.values(data)
      .filter(u => (u[pointsKey] || 0) > 0) // Sirf unhe dikhao jinke points > 0 hain
      .sort((a, b) => (b[pointsKey] || 0) - (a[pointsKey] || 0));

    renderPodium(leaderboard, podium, pointsKey);
    checkAndShowRankToast(leaderboard);

    rankingList.innerHTML = '';
    leaderboard.forEach((entry, index) => {
      const rank = index + 1;
      const medal = getMedal(rank);
      const name = entry.email ? entry.email.split('@')[0] : 'User';
      const points = entry[pointsKey] || 0;
      
      const currentUser = localStorage.getItem('currentUser');
      const isCurrentUser = currentUser && entry.email === currentUser;

      const row = document.createElement('div');
      row.className = 'ranking-row' + (rank <= 3 ? ' top-' + rank : '');
      
      if (isCurrentUser) {
        row.style.border = "2px solid var(--primary)";
        row.style.background = "rgba(99, 102, 241, 0.05)";
      }

      row.innerHTML = `
        <span class="rank-number">${medal || rank}</span>
        <span class="rank-name">${name} ${isCurrentUser ? '<strong style="color: var(--primary);">(You)</strong>' : ''}</span>
        <span class="rank-score">${points} pts</span>
      `;
      rankingList.appendChild(row);
    });
  });
}

function renderPodium(leaderboard, container, pointsKey) {
  container.innerHTML = '';
  const order = [1, 0, 2]; // Visual order: 2nd, 1st, 3rd
  const heights = ['small', 'big', 'medium'];

  order.forEach((pos, visualIndex) => {
    const entry = leaderboard[pos];
    const rank = pos + 1;
    const heightClass = heights[visualIndex];

    const el = document.createElement('div');
    el.className = `podium-item podium-${heightClass} animate-pop`; 

    if (entry) {
      const medal = getMedal(rank);
      const name = entry.email ? entry.email.split('@')[0] : 'User';
      const points = entry[pointsKey] || 0;
      const currentUser = localStorage.getItem('currentUser');
      const isCurrentUser = currentUser && entry.email === currentUser;
      const nameHTML = isCurrentUser ? `<span style="color: var(--accent);">${name} (You)</span>` : name;

      el.innerHTML = `
        <div class="podium-medal animate-bounce">${medal}</div>
        <div class="podium-name">${nameHTML}</div>
        <div class="podium-score">${points} pts</div>
        <div class="podium-stand podium-stand-${rank}">
          <span class="podium-rank">${rank}</span>
        </div>
      `;
    } else {
      el.innerHTML = `
        <div class="podium-medal">${getMedal(rank)}</div>
        <div class="podium-name" style="opacity:0.4;">—</div>
        <div class="podium-score" style="opacity:0.4;">—</div>
        <div class="podium-stand podium-stand-${rank}">
          <span class="podium-rank">${rank}</span>
        </div>
      `;
    }
    container.appendChild(el);
  });
}

function getMedal(rank) {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return '';
}

// ============================================
// TAB SWITCH LOGIC
// ============================================
function switchLeaderboard(view) {
  currentView = view;
  
  if (view === 'alltime') {
    document.getElementById('tabAllTime').classList.add('active');
    document.getElementById('tabWeekly').classList.remove('active');
  } else {
    document.getElementById('tabWeekly').classList.add('active');
    document.getElementById('tabAllTime').classList.remove('active');
  }
  
  initLeaderboard(); // Data dobara fetch karo
}

// ============================================
// TOP 3 RANK TOAST NOTIFICATION
// ============================================
function checkAndShowRankToast(leaderboard) {
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) return; 

  let userRank = -1;
  for (let i = 0; i < leaderboard.length; i++) {
    if (leaderboard[i].email === currentUser) {
      userRank = i + 1;
      break;
    }
  }

  if (userRank > 0 && userRank <= 3) {
    const toastKey = `lastRankToast_${currentView}`;
    const lastNotifiedRank = localStorage.getItem(toastKey);
    
    if (lastNotifiedRank !== String(userRank)) {
      let medal = userRank === 1 ? '🥇' : userRank === 2 ? '🥈' : '🥉';
      let typeText = currentView === 'weekly' ? 'is hafte' : '';
      let message = `Congratulations! Aap ${typeText} Leaderboard mein Rank ${userRank} par hain ${medal}`;
      
      if (typeof showToast === 'function') {
        setTimeout(() => { showToast(message, 'success'); }, 1000); 
      }
      localStorage.setItem(toastKey, userRank);
    }
  } else {
    localStorage.removeItem(`lastRankToast_${currentView}`);
  }
}

// Start
initLeaderboard();