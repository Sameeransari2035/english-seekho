// js/lessons.js

// ============================================
// LOAD LESSON LOGIC
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const lessonNum = params.get('lesson') || 1;
  
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
  } else {
    document.getElementById('lessonTitle').textContent = "Lesson nahi mila 😕";
    document.getElementById('lessonContent').innerHTML = '<p>Ye lesson available nahi hai. <a href="grammar.html">Saare lessons dekho</a>.</p>';
  }
});