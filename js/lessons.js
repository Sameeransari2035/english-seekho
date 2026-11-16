// js/lessons.js
let currentTestQuestions = [];
let currentQuestionIndex = 0;
let testScore = 0;
let answered = false;
let currentLessonNum = null;

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  currentLessonNum = params.get('lesson') || 1;
  
  if (typeof lessonsData === 'undefined') {
    document.getElementById('lessonTitle').textContent = "Error: Data not loaded 😕";
    return;
  }

  const lesson = lessonsData[currentLessonNum];

  if (lesson) {
    document.title = lesson.title + " - English Seekho";
    document.getElementById('lessonTitle').textContent = lesson.title;
    document.getElementById('lessonContent').innerHTML = lesson.content;
    
    const breadcrumbEl = document.getElementById('lessonTitleBreadcrumb');
    if (breadcrumbEl) breadcrumbEl.textContent = lesson.title; 

    document.getElementById('startTestBtn').onclick = () => {
      startLessonTest(lesson.test);
    };
  } else {
    document.getElementById('lessonTitle').textContent = "Lesson nahi mila 😕";
    document.getElementById('lessonContent').innerHTML = '<p>Ye lesson available nahi hai. <a href="grammar.html">Saare lessons dekho</a>.</p>';
    document.getElementById('startTestBtn').style.display = 'none';
  }
});

function startLessonTest(questions) {
  document.getElementById('readingScreen').style.display = 'none';
  document.getElementById('testScreen').style.display = 'block';

  currentTestQuestions = [...questions].sort(() => 0.5 - Math.random());
  currentQuestionIndex = 0;
  testScore = 0;
  
  document.getElementById('totalQ').textContent = currentTestQuestions.length;
  document.getElementById('scoreDisplay').textContent = testScore;

  loadQuestion();
}

function loadQuestion() {
  answered = false;
  document.getElementById('feedback').textContent = '';
  document.getElementById('feedback').className = 'feedback';
  document.getElementById('nextBtn').style.display = 'none';

  const q = currentTestQuestions[currentQuestionIndex];
  document.getElementById('currentQ').textContent = currentQuestionIndex + 1;
  document.getElementById('questionText').textContent = q.question;

  const progressPercent = (currentQuestionIndex / currentTestQuestions.length) * 100;
  document.getElementById('progressFill').style.width = progressPercent + '%';

  const optionsContainer = document.getElementById('optionsContainer');
  optionsContainer.innerHTML = '';

  q.options.forEach((option, index) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = option;
    btn.onclick = () => selectAnswer(index, btn);
    optionsContainer.appendChild(btn);
  });
}

function selectAnswer(selectedIndex, btnElement) {
  if (answered) return;
  answered = true;

  const q = currentTestQuestions[currentQuestionIndex];
  const allOptions = document.getElementById('optionsContainer').querySelectorAll('.option-btn');
  allOptions[q.correct].classList.add('correct');

  if (selectedIndex === q.correct) {
    testScore += 2;
    document.getElementById('scoreDisplay').textContent = testScore;
    document.getElementById('feedback').textContent = '✅ Sahi jawab! +2 points';
    document.getElementById('feedback').className = 'feedback feedback-correct';
  } else {
    btnElement.classList.add('wrong');
    document.getElementById('feedback').textContent = '❌ Galat! ' + q.explanation;
    document.getElementById('feedback').className = 'feedback feedback-wrong';
  }

  allOptions.forEach(opt => opt.disabled = true);
  document.getElementById('nextBtn').style.display = 'inline-block';

  if (currentQuestionIndex === currentTestQuestions.length - 1) {
    document.getElementById('nextBtn').textContent = 'Test Submit Karein →';
  } else {
    document.getElementById('nextBtn').textContent = 'Next Question →';
  }
}

document.getElementById('nextBtn').onclick = () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < currentTestQuestions.length) {
    loadQuestion();
  } else {
    showTestResults();
  }
};

function showTestResults() {
  document.getElementById('testScreen').style.display = 'none';
  document.querySelector('#testScreen .quiz-progress').style.display = 'none';
  
  const resultScreen = document.getElementById('testResultScreen');
  resultScreen.style.display = 'block';

  const maxScore = currentTestQuestions.length * 2;
  document.getElementById('finalScore').textContent = testScore;
  document.getElementById('maxScore').textContent = maxScore;

  const percentage = (testScore / maxScore) * 100;
  let message = '';

  if (percentage >= 80) {
    message = '🌟 Shandar! Tumne ye topic acche se samajh liya hai!';
    localStorage.setItem(`lesson_${currentLessonNum}_read`, 'true');
    saveLessonPoints(testScore);
    if (typeof confetti === 'function') {
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    }
  } else if (percentage >= 50) {
    message = '👍 Achha kiya! Thodi si aur practice chahiye.';
    localStorage.setItem(`lesson_${currentLessonNum}_read`, 'true');
    saveLessonPoints(Math.floor(testScore / 2));
  } else {
    message = '💪 Koi baat nahi! Topic dobara padhkar phir se try karein.';
  }

  document.getElementById('resultMessage').textContent = message;
}

function saveLessonPoints(earnedPoints) {
  let totalPoints = parseInt(localStorage.getItem('points') || 0) + earnedPoints;
  localStorage.setItem('points', totalPoints);

  const currentUser = localStorage.getItem('currentUser');
  if (currentUser && window.firebaseDB) {
    const safeEmail = currentUser.replace(/[.#$\[\]]/g, '_');
    const userRef = window.firebaseRef(window.firebaseDB, 'users/' + safeEmail);
    window.firebaseGet(userRef).then((snapshot) => {
      let fbPoints = 0;
      let fbWeeklyPoints = 0;
      if (snapshot.exists()) {
        fbPoints = snapshot.val().points || 0;
        fbWeeklyPoints = snapshot.val().weeklyPoints || 0;
      }
      window.firebaseSet(userRef, {
        points: fbPoints + earnedPoints,
        weeklyPoints: fbWeeklyPoints + earnedPoints,
        email: currentUser,
        lastUpdated: Date.now()
      });
    });
  }
}