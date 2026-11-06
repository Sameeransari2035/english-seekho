// ============================================
// TOAST NOTIFICATION SYSTEM
// ============================================
function showToast(message, type = 'info') {
  // Container banao agar nahi hai
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  // Toast Element banao
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  // Icon set karo
  let icon = 'ℹ️';
  if (type === 'success') icon = '✅';
  if (type === 'error') icon = '❌';
  if (type === 'warning') icon = '⚠️';

  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  
  // Pehle invisible rakho taaki flash na ho
  toast.style.opacity = '0';
  container.appendChild(toast);

  // Animation trigger karo
  requestAnimationFrame(() => {
    setTimeout(() => {
      toast.classList.add('show');
      toast.style.opacity = '1';
    }, 10);
  });

  // 3 second baad hatao
  setTimeout(() => {
    toast.classList.remove('show');
    toast.style.opacity = '0';
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, 3000);
}