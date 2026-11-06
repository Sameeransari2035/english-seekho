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

// Tab Switch Logic
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

// Form Submit
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
    if (window.firebaseAuth) {
            if (isLoginMode) {
        // LOGIN
        window.firebaseSignIn(window.firebaseAuth, email, password)
          .then((userCredential) => {
            localStorage.setItem('currentUser', userCredential.user.email);

            // Toast dikhao
            if (typeof showToast === 'function') {
              showToast("Login successful! Welcome back 🎉", "success");
            }
            
            // 1.5 second baad Dashboard par bhejo
            setTimeout(() => {
              window.location.href = 'dashboard.html';
            }, 1500);
          })
          .catch((error) => {
            showError(error.message);
          });
      } else {

        
        // SIGNUP
        window.firebaseCreateUser(window.firebaseAuth, email, password)
          .then((userCredential) => {
            localStorage.setItem('currentUser', userCredential.user.email);

            // Toast dikhao
            if (typeof showToast === 'function') {
              showToast("Account created successfully! 🎉", "success");
            }

            setTimeout(() => { window.location.href = 'dashboard.html'; }, 1000);
          })
          .catch((error) => {
            showError(error.message);
          });
      }
    } else {
      setTimeout(waitForFirebaseAuth, 100);
    }
  }

  waitForFirebaseAuth();
});

function showError(msg) {
  authSubmitBtn.textContent = isLoginMode ? 'Login Karein' : 'Account Banayein';
  authSubmitBtn.disabled = false;

  let errorMsg = "";
  if (msg.includes('auth/invalid-credential') || msg.includes('auth/user-not-found') || msg.includes('auth/wrong-password')) {
    errorMsg = "Email ya password galat hai!";
  } else if (msg.includes('auth/email-already-in-use')) {
    errorMsg = "Ye email pehle se registered hai. Login karein!";
  } else if (msg.includes('auth/weak-password')) {
    errorMsg = "Password kamzor hai (6+ characters chahiye).";
  } else {
    errorMsg = "Error: " + msg;
  }

  if (typeof showToast === 'function') {
    showToast(errorMsg, 'error');
  } else {
    alert(errorMsg);
  }
}