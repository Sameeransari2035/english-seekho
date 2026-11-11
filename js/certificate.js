// ============================================
// CERTIFICATE LOGIC
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const currentUser = localStorage.getItem('currentUser');
  
  if (!currentUser) {
    alert("⚠️ Certificate dekhne ke liye pehle Login karein!");
    window.location.href = 'login.html';
    return;
  }

  // 1. Check karo ki saare 100 lessons padhe hain ya nahi
  let allLessonsRead = true;
  for (let i = 1; i <= 100; i++) {
    if (localStorage.getItem(`lesson_${i}_read`) !== 'true') {
      allLessonsRead = false;
      break;
    }
  }

  // 2. Check karo ki saare 4 Bosses hare hain ya nahi
  let allBossesDefeated = true;
  for (let i = 1; i <= 4; i++) {
    if (localStorage.getItem(`level_${i}_passed`) !== 'true') {
      allBossesDefeated = false;
      break;
    }
  }

  // 3. Agar dono complete hain toh Certificate dikhao
  if (allLessonsRead && allBossesDefeated) {
    document.getElementById('lockedState').style.display = 'none';
    document.getElementById('certificateArea').style.display = 'block';
    
    // Naam set karo
    let userName = localStorage.getItem('userName');
    if (!userName || userName === 'User') {
      userName = currentUser.split('@')[0];
      userName = userName.replace(/[0-9]/g, '');
      userName = userName.charAt(0).toUpperCase() + userName.slice(1);
    }
    document.getElementById('certUserName').textContent = userName;

    // Aaj ki date set karo
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('certDate').textContent = today.toLocaleDateString('en-US', options);

    // Confetti blast!
    if (typeof confetti === 'function') {
      setTimeout(() => {
        confetti({
          particleCount: 200,
          spread: 100,
          origin: { y: 0.6 }
        });
      }, 500);
    }

  } else {
    // Agar course complete nahi hai, toh locked screen dikhao
    document.getElementById('lockedState').style.display = 'block';
    document.getElementById('certificateArea').style.display = 'none';
  }
});

// ============================================
// DOWNLOAD CERTIFICATE AS IMAGE
// ============================================
function downloadCertificate() {
  const certificateElement = document.getElementById('certificateBox');
  
  // html2canvas library use karke image generate karo
  html2canvas(certificateElement, { scale: 2 }).then(canvas => {
    // Image download link banao
    const link = document.createElement('a');
    link.download = 'English_Seekho_Certificate.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    
    if (typeof showToast === 'function') {
      showToast("Certificate download ho gaya! 🎉", "success");
    }
  }).catch(err => {
    console.error("Certificate download error:", err);
    alert("Certificate download karne mein problem aayi. Kripya screenshot le lein.");
  });
}