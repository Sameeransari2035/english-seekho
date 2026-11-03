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
  if (!navbar) return;

  // Button banao
  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'theme-toggle';
  toggleBtn.setAttribute('aria-label', 'Toggle dark mode');
  toggleBtn.innerHTML = getIcon();

  // Click handler
  toggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    toggleBtn.innerHTML = getIcon();
  });

  // Navbar mein add karo
  navbar.appendChild(toggleBtn);
}

function getIcon() {
  const isDark = document.documentElement.classList.contains('dark-mode');
  return isDark ? '☀️' : '🌙';
}