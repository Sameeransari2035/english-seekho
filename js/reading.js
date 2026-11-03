// ============================================
// READING PRACTICE LOGIC
// ============================================
const stories = [
  {
    title: "The Thirsty Crow",
    text: "One hot summer day, a crow was very thirsty. He flew here and there in search of water, but he could not find any. At last, he saw a pot with a little water at the bottom. The crow tried to drink the water, but his beak could not reach it. He thought of a plan. He picked up some pebbles and dropped them into the pot one by one. Slowly, the water level rose up. The clever crow drank the water and flew away happily.",
    questions: [
      { q: "Why was the crow flying here and there?", options: ["To find food", "To find water", "To find a friend", "To find a tree"], correct: 1 },
      { q: "How did the crow drink the water?", options: ["By breaking the pot", "By asking for help", "By dropping pebbles", "By waiting for rain"], correct: 2 }
    ]
  },
  {
    title: "The Honest Woodcutter",
    text: "Once upon a time, a poor woodcutter was cutting a tree near a river. Suddenly, his axe fell into the river. He started crying. A river god appeared and asked him why he was crying. The woodcutter told him about his axe. The god brought a golden axe, but the woodcutter said it was not his. The god then brought a silver axe, but he refused again. Finally, the god brought his iron axe. The honest woodcutter was happy. The god was pleased with his honesty and gave him all three axes as a reward.",
    questions: [
      { q: "Where did the woodcutter's axe fall?", options: ["In a well", "In a river", "In a forest", "In a hole"], correct: 1 },
      { q: "Why did the god give him all three axes?", options: ["Because he was poor", "Because he was honest", "Because he was strong", "Because he was crying"], correct: 1 }
    ]
  },
  {
    title: "The Lion and the Mouse",
    text: "A lion was sleeping in a forest. A little mouse started running up and down upon him. This woke the lion up. He caught the mouse and was about to kill him. The mouse begged for his life and promised to help him someday. The lion laughed at this idea but let the mouse go. A few days later, the lion was caught in a hunter's net. He roared loudly. The mouse heard him and came running. He gnawed the ropes with his sharp teeth and set the lion free. The lion thanked the little mouse.",
    questions: [
      { q: "What did the mouse promise the lion?", options: ["To bring him food", "To help him someday", "To leave the forest", "To wake him up daily"], correct: 1 },
      { q: "How did the mouse save the lion?", options: ["By calling other animals", "By biting the hunter", "By gnawing the ropes", "By roaring loudly"], correct: 2 }
    ]
  }
];

let currentStoryIndex = 0;
let selectedAnswers = {};

const storyTitle = document.getElementById('storyTitle');
const storyText = document.getElementById('storyText');
const questionsSection = document.getElementById('questionsSection');
const questionsContainer = document.getElementById('questionsContainer');
const resultSection = document.getElementById('resultSection');
const submitAnswersBtn = document.getElementById('submitAnswersBtn');

function loadNewStory() {
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * stories.length);
  } while (newIndex === currentStoryIndex && stories.length > 1);
  
  currentStoryIndex = newIndex;
  const story = stories[currentStoryIndex];
  selectedAnswers = {};

  storyTitle.textContent = story.title;
  storyText.innerHTML = `<p>${story.text}</p>`;
  
  questionsSection.style.display = 'block';
  resultSection.style.display = 'none';
  submitAnswersBtn.style.display = 'block';
  submitAnswersBtn.disabled = false;
  submitAnswersBtn.textContent = "Answers Check Karein";

  questionsContainer.innerHTML = '';
  story.questions.forEach((item, qIndex) => {
    const qDiv = document.createElement('div');
    qDiv.className = 'question-block';
    
    let optionsHTML = '';
    item.options.forEach((opt, oIndex) => {
      optionsHTML += `
        <label class="reading-option">
          <input type="radio" name="q${qIndex}" value="${oIndex}" onchange="selectOption(${qIndex}, ${oIndex})">
          <span>${opt}</span>
        </label>
      `;
    });

    qDiv.innerHTML = `
      <p style="font-weight: 600; margin-bottom: 0.8rem;">${qIndex + 1}. ${item.q}</p>
      <div class="reading-options">${optionsHTML}</div>
    `;
    questionsContainer.appendChild(qDiv);
  });
}

function selectOption(qIndex, oIndex) {
  selectedAnswers[qIndex] = oIndex;
}

submitAnswersBtn.onclick = () => {
  const story = stories[currentStoryIndex];
  
  if (Object.keys(selectedAnswers).length < story.questions.length) {
    alert("Kripya saare questions ke answers select karein!");
    return;
  }

  let correctCount = 0;
  story.questions.forEach((item, qIndex) => {
    if (selectedAnswers[qIndex] === item.correct) {
      correctCount++;
    }
  });

  const total = story.questions.length;
  const percentage = (correctCount / total) * 100;

  resultSection.style.display = 'block';
  submitAnswersBtn.style.display = 'none';
  questionsSection.style.display = 'none';

  const resultTitle = document.getElementById('resultTitle');
  const resultMsg = document.getElementById('resultMsg');

  if (percentage === 100) {
    resultTitle.textContent = "🌟 Perfect! Shandar Reading!";
    resultMsg.textContent = `Aapne saare ${total} answers sahi diye. +20 Points!`;
    
    let points = parseInt(localStorage.getItem('points') || 0) + 20;
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
          points: fbPoints + 20,
          email: currentUser,
          lastUpdated: Date.now()
        });
      });
    }
  } else {
    resultTitle.textContent = `👍 You scored ${correctCount}/${total}`;
    resultMsg.textContent = "Aapne kuch answers galat diye hain. Dobara padh kar try karein!";
  }
};

document.addEventListener('DOMContentLoaded', loadNewStory);