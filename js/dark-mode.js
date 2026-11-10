// ============================================
// DARK MODE TOGGLE
// ============================================

// Page load hote hi theme apply karo (flash se bachne ke liye)
(function() {
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.documentElement.classList.add('dark-mode');
  } else {
    document.documentElement.classList.remove('dark-mode');
  }
})();

// Toggle button add karo jab DOM ready ho
window.addEventListener('DOMContentLoaded', () => {
  addToggleButton();
});

function addToggleButton() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.getElementById('navLinks');

  if (!navbar || !navLinks) return;

  // Button banao
  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'theme-toggle';
  toggleBtn.setAttribute('aria-label', 'Toggle dark mode');
  toggleBtn.innerHTML = getIcon();

  toggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    toggleBtn.innerHTML = getIcon();
  });

  // Ek naya <li> banayein jisme button rahega
  const toggleLi = document.createElement('li');
  toggleLi.className = 'nav-theme-item';
  toggleLi.appendChild(toggleBtn);

  // Mobile menu ke andar sabse upar add karein
  navLinks.insertBefore(toggleLi, navLinks.firstChild);

  // Desktop ke liye button ko navbar mein add karein (mobile par ye hide ho jayega CSS se)
  const desktopBtn = toggleBtn.cloneNode(true);
  desktopBtn.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    desktopBtn.innerHTML = getIcon();
    toggleBtn.innerHTML = getIcon(); // Dono buttons ka icon sync karein
  });
  navbar.appendChild(desktopBtn);
}

function getIcon() {
  const isDark = document.documentElement.classList.contains('dark-mode');
  return isDark ? '☀️' : '🌙';
}