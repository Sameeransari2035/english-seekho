// ============================================
// DAILY CONVERSATIONS DATA
// ============================================
const conversations = [
  {
    title: "At the Shop (Dukaan Par)",
    icon: "🛍️",
    dialogue: [
      { speaker: "Shopkeeper", text: "Hello! How can I help you?", hindi: "Namaste! Main aapki kya madad kar sakta hoon?" },
      { speaker: "Customer", text: "I want to buy a shirt.", hindi: "Mujhe ek shirt kharidni hai." },
      { speaker: "Shopkeeper", text: "What is your size?", hindi: "Aapka size kya hai?" },
      { speaker: "Customer", text: "Medium. How much is this blue one?", hindi: "Medium. Ye neeli wali kitne ki hai?" },
      { speaker: "Shopkeeper", text: "It is 500 rupees.", hindi: "Ye 500 rupaye ki hai." },
      { speaker: "Customer", text: "Okay, I will take it. Here is the money.", hindi: "Theek hai, main ise le lunga. Ye paise hain." }
    ]
  },
  {
    title: "At the Restaurant (Restaurant Mein)",
    icon: "🍽️",
    dialogue: [
      { speaker: "Waiter", text: "Welcome! Are you ready to order?", hindi: "Swagat hai! Kya aap order dene ke liye taiyar hain?" },
      { speaker: "Customer", text: "Yes, can I see the menu please?", hindi: "Haan, kya main menu dekh sakta hoon?" },
      { speaker: "Waiter", text: "Here you go. What would you like to eat?", hindi: "Ye lijiye. Aap kya khana pasand karenge?" },
      { speaker: "Customer", text: "I would like a veg burger and a coke.", hindi: "Mujhe ek veg burger aur ek coke chahiye." },
      { speaker: "Waiter", text: "Sure. It will take 10 minutes.", hindi: "Zaroor. Isme 10 minute lagenge." }
    ]
  },
  {
    title: "Job Interview (Interview Mein)",
    icon: "💼",
    dialogue: [
      { speaker: "Interviewer", text: "Tell me about yourself.", hindi: "Apne baare mein bataiye." },
      { speaker: "Candidate", text: "I am a graduate and I love learning new things.", hindi: "Main ek graduate hoon aur mujhe nayi cheezein seekhna pasand hai." },
      { speaker: "Interviewer", text: "Why do you want this job?", hindi: "Aap ye naukri kyun chahte hain?" },
      { speaker: "Candidate", text: "Because I want to grow my skills with your company.", hindi: "Kyunki main aapki company ke saath apne skills badhana chahta hoon." },
      { speaker: "Interviewer", text: "Great! We will call you soon.", hindi: "Bahut accha! Hum aapko jaldi call karenge." }
    ]
  },
  {
    title: "At the Doctor (Doctor Ke Paas)",
    icon: "🏥",
    dialogue: [
      { speaker: "Doctor", text: "What is the problem?", hindi: "Kya problem hai?" },
      { speaker: "Patient", text: "I have a headache and fever.", hindi: "Mujhe sirdard aur bukhar hai." },
      { speaker: "Doctor", text: "Since when?", hindi: "Kab se?" },
      { speaker: "Patient", text: "Since yesterday morning.", hindi: "Kal subah se." },
      { speaker: "Doctor", text: "Take this medicine twice a day.", hindi: "Ye dawai din mein do baar lijiye." }
    ]
  }
];

// ============================================
// RENDER CONVERSATIONS
// ============================================
function renderConversations() {
  const container = document.getElementById('conversationContainer');
  if (!container) return;

  container.innerHTML = '';

  conversations.forEach((conv, index) => {
    const card = document.createElement('div');
    card.className = 'conversation-card';

    let dialogueHTML = '';
    conv.dialogue.forEach((line) => {
      dialogueHTML += `
        <div class="dialogue-line">
          <strong>${line.speaker}:</strong> 
          <span class="eng-text">${line.text}</span>
          <p class="hindi-text">${line.hindi}</p>
        </div>
      `;
    });

    card.innerHTML = `
      <div class="conv-header">
        <h2>${conv.icon} ${conv.title}</h2>
        <button class="btn btn-primary btn-listen" onclick="playConversationAudio(${index})">
          🔊 Sunne Ke Liye Click Karein
        </button>
      </div>
      <div class="dialogue-box">
        ${dialogueHTML}
      </div>
    `;

    container.appendChild(card);
  });
}

// ============================================
// AUDIO (TEXT-TO-SPEECH)
// ============================================
function playConversationAudio(index) {
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel(); // Agar pehle se chal raha hai toh roko
  }

  const conv = conversations[index];
  let textToRead = '';

  // Saare dialogues ko ek saath jodo
  conv.dialogue.forEach(line => {
    textToRead += `${line.speaker} says, ${line.text}. `;
  });

  const utterance = new SpeechSynthesisUtterance(textToRead);
  utterance.lang = 'en-US'; // English accent
  utterance.rate = 0.9; // Thoda slow taaki samajh aaye
  
  window.speechSynthesis.speak(utterance);
}

// ============================================
// START
// ============================================
document.addEventListener('DOMContentLoaded', renderConversations);