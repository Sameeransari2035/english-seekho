// js/lessons.js

// js/lessons.js

// ============================================
// LOAD LESSON LOGIC
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const lessonNum = parseInt(params.get('lesson')) || 1;
  
  // Data check karo
  if (typeof lessonsData === 'undefined') {
    document.getElementById('lessonTitle').textContent = "Error: Data not loaded 😕";
    return;
  }

  const lesson = lessonsData[lessonNum];

  if (lesson) {
    document.title = lesson.title + " - English Seekho";
    document.getElementById('lessonTitle').textContent = lesson.title;
    document.getElementById('lessonContent').innerHTML = lesson.content;
    
    const breadcrumbEl = document.getElementById('lessonTitleBreadcrumb');
    if (breadcrumbEl) breadcrumbEl.textContent = lesson.title; 
    
    // Mark as read in LocalStorage
    localStorage.setItem(`lesson_${lessonNum}_read`, 'true');

    // 👇 NAYA: Next aur Previous Buttons setup karo
    setupLessonNavigation(lessonNum);

  } else {
    document.getElementById('lessonTitle').textContent = "Lesson nahi mila 😕";
    document.getElementById('lessonContent').innerHTML = '<p>Ye lesson available nahi hai. <a href="grammar.html">Saare lessons dekho</a>.</p>';
  }
});

function setupLessonNavigation(currentLessonNum) {
  const prevBtn = document.getElementById('prevLessonBtn');
  const nextBtn = document.getElementById('nextLessonBtn');

  // 1. Pichhla Lesson Button
  if (currentLessonNum > 1) {
    prevBtn.style.display = 'inline-block';
    prevBtn.onclick = () => {
      window.location.href = `lesson.html?lesson=${currentLessonNum - 1}`;
    };
  } else {
    prevBtn.style.display = 'none'; 
  }

  // 2. Aagla Lesson Button
  const nextLessonNum = currentLessonNum + 1;

  if (lessonsData[nextLessonNum]) {
    // Agar agla lesson exist karta hai, toh check karo ki wo level unlocked hai ya nahi
    let isNextLevelUnlocked = true;
    
    // Level change ho raha hai kya? (25, 50, 75 par change hota hai)
    if (nextLessonNum === 26 || nextLessonNum === 51 || nextLessonNum === 76) {
      const previousLevel = Math.floor((currentLessonNum - 1) / 25) + 1; // Current level number
      isNextLevelUnlocked = localStorage.getItem(`level_${previousLevel}_passed`) === 'true';
    }

    nextBtn.style.display = 'inline-block';

    if (isNextLevelUnlocked) {
      nextBtn.innerHTML = 'Aagla Lesson →';
      nextBtn.classList.remove('btn-secondary');
      nextBtn.classList.add('btn-primary');
      nextBtn.onclick = () => {
        window.location.href = `lesson.html?lesson=${nextLessonNum}`;
      };
    } else {
      // Agar agla level locked hai, toh button ko dikhao par click rok do
      nextBtn.innerHTML = '🔒 Boss Ko Harayein →';
      nextBtn.classList.remove('btn-primary');
      nextBtn.classList.add('btn-secondary');
      nextBtn.onclick = () => {
        if (typeof showToast === 'function') {
          showToast("🔒 Agle level par jaane ke liye pehle Boss ko harana hoga!", "warning");
        } else {
          alert("🔒 Agle level par jaane ke liye pehle Boss ko harana hoga!");
        }
      };
    }
  } else {
    nextBtn.style.display = 'inline-block';
    nextBtn.innerHTML = '🏆 Sab Lessons Complete!';
    nextBtn.classList.remove('btn-primary');
    nextBtn.classList.add('btn-whatsapp'); 
    nextBtn.onclick = () => {
      window.location.href = 'grammar.html';
    };
  }
}