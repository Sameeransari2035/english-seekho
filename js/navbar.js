// ============================================
// MOBILE MENU TOGGLE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Link click par menu close karo (mobile par)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }
});


// ============================================
// SUPPORT WIDGET TOGGLE
// ============================================
function toggleSupportMenu() {
  const menu = document.getElementById('supportMenu');
  if (menu) {
    menu.classList.toggle('active');
  }
}

// Agar user menu ke bahar click kare toh menu band ho jaye
document.addEventListener('click', function(event) {
  const widget = document.querySelector('.support-widget');
  const menu = document.getElementById('supportMenu');
  
  if (widget && menu && !widget.contains(event.target)) {
    menu.classList.remove('active');
  }
});