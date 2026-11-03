// ============================================
// SPEAKING PRACTICE LOGIC
// ============================================

const sentences = [
  "The sun rises in the east.",
  "I love to read books.",
  "She is a beautiful girl.",
  "We are going to the market.",
  "He plays cricket every day.",
  "My favorite color is blue.",
  "They are watching a movie.",
  "I want to learn English.",
  "The cat is sleeping on the chair.",
  "Today is a good day.",
  "I have been living in this city for five years.",
  "She will visit her grandmother next week.",
  "The teacher gave us a lot of homework.",
  "We should always respect our elders.",
  "He was playing football when it started raining.",
  "If you study hard, you will pass the exam.",
  "They have already completed their project.",
  "I am looking forward to meeting you.",
  "She sells sea shells by the sea shore.",
  "Peter Piper picked a peck of pickled peppers.",
  "The quick brown fox jumps over the lazy dog.",
  "How much wood would a woodchuck chuck if a woodchuck could chuck wood?"
];

let currentIndex = Math.floor(Math.random() * sentences.length);
let recognition;
let isListening = false;

const targetSentenceEl = document.getElementById('targetSentence');
const listenBtn = document.getElementById('listenBtn');
const micBtn = document.getElementById('micBtn');
const micStatus = document.getElementById('micStatus');
const resultBox = document.getElementById('resultBox');
const nextBtn = document.getElementById('nextBtn');

// Initialize Speech Recognition
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onstart = () => {
    isListening = true;
    micBtn.classList.add('listening');
    micStatus.textContent = "🔴 Sun rahe hain... Ab bolein!";
    micStatus.style.color = "var(--danger)";
    resultBox.style.display = 'none';
  };

  recognition.onresult = (event) => {
    const spokenText = event.results[0][0].transcript;
    checkPronunciation(spokenText);
  };

  recognition.onerror = (event) => {
    micStatus.textContent = "❌ Error: " + event.error + ". Kripya dobara try karein.";
    micStatus.style.color = "var(--danger)";
    micBtn.classList.remove('listening');
    isListening = false;
  };

  recognition.onend = () => {
    micBtn.classList.remove('listening');
    isListening = false;
    if (micStatus.textContent.includes("Sun rahe")) {
      micStatus.textContent = "Bolne ke liye mic button dabayein";
      micStatus.style.color = "var(--gray)";
    }
  };
} else {
  micBtn.disabled = true;
  micStatus.textContent = "Aapka browser mic support nahi karta. Chrome use karein.";
}

// Load Sentence
function loadSentence() {
  targetSentenceEl.textContent = sentences[currentIndex];
  resultBox.style.display = 'none';
  nextBtn.style.display = 'none';
  micStatus.textContent = "Bolne ke liye mic button dabayein";
  micStatus.style.color = "var(--gray)";
}

// Listen Button (Audio)
listenBtn.onclick = () => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(sentences[currentIndex]);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }
};

// Mic Button Click
micBtn.onclick = () => {
  if (isListening) {
    recognition.stop();
  } else {
    recognition.start();
  }
};

// Check Pronunciation
function checkPronunciation(spokenText) {
  micStatus.textContent = "✅ Aapne bola: \"" + spokenText + "\"";
  micStatus.style.color = "var(--success)";
  
  const target = sentences[currentIndex].toLowerCase().replace(/[.,!?]/g, '');
  const spoken = spokenText.toLowerCase().replace(/[.,!?]/g, '');
  
  let score = 0;
  const targetWords = target.split(' ');
  const spokenWords = spoken.split(' ');
  
  targetWords.forEach(word => {
    if (spokenWords.includes(word)) score++;
  });

  const percentage = Math.round((score / targetWords.length) * 100);

  resultBox.style.display = 'block';
  if (percentage >= 80) {
    resultBox.innerHTML = `<div class="result-success"><h3>🌟 Excellent! (${percentage}% Match)</h3><p>Aapki pronunciation bahut achhi hai!</p></div>`;
    
    // Points save karo
    let points = parseInt(localStorage.getItem('points') || 0) + 10;
    localStorage.setItem('points', points);
    
    // Firebase mein save karo
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser && window.firebaseDB) {
      const safeEmail = currentUser.replace(/[.#$\[\]]/g, '_');
      const userRef = window.firebaseRef(window.firebaseDB, 'users/' + safeEmail);
      window.firebaseGet(userRef).then((snapshot) => {
        let fbPoints = 0;
        if (snapshot.exists()) fbPoints = snapshot.val().points || 0;
        window.firebaseSet(userRef, {
          points: fbPoints + 10,
          email: currentUser,
          lastUpdated: Date.now()
        });
      });
    }
  } else if (percentage >= 50) {
    resultBox.innerHTML = `<div class="result-warning"><h3>👍 Achha! (${percentage}% Match)</h3><p>Thodi si aur practice karein.</p></div>`;
  } else {
    resultBox.innerHTML = `<div class="result-error"><h3>💪 Thoda Mushkil Hua (${percentage}% Match)</h3><p>Phir se try karein!</p></div>`;
  }

  nextBtn.style.display = 'inline-block';
}

// Next Button
nextBtn.onclick = () => {
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * sentences.length);
  } while (newIndex === currentIndex && sentences.length > 1);
  
  currentIndex = newIndex;
  loadSentence();
};

// Start
document.addEventListener('DOMContentLoaded', loadSentence);