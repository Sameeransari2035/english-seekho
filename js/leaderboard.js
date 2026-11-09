// ============================================
// LEADERBOARD LOGIC
// ============================================

function initLeaderboard() {
  if (!window.firebaseDB) {
    setTimeout(initLeaderboard, 100);
    return;
  }

  const db = window.firebaseDB;
  const usersRef = window.firebaseRef(db, 'users');
  
  const topScoresQuery = window.firebaseQuery(
    usersRef, 
    window.firebaseOrderByChild('points'), 
    window.firebaseLimitToLast(20)
  );

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

    const leaderboard = Object.values(data).sort((a, b) => (b.points || 0) - (a.points || 0));

    renderPodium(leaderboard, podium);

       rankingList.innerHTML = '';
    leaderboard.forEach((entry, index) => {
      const rank = index + 1;
      const medal = getMedal(rank);
      const name = entry.email ? entry.email.split('@')[0] : 'User';
      
      // Check if this is the current user
      const currentUser = localStorage.getItem('currentUser');
      const isCurrentUser = currentUser && entry.email === currentUser;

      const row = document.createElement('div');
      row.className = 'ranking-row' + (rank <= 3 ? ' top-' + rank : '');
      
      // 👇 NAYA: Agar current user hai, toh border highlight karo
      if (isCurrentUser) {
        row.style.border = "2px solid var(--primary)";
        row.style.background = "rgba(99, 102, 241, 0.05)";
      }

      row.innerHTML = `
        <span class="rank-number">${medal || rank}</span>
        <span class="rank-name">${name} ${isCurrentUser ? '<strong style="color: var(--primary);">(You)</strong>' : ''}</span>
        <span class="rank-score">${entry.points || 0} pts</span>
      `;
      rankingList.appendChild(row);
    });
  });
}
function renderPodium(leaderboard, container) {
  container.innerHTML = '';
  const order = [1, 0, 2]; // Visual order: 2nd, 1st, 3rd
  const heights = ['small', 'big', 'medium'];

  order.forEach((pos, visualIndex) => {
    const entry = leaderboard[pos];
    const rank = pos + 1;
    const heightClass = heights[visualIndex];

    const el = document.createElement('div');
    // 👇 NAYA: animation class add ki hai
    el.className = `podium-item podium-${heightClass} animate-pop`; 

    if (entry) {
      const medal = getMedal(rank);
      const name = entry.email ? entry.email.split('@')[0] : 'User';
      
      // Check if this is the current user
      const currentUser = localStorage.getItem('currentUser');
      const isCurrentUser = currentUser && entry.email === currentUser;
      
      // 👇 NAYA: Current user ke liye special styling
      const nameHTML = isCurrentUser 
        ? `<span style="color: var(--accent);">${name} (You)</span>` 
        : name;

      el.innerHTML = `
        <div class="podium-medal animate-bounce">${medal}</div>
        <div class="podium-name">${nameHTML}</div>
        <div class="podium-score">${entry.points || 0} pts</div>
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

initLeaderboard();