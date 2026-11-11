// ============================================
// SPEAKING PRACTICE LOGIC (Sentences & Stories)
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
  "Today is a good day."
];

const stories = [
  {
    title: "The Thirsty Crow",
    text: "One hot summer day, a crow was very thirsty. He flew here and there in search of water. At last, he saw a pot with a little water. He picked up some pebbles and dropped them into the pot. Slowly, the water level rose up. The clever crow drank the water and flew away."
  },
  {
    title: "The Honest Woodcutter",
    text: "Once upon a time, a poor woodcutter was cutting a tree near a river. Suddenly, his axe fell into the river. A river god appeared. He brought a golden axe, but the woodcutter refused. The god was pleased with his honesty and gave him all three axes."
  },
  {
    title: "The Lion and the Mouse",
    text: "A lion was sleeping in a forest. A little mouse woke him up. The lion caught him, but the mouse promised to help him someday. The lion laughed and let him go. A few days later, the lion was caught in a net. The mouse came and gnawed the ropes to free him."
  }
];

let currentSentenceIndex = Math.floor(Math.random() * sentences.length);
let currentStoryIndex = Math.floor(Math.random() * stories.length);
let recognition;
let isListening = false;
let currentMode = 'sentence'; // 'sentence' or 'story'

// Initialize Speech Recognition
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onstart = () => {
    isListening = true;
    if (currentMode === 'sentence') {
      document.getElementById('micBtn').classList.add('listening');
      document.getElementById('micStatus').textContent = "🔴 Sun rahe hain... Ab bolein!";
    } else {
      document.getElementById('micStoryBtn').classList.add('listening');
      document.getElementById('micStoryStatus').textContent = "🔴 Sun rahe hain... Story bolein!";
    }
  };

  recognition.onresult = (event) => {
    const spokenText = event.results[0][0].transcript;
    if (currentMode === 'sentence') {
      checkSentencePronunciation(spokenText);
    } else {
      checkStoryPronunciation(spokenText);
    }
  };

  recognition.onerror = (event) => {
    if (currentMode === 'sentence') {
      document.getElementById('micStatus').textContent = "❌ Error: " + event.error;
      document.getElementById('micBtn').classList.remove('listening');
    } else {
      document.getElementById('micStoryStatus').textContent = "❌ Error: " + event.error;
      document.getElementById('micStoryBtn').classList.remove('listening');
    }
    isListening = false;
  };

  recognition.onend = () => {
    document.getElementById('micBtn').classList.remove('listening');
    document.getElementById('micStoryBtn').classList.remove('listening');
    isListening = false;
  };
} else {
  alert("Aapka browser mic support nahi karta. Chrome use karein.");
}

// ============================================
// MODE SWITCHING
// ============================================
function switchMode(mode) {
  currentMode = mode;
  if (window.speechSynthesis.speaking) window.speechSynthesis.cancel();

  if (mode === 'sentence') {
    document.getElementById('tabSentence').classList.add('active');
    document.getElementById('tabStory').classList.remove('active');
    document.getElementById('sentenceMode').style.display = 'block';
    document.getElementById('storyMode').style.display = 'none';
  } else {
    document.getElementById('tabStory').classList.add('active');
    document.getElementById('tabSentence').classList.remove('active');
    document.getElementById('sentenceMode').style.display = 'none';
    document.getElementById('storyMode').style.display = 'block';
  }
}

// ============================================
// SENTENCE MODE LOGIC
// ============================================
function loadSentence() {
  document.getElementById('targetSentence').textContent = sentences[currentSentenceIndex];
  document.getElementById('resultBox').style.display = 'none';
  document.getElementById('nextBtn').style.display = 'none';
  document.getElementById('micStatus').textContent = "Bolne ke liye mic button dabayein";
}

document.getElementById('listenBtn').onclick = () => {
  const utterance = new SpeechSynthesisUtterance(sentences[currentSentenceIndex]);
  utterance.lang = 'en-US';
  utterance.rate = 0.9;
  window.speechSynthesis.speak(utterance);
};

document.getElementById('micBtn').onclick = () => {
  if (isListening) recognition.stop();
  else { currentMode = 'sentence'; recognition.start(); }
};

function checkSentencePronunciation(spokenText) {
  document.getElementById('micStatus').textContent = "✅ Aapne bola: \"" + spokenText + "\"";
  const target = sentences[currentSentenceIndex].toLowerCase().replace(/[.,!?]/g, '');
  const spoken = spokenText.toLowerCase().replace(/[.,!?]/g, '');
  
  let score = 0;
  const targetWords = target.split(' ');
  const spokenWords = spoken.split(' ');
  targetWords.forEach(word => { if (spokenWords.includes(word)) score++; });

  const percentage = Math.round((score / targetWords.length) * 100);
  const resultBox = document.getElementById('resultBox');
  resultBox.style.display = 'block';

  if (percentage >= 80) {
    resultBox.innerHTML = `<div class="result-success"><h3>🌟 Excellent! (${percentage}% Match)</h3><p>Aapki pronunciation bahut achhi hai!</p></div>`;
    addPoints(10);
  } else if (percentage >= 50) {
    resultBox.innerHTML = `<div class="result-warning"><h3>👍 Achha! (${percentage}% Match)</h3><p>Thodi si aur practice karein.</p></div>`;
  } else {
    resultBox.innerHTML = `<div class="result-error"><h3>💪 Thoda Mushkil Hua (${percentage}% Match)</h3><p>Phir se try karein!</p></div>`;
  }
  document.getElementById('nextBtn').style.display = 'inline-block';
}

document.getElementById('nextBtn').onclick = () => {
  currentSentenceIndex = (currentSentenceIndex + 1) % sentences.length;
  loadSentence();
};

// ============================================
// STORY MODE LOGIC
// ============================================
function loadStory() {
  const story = stories[currentStoryIndex];
  document.getElementById('targetStory').textContent = story.text;
  document.getElementById('resultStoryBox').style.display = 'none';
  document.getElementById('nextStoryBtn').style.display = 'none';
  document.getElementById('micStoryStatus').textContent = "Story bolne ke liye mic button dabayein";
}

document.getElementById('listenStoryBtn').onclick = () => {
  const story = stories[currentStoryIndex];
  const utterance = new SpeechSynthesisUtterance(story.text);
  utterance.lang = 'en-US';
  utterance.rate = 0.85; // Story ke liye thoda slow
  window.speechSynthesis.speak(utterance);
};

document.getElementById('micStoryBtn').onclick = () => {
  if (isListening) recognition.stop();
  else { currentMode = 'story'; recognition.start(); }
};

function checkStoryPronunciation(spokenText) {
  document.getElementById('micStoryStatus').textContent = "✅ Aapne kuch bola! Check result.";
  
  const story = stories[currentStoryIndex];
  const target = story.text.toLowerCase().replace(/[.,!?]/g, '');
  const spoken = spokenText.toLowerCase().replace(/[.,!?]/g, '');
  
  let score = 0;
  const targetWords = target.split(' ');
  const spokenWords = spoken.split(' ');
  targetWords.forEach(word => { if (spokenWords.includes(word)) score++; });

  const percentage = Math.round((score / targetWords.length) * 100);
  const resultBox = document.getElementById('resultStoryBox');
  resultBox.style.display = 'block';

  // Story ke liye pass hona thoda mushkil hota hai, isliye threshold kam rakha hai
  if (percentage >= 60) {
    resultBox.innerHTML = `<div class="result-success"><h3>🌟 Shandar Kahani! (${percentage}% Match)</h3><p>Aapne bahut accha padha!</p></div>`;
    addPoints(20);
  } else if (percentage >= 30) {
    resultBox.innerHTML = `<div class="result-warning"><h3>👍 Achha Prayas! (${percentage}% Match)</h3><p>Aap story ko dheere padh kar aur saaf bolne ki koshish karein.</p></div>`;
    addPoints(5);
  } else {
    resultBox.innerHTML = `<div class="result-error"><h3>💪 Thoda Mushkil Hua (${percentage}% Match)</h3><p>Pehle 'Listen' button dabakar sun lein, phir bolenge.</p></div>`;
  }
  document.getElementById('nextStoryBtn').style.display = 'inline-block';
}

document.getElementById('nextStoryBtn').onclick = () => {
  currentStoryIndex = (currentStoryIndex + 1) % stories.length;
  loadStory();
};

// ============================================
// HELPER: ADD POINTS
// ============================================
function addPoints(points) {
  let totalPoints = parseInt(localStorage.getItem('points') || 0) + points;
  localStorage.setItem('points', totalPoints);

  // Firebase Save
  const currentUser = localStorage.getItem('currentUser');
  if (currentUser && window.firebaseDB) {
    const safeEmail = currentUser.replace(/[.#$\[\]]/g, '_');
    const userRef = window.firebaseRef(window.firebaseDB, 'users/' + safeEmail);
    window.firebaseGet(userRef).then((snapshot) => {
      let fbPoints = 0;
      if (snapshot.exists()) fbPoints = snapshot.val().points || 0;
      window.firebaseSet(userRef, {
        points: fbPoints + points,
        email: currentUser,
        lastUpdated: Date.now()
      });
    });
  }
}

// ============================================
// START
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  loadSentence();
  loadStory();
});