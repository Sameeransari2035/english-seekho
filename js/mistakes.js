// ============================================
// COMMON MISTAKES DATA
// ============================================
const commonMistakes = [
  {
    wrong: "I am go to school.",
    correct: "I go to school.",
    reason: "Present simple tense mein 'am/is/are' ka use nahi hota. Sirf verb (go) aata hai."
  },
  {
    wrong: "He don't know.",
    correct: "He doesn't know.",
    reason: "He, She, It ke saath 'doesn't' (does not) use hota hai, 'don't' nahi."
  },
  {
    wrong: "I have 20 years old.",
    correct: "I am 20 years old.",
    reason: "Umar batane ke liye 'have' nahi, 'am/is/are' use hota hai."
  },
  {
    wrong: "I am agree with you.",
    correct: "I agree with you.",
    reason: "'Agree' khud ek verb hai, iske pehle 'am' lagane ki zaroorat nahi."
  },
  {
    wrong: "She is my cousin sister.",
    correct: "She is my cousin.",
    reason: "English mein 'cousin brother' ya 'cousin sister' nahi bolte, sirf 'cousin' bolte hain."
  },
  {
    wrong: "Discuss about the matter.",
    correct: "Discuss the matter.",
    reason: "'Discuss' ke baad 'about' nahi lagta."
  },
  {
    wrong: "I am doing a party.",
    correct: "I am having a party.",
    reason: "Party 'do' nahi, 'have' ki jaati hai."
  },
  {
    wrong: "He is sleeping from 2 hours.",
    correct: "He has been sleeping for 2 hours.",
    reason: "Time period ke liye 'from' nahi, 'for' use hota hai, aur continuous action ke liye 'has been'."
  },
  {
    wrong: "My all friends are coming.",
    correct: "All my friends are coming.",
    reason: "English mein 'my all' nahi, 'all my' likha jaata hai."
  },
  {
    wrong: "I am living in Delhi since 2010.",
    correct: "I have been living in Delhi since 2010.",
    reason: "Jo kaam past mein shuru hua aur abhi bhi chal raha hai, uske liye 'have been + ing' use hota hai."
  },
  {
    wrong: "Please give me a paper.",
    correct: "Please give me a piece of paper.",
    reason: "Paper uncountable noun hai. Ek sheet ke liye 'a piece of paper' bolte hain."
  },
  {
    wrong: "Let's go to home.",
    correct: "Let's go home.",
    reason: "'Home' ke pehle 'to' nahi lagta jab wo destination ho."
  },
  {
    wrong: "I am not understanding.",
    correct: "I don't understand.",
    reason: "'Understand' ek stative verb hai. Isko continuous (ing) form mein use nahi karte."
  },
  {
    wrong: "Return back my pen.",
    correct: "Return my pen.",
    reason: "'Return' ka matlab hi 'wapas' hota hai. Iske saath 'back' lagana galat hai."
  },
  {
    wrong: "One of my friend.",
    correct: "One of my friends.",
    reason: "'One of' ke baad hamesha plural (friends) aata hai."
  }
];

// ============================================
// RENDER MISTAKES
// ============================================
function renderMistakes() {
  const container = document.getElementById('mistakesList');
  if (!container) return;

  container.innerHTML = '';

  commonMistakes.forEach(item => {
    const card = document.createElement('div');
    card.className = 'mistake-card';

    card.innerHTML = `
      <div class="mistake-row wrong-row">
        <span class="mistake-icon">❌</span>
        <div>
          <span class="mistake-label">Galat (Wrong)</span>
          <p class="mistake-text">${item.wrong}</p>
        </div>
      </div>
      
      <div class="mistake-row correct-row">
        <span class="mistake-icon">✅</span>
        <div>
          <span class="mistake-label">Sahi (Correct)</span>
          <p class="mistake-text">${item.correct}</p>
        </div>
      </div>

      <div class="mistake-reason">
        💡 <strong>Kyun?</strong> ${item.reason}
      </div>
    `;

    container.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', renderMistakes);