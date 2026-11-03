// ============================================
// NAVBAR UPDATE (Login / Logout)
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  updateNavbar();
});

function updateNavbar() {
  const navLinks = document.querySelector('.nav-links');
  if (!navLinks) return;

  // Purana dynamic section hatao (agar exist karta hai)
  const oldDynamic = document.getElementById('navUserArea');
  if (oldDynamic) oldDynamic.remove();

  const currentUser = localStorage.getItem('currentUser');

  // Naya user area banao
  const userArea = document.createElement('li');
  userArea.id = 'navUserArea';
  userArea.style.display = 'flex';
  userArea.style.alignItems = 'center';
  userArea.style.gap = '0.5rem';

  if (currentUser) {
    // User logged in hai
    let userName = localStorage.getItem('userName');
    if (!userName || userName === 'User') {
      // Email se naam nikaalo
      userName = currentUser.split('@')[0];
      userName = userName.replace(/[0-9]/g, '');
      userName = userName.charAt(0).toUpperCase() + userName.slice(1);
    }

    userArea.innerHTML = `
      <div class="user-greeting">
        <span class="user-avatar">${userName.charAt(0).toUpperCase()}</span>
        <span class="user-name">${userName}</span>
      </div>
      <button class="btn-logout" onclick="logoutFromNavbar()">Logout</button>
    `;
  } else {
    // User logged out hai
    userArea.innerHTML = `
      <a href="login.html" class="btn-login-nav">Login</a>
    `;
  }

  navLinks.appendChild(userArea);
}

function logoutFromNavbar() {
  if (confirm("Kya aap sach mein logout karna chahte hain?")) {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userName');
    window.location.href = 'index.html';
  }
}