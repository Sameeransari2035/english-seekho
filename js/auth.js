// ============================================
// AUTH LOGIC (Login / Signup)
// ============================================
let isLoginMode = true;

const tabLogin = document.getElementById('tabLogin');
const tabSignup = document.getElementById('tabSignup');
const authForm = document.getElementById('authForm');
const authEmail = document.getElementById('authEmail');
const authPassword = document.getElementById('authPassword');
const authSubmitBtn = document.getElementById('authSubmitBtn');
const authError = document.getElementById('authError');

// ============================================
// TAB SWITCH
// ============================================
tabLogin.onclick = () => {
  isLoginMode = true;
  tabLogin.classList.add('active');
  tabSignup.classList.remove('active');
  authSubmitBtn.textContent = 'Login Karein';
  authError.style.display = 'none';
};

tabSignup.onclick = () => {
  isLoginMode = false;
  tabSignup.classList.add('active');
  tabLogin.classList.remove('active');
  authSubmitBtn.textContent = 'Account Banayein';
  authError.style.display = 'none';
};

// ============================================
// FORM SUBMIT
// ============================================
authForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const email = authEmail.value.trim();
  const password = authPassword.value;

  authError.style.display = 'none';

  if (password.length < 6) {
    authError.textContent = "⚠️ Password kam se kam 6 characters ka hona chahiye!";
    authError.style.display = 'block';
    return;
  }

  authSubmitBtn.textContent = "Please wait...";
  authSubmitBtn.disabled = true;

  // Firebase ready hone ka wait karo
  function waitForFirebaseAuth() {
    if (!window.firebaseAuth) {
      setTimeout(waitForFirebaseAuth, 100);
      return;
    }

    if (isLoginMode) {
      // ============================================
      // LOGIN
      // ============================================
      window.firebaseSignIn(window.firebaseAuth, email, password)
        .then((userCredential) => {
          localStorage.setItem('currentUser', userCredential.user.email);

          // Firebase se points sync karo
          syncUserDataFromFirebase(userCredential.user.email).then(() => {
            if (typeof showToast === 'function') {
              showToast("Login successful! 🎉", "success");
            }
            setTimeout(() => {
              window.location.href = 'dashboard.html';
            }, 1500);
          });
        })
        .catch((error) => {
          showError(error.message);
        });

    } else {
      // ============================================
      // SIGNUP
      // ============================================
      window.firebaseCreateUser(window.firebaseAuth, email, password)
        .then((userCredential) => {
          localStorage.setItem('currentUser', userCredential.user.email);

          // Naye user ke liye Firebase mein initial record banao
          const safeEmail = userCredential.user.email.replace(/[.#$\[\]]/g, '_');
          const userRef = window.firebaseRef(window.firebaseDB, 'users/' + safeEmail);

          window.firebaseSet(userRef, {
            email: userCredential.user.email,
            points: 0,
            quizCount: 0,
            lastUpdated: Date.now()
          }).then(() => {
            // LocalStorage reset karo naye user ke liye
            localStorage.setItem('points', 0);
            localStorage.setItem('quizCount', 0);
            localStorage.removeItem('playedDates');
            localStorage.removeItem('dailyChallengeDate');
            localStorage.removeItem('streak');
            localStorage.removeItem('lastPlayed');
            
            // Purane lesson unlock data clear karo
            for (let i = 1; i <= 30; i++) {
              localStorage.removeItem(`lesson_${i}_read`);
              localStorage.removeItem(`lesson_${i}_unlocked`);
              localStorage.removeItem(`level_${i}_passed`);
            }

            if (typeof showToast === 'function') {
              showToast("Account created successfully! 🎉", "success");
            }

            setTimeout(() => { window.location.href = 'dashboard.html'; }, 1000);
          });
        })
        .catch((error) => {
          showError(error.message);
        });
    }
  }

  waitForFirebaseAuth();
});

// ============================================
// FIREBASE SE USER DATA SYNC
// ============================================
function syncUserDataFromFirebase(email) {
  return new Promise((resolve) => {
    // Agar Firebase DB ready nahi hai, toh localStorage par bharosa karo
    if (!window.firebaseDB || !window.firebaseRef || !window.firebaseGet) {
      console.warn('⚠️ Firebase DB not ready, skipping sync');
      resolve();
      return;
    }

    const safeEmail = email.replace(/[.#$\[\]]/g, '_');
    const userRef = window.firebaseRef(window.firebaseDB, 'users/' + safeEmail);

    window.firebaseGet(userRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          if (data.points !== undefined) {
            localStorage.setItem('points', data.points);
          }
          if (data.quizCount !== undefined) {
            localStorage.setItem('quizCount', data.quizCount);
          }
          if (data.lastChallengeDate !== undefined) {
            localStorage.setItem('dailyChallengeDate', data.lastChallengeDate);
          }
          console.log('✅ User data synced from Firebase');
        } else {
          // Naya user hai (ya Firebase mein record nahi hai) — defaults set karo
          localStorage.setItem('points', 0);
          localStorage.setItem('quizCount', 0);
          console.log('ℹ️ New user, defaults set');
        }
        resolve();
      })
      .catch((err) => {
        console.error('❌ Firebase sync error:', err);
        resolve(); // Sync fail ho toh bhi aage badho
      });
  });
}

// ============================================
// ERROR HANDLER
// ============================================
function showError(msg) {
  authSubmitBtn.textContent = isLoginMode ? 'Login Karein' : 'Account Banayein';
  authSubmitBtn.disabled = false;

  let errorMsg = "";
  if (msg.includes('auth/invalid-credential') || msg.includes('auth/user-not-found') || msg.includes('auth/wrong-password') || msg.includes('auth/invalid-email')) {
    errorMsg = "Email ya password galat hai!";
  } else if (msg.includes('auth/email-already-in-use')) {
    errorMsg = "Ye email pehle se registered hai. Login karein!";
  } else if (msg.includes('auth/weak-password')) {
    errorMsg = "Password kamzor hai (6+ characters chahiye).";
  } else if (msg.includes('auth/too-many-requests')) {
    errorMsg = "Bahut zyada attempts! Thodi der baad try karein.";
  } else if (msg.includes('auth/network-request-failed')) {
    errorMsg = "Internet connection check karein.";
  } else {
    errorMsg = "Error: " + msg;
  }

  if (typeof showToast === 'function') {
    showToast(errorMsg, 'error');
  } else {
    alert(errorMsg);
  }
}