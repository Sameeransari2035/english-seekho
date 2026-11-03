// ============================================
// VOCABULARY DATA
// ============================================
const vocabularyWords = [
  {
    word: "Abundant",
    hindi: "बहुतायत (Bahutayat)",
    meaning: "Available in large quantities; plentiful.",
    example: "The country has abundant natural resources."
  },
  {
    word: "Benevolent",
    hindi: "परोपकारी (Paropkari)",
    meaning: "Kind and generous.",
    example: "The benevolent old man donated all his money to charity."
  },
  {
    word: "Candid",
    hindi: "स्पष्टवादी (Spashtvadi)",
    meaning: "Truthful and straightforward.",
    example: "She gave a candid interview about her struggles."
  },
  {
    word: "Diligent",
    hindi: "मेहनती (Mehnati)",
    meaning: "Showing care and effort in your work.",
    example: "He is a diligent student who always completes his homework."
  },
  {
    word: "Eloquent",
    hindi: "वाक्पटु (Vakpatu)",
    meaning: "Fluent or persuasive in speaking or writing.",
    example: "She gave an eloquent speech at the conference."
  },
  {
    word: "Frugal",
    hindi: "कंजूस / मितव्ययी (Mitvyayi)",
    meaning: "Sparing or economical with regard to money or food.",
    example: "They lived a frugal life to save money for a house."
  },
  {
    word: "Gregarious",
    hindi: "मिलनसार (Milansar)",
    meaning: "Fond of company; sociable.",
    example: "He is a gregarious person who loves parties."
  },
  {
    word: "Hazard",
    hindi: "खतरा (Khatra)",
    meaning: "A danger or risk.",
    example: "Smoking is a serious health hazard."
  },
  {
    word: "Integrity",
    hindi: "ईमानदारी (Imandari)",
    meaning: "The quality of being honest and having strong moral principles.",
    example: "She is a woman of great integrity."
  },
  {
    word: "Jubilant",
    hindi: "प्रसन्नचित्त (Prasannachitt)",
    meaning: "Feeling or expressing great happiness and triumph.",
    example: "The jubilant crowd celebrated the victory."
  }
];

function renderVocabulary() {
  const grid = document.getElementById('vocabGrid');
  if (!grid) return;

  vocabularyWords.forEach(item => {
    const card = document.createElement('div');
    card.className = 'vocab-card';
    
    card.innerHTML = `
      <div class="vocab-header">
        <h3>${item.word}</h3>
        <button class="audio-btn" onclick="speakWord('${item.word}')" title="Sunne ke liye click karein">
          🔊
        </button>
      </div>
      <p class="vocab-hindi">${item.hindi}</p>
      <p class="vocab-meaning"><strong>Meaning:</strong> ${item.meaning}</p>
      <div class="vocab-example">
        <strong>Example:</strong> "${item.example}"
      </div>
    `;
    
    grid.appendChild(card);
  });
}

// Audio Pronunciation Function
function speakWord(word) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  } else {
    alert("Aapka browser audio support nahi karta.");
  }
}

// Start
document.addEventListener('DOMContentLoaded', renderVocabulary);