// ============================================
// IDIOMS & PHRASES DATA
// ============================================
const idiomsData = [
  {
    idiom: "Piece of cake",
    hindi: "बहुत आसान (Bahut Aasaan)",
    meaning: "Something very easy to do.",
    example: "The exam was a piece of cake for him."
  },
  {
    idiom: "Break a leg",
    hindi: "गुड लक (Good Luck)",
    meaning: "Used to wish someone good luck, especially before a performance.",
    example: "Break a leg in your interview today!"
  },
  {
    idiom: "Hit the sack",
    hindi: "सोने जाना (Sone Jaana)",
    meaning: "To go to bed or go to sleep.",
    example: "I am very tired, I think I will hit the sack."
  },
  {
    idiom: "Once in a blue moon",
    hindi: "कभी-कभार (Kabhi-Kabhar)",
    meaning: "Something that happens very rarely.",
    example: "He goes to the cinema once in a blue moon."
  },
  {
    idiom: "Under the weather",
    hindi: "थोड़ा बीमार (Thoda Bimar)",
    meaning: "Feeling slightly ill or sick.",
    example: "I am feeling a bit under the weather today."
  },
  {
    idiom: "Cost an arm and a leg",
    hindi: "बहुत महंगा (Bahut Mehnga)",
    meaning: "To be very expensive.",
    example: "That new car must have cost an arm and a leg."
  },
  {
    idiom: "Let the cat out of the bag",
    hindi: "राज़ की बात बताना (Raaz ki Baat Batana)",
    meaning: "To reveal a secret accidentally.",
    example: "It was a surprise party until John let the cat out of the bag."
  },
  {
    idiom: "Bite the bullet",
    hindi: "मुश्किल का सामना करना (Mushkil ka Saamna Karna)",
    meaning: "To face a difficult situation with courage.",
    example: "I had to bite the bullet and go to the doctor."
  },
  {
    idiom: "Hit the nail on the head",
    hindi: "सही बात कहना (Sahi Baat Kehna)",
    meaning: "To describe exactly what is causing a situation.",
    example: "You hit the nail on the head when you said he was lazy."
  },
  {
    idiom: "A blessing in disguise",
    hindi: "छिपा हुआ वरदान (Chipa Hua Vardaan)",
    meaning: "Something that seems bad at first but turns out to be good.",
    example: "Losing that job was a blessing in disguise because I found a better one."
  },
  {
    idiom: "Let's call it a day",
    hindi: "काम खत्म करते हैं (Kaam Khatam Karte Hain)",
    meaning: "To stop doing something for the day.",
    example: "We have been working for 8 hours. Let's call it a day."
  },
  {
    idiom: "Barking up the wrong tree",
    hindi: "गलत इंसान को ढूंढना (Galat Insaan ko Dhoondhna)",
    meaning: "Making a wrong assumption or looking in the wrong place.",
    example: "If you think I stole your pen, you are barking up the wrong tree."
  },
  {
    idiom: "Beat around the bush",
    hindi: "घुमा-फिरा कर बात करना (Ghooma-Fira Kar Baat Karna)",
    meaning: "To avoid talking about a difficult topic directly.",
    example: "Stop beating around the bush and tell me what happened."
  },
  {
    idiom: "Cry over spilt milk",
    hindi: "बीती बात पर पछताना (Beeti Baat par Pachhtana)",
    meaning: "To waste time worrying about a mistake that has already happened.",
    example: "It's too late to cry over spilt milk now."
  },
  {
    idiom: "Every cloud has a silver lining",
    hindi: "हर मुश्किल में कुछ अच्छा होता है (Har Mushkil mein Kuch Achha Hota Hai)",
    meaning: "There is something good in every bad situation.",
    example: "Don't be sad about failing; every cloud has a silver lining."
  },
  {
    idiom: "Kill two birds with one stone",
    hindi: "एक तीर से दो शिकार (Ek Teer se Do Shikar)",
    meaning: "To achieve two things with a single action.",
    example: "By cycling to work, I kill two birds with one stone: I save money and get exercise."
  },
  {
    idiom: "Speak of the devil",
    hindi: "किसी की बात हो रही हो और वो आ जाए (Naam liya aur hazir ho gaye)",
    meaning: "Said when someone you were just talking about appears.",
    example: "Speak of the devil, here comes Rahul!"
  },
  {
    idiom: "See eye to eye",
    hindi: "एक जैसी सोच होना (Ek Jaisi Soch Hona)",
    meaning: "To agree with someone.",
    example: "We don't always see eye to eye on politics."
  },
  {
    idiom: "Beat the clock",
    hindi: "समय से पहले काम करना (Samay se Pehle Kaam Karna)",
    meaning: "To finish something before the deadline.",
    example: "We worked hard to beat the clock on this project."
  },
  {
    idiom: "Pull someone's leg",
    hindi: "मजाक बनाना (Mazaak Banana)",
    meaning: "To tease someone or tell them something untrue as a joke.",
    example: "Don't worry, he was just pulling your leg."
  }
];

// ============================================
// RENDER IDIOMS
// ============================================
function renderIdioms() {
  const container = document.getElementById('idiomsContainer');
  if (!container) return;

  container.innerHTML = '';

  idiomsData.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'idiom-card';

    card.innerHTML = `
      <div class="idiom-header">
        <h3>${item.idiom}</h3>
        <button class="audio-btn" onclick="speakIdiom('${item.idiom}')" title="Sunne ke liye click karein">🔊</button>
      </div>
      <p class="idiom-hindi">${item.hindi}</p>
      <p class="idiom-meaning"><strong>Meaning:</strong> ${item.meaning}</p>
      <div class="idiom-example">
        <strong>Example:</strong> "${item.example}"
      </div>
    `;

    container.appendChild(card);
  });
}

// ============================================
// AUDIO (TEXT-TO-SPEECH)
// ============================================
function speakIdiom(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel(); // Purani aawaz band karo
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }
}

// ============================================
// START
// ============================================
document.addEventListener('DOMContentLoaded', renderIdioms);