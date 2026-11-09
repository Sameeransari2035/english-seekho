// ============================================
// VOCABULARY DATA (30+ Words)
// ============================================
const vocabularyWords = [
  { word: "Abundant", hindi: "बहुतायत (Bahutayat)", meaning: "Available in large quantities.", example: "The country has abundant natural resources." },
  { word: "Benevolent", hindi: "परोपकारी (Paropkari)", meaning: "Kind and generous.", example: "The benevolent old man donated all his money." },
  { word: "Candid", hindi: "स्पष्टवादी (Spashtvadi)", meaning: "Truthful and straightforward.", example: "She gave a candid interview." },
  { word: "Diligent", hindi: "मेहनती (Mehnati)", meaning: "Showing care and effort in work.", example: "He is a diligent student." },
  { word: "Eloquent", hindi: "वाक्पटु (Vakpatu)", meaning: "Fluent or persuasive in speaking.", example: "She gave an eloquent speech." },
  { word: "Frugal", hindi: "मितव्ययी (Mitvyayi)", meaning: "Sparing or economical with money.", example: "They lived a frugal life to save money." },
  { word: "Gregarious", hindi: "मिलनसार (Milansar)", meaning: "Fond of company; sociable.", example: "He is a gregarious person." },
  { word: "Hazard", hindi: "खतरा (Khatra)", meaning: "A danger or risk.", example: "Smoking is a serious health hazard." },
  { word: "Integrity", hindi: "ईमानदारी (Imandari)", meaning: "Quality of being honest.", example: "She is a woman of great integrity." },
  { word: "Jubilant", hindi: "प्रसन्नचित्त (Prasannachitt)", meaning: "Feeling great happiness.", example: "The jubilant crowd celebrated the victory." },
  { word: "Keen", hindi: "उत्सुक (Utsuk)", meaning: "Eager or enthusiastic.", example: "He is a keen learner of English." },
  { word: "Lucid", hindi: "स्पष्ट (Spasht)", meaning: "Expressed clearly; easy to understand.", example: "She gave a lucid explanation." },
  { word: "Meticulous", hindi: "अति सतर्क (Ati Satark)", meaning: "Showing great attention to detail.", example: "He is very meticulous about his work." },
  { word: "Novice", hindi: "नौसिखिया (Nausikhiya)", meaning: "A person new to a field.", example: "I am a novice at playing guitar." },
  { word: "Obsolete", hindi: "पुराना (Purana)", meaning: "No longer produced or used.", example: "Typewriters are obsolete now." },
  { word: "Placid", hindi: "शांत (Shaant)", meaning: "Calm and peaceful.", example: "The placid lake looked beautiful." },
  { word: "Quaint", hindi: "अनोखा (Anokha)", meaning: "Attractively unusual or old-fashioned.", example: "We stayed in a quaint little village." },
  { word: "Resilient", hindi: "लचीला (Lachila)", meaning: "Able to recover quickly from difficulties.", example: "Kids are usually very resilient." },
  { word: "Serene", hindi: "शांत (Shaant)", meaning: "Calm, peaceful, and untroubled.", example: "I love the serene environment of the mountains." },
  { word: "Tenacious", hindi: "हठी (Hathi)", meaning: "Tending to keep a firm hold; determined.", example: "She is tenacious and never gives up." },
  { word: "Ubiquitous", hindi: "सर्वव्यापी (Sarvavyapi)", meaning: "Present, appearing, or found everywhere.", example: "Mobile phones are ubiquitous today." },
  { word: "Vivid", hindi: "जीवंत (Jeevant)", meaning: "Producing powerful feelings or clear images.", example: "I have vivid memories of my childhood." },
  { word: "Wary", hindi: "सतर्क (Satark)", meaning: "Feeling or showing caution.", example: "Be wary of strangers offering gifts." },
  { word: "Yield", hindi: "झुकना / उत्पादन देना (Jhukna)", meaning: "To produce or provide; to surrender.", example: "The tree yields delicious mangoes." },
  { word: "Zeal", hindi: "जोश (Josh)", meaning: "Great energy or enthusiasm.", example: "She works with great zeal." },
  { word: "Ample", hindi: "पर्याप्त (Paryapt)", meaning: "Enough or more than enough.", example: "We have ample time to finish this." },
  { word: "Bizarre", hindi: "अजीब (Ajeeb)", meaning: "Very strange or unusual.", example: "It was a bizarre dream." },
  { word: "Coherent", hindi: "सुसंगत (Susangat)", meaning: "Logical and consistent.", example: "He gave a coherent argument." },
  { word: "Dexterity", hindi: "निपुणता (Nipunta)", meaning: "Skill in performing tasks.", example: "She played the piano with great dexterity." },
  { word: "Empathy", hindi: "समानुभूति (Samanubhuti)", meaning: "Ability to understand feelings of others.", example: "A good leader must have empathy." }
];

// State variables
let currentFlashcardIndex = 0;

// ============================================
// RENDER VOCABULARY LIST
// ============================================
function renderVocabulary() {
  const grid = document.getElementById('vocabGrid');
  if (!grid) return;

  grid.innerHTML = ''; // Clear before rendering

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

// ============================================
// AUDIO PRONUNCIATION
// ============================================
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

// ============================================
// FLASHCARD LOGIC
// ============================================
function initFlashcards() {
  const startBtn = document.getElementById('startFlashcardBtn');
  const closeBtn = document.getElementById('closeFlashcardBtn');
  const modal = document.getElementById('flashcardModal');
  const flipCard = document.getElementById('flipCard');
  const prevBtn = document.getElementById('prevCardBtn');
  const nextBtn = document.getElementById('nextCardBtn');

  if (!startBtn) return;

  // Open Modal
  startBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
    currentFlashcardIndex = 0;
    loadFlashcard();
  });

  // Close Modal
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    flipCard.classList.remove('flipped'); // Reset flip on close
  });

  // Flip Card on Click
  flipCard.addEventListener('click', () => {
    flipCard.classList.toggle('flipped');
  });

  // Next Button
  nextBtn.addEventListener('click', () => {
    if (currentFlashcardIndex < vocabularyWords.length - 1) {
      currentFlashcardIndex++;
      flipCard.classList.remove('flipped'); // Pehle reset karo
      setTimeout(loadFlashcard, 150); // Thoda delay taaki flip smooth dikhe
    }
  });

  // Prev Button
  prevBtn.addEventListener('click', () => {
    if (currentFlashcardIndex > 0) {
      currentFlashcardIndex--;
      flipCard.classList.remove('flipped');
      setTimeout(loadFlashcard, 150);
    }
  });
}

function loadFlashcard() {
  const data = vocabularyWords[currentFlashcardIndex];
  
  // Update Text
  document.getElementById('flashWord').textContent = data.word;
  document.getElementById('flashHindi').textContent = data.hindi;
  document.getElementById('flashMeaning').textContent = data.meaning;
  document.getElementById('flashExample').textContent = `"${data.example}"`;
  
  // Update Counter
  document.getElementById('cardCounter').textContent = `Card ${currentFlashcardIndex + 1} / ${vocabularyWords.length}`;

  // Disable/Enable Buttons based on index
  const prevBtn = document.getElementById('prevCardBtn');
  const nextBtn = document.getElementById('nextCardBtn');
  
  prevBtn.style.opacity = currentFlashcardIndex === 0 ? '0.5' : '1';
  prevBtn.style.pointerEvents = currentFlashcardIndex === 0 ? 'none' : 'auto';
  
  nextBtn.style.opacity = currentFlashcardIndex === vocabularyWords.length - 1 ? '0.5' : '1';
  nextBtn.style.pointerEvents = currentFlashcardIndex === vocabularyWords.length - 1 ? 'none' : 'auto';
}

// ============================================
// START
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  renderVocabulary();
  initFlashcards();
});