// ============================================
// GRAMMAR LESSON LOCK SYSTEM (Level-wise + Points)
// ============================================

// Points required per lesson (index 0 = Lesson 1)
// Lessons 1-4 (Beginner) = FREE
// Lessons 5-8 (Intermediate) = 50 points each
// Lessons 9-12 (Advanced) = 100 points each
// Lessons 13-15 (Master) = 150 points each
const lessonCosts = [
  0, 0, 0, 0,         // Lessons 1-4 (Beginner) - FREE
  50, 50, 50, 50,     // Lessons 5-8 (Intermediate) - 50 pts
  100, 100, 100, 100, // Lessons 9-12 (Advanced) - 100 pts
  150, 150, 150       // Lessons 13-15 (Master) - 150 pts
];

document.addEventListener('DOMContentLoaded', () => {
  const lessonCards = document.querySelectorAll('.lesson-card');
  const currentPoints = parseInt(localStorage.getItem('points') || 0);

  lessonCards.forEach((card, index) => {
    const lessonCost = lessonCosts[index];
    const lessonNum = index + 1;

    // Pehle se unlocked hai kya?
    const isAlreadyUnlocked = localStorage.getItem(`lesson_${lessonNum}_unlocked`) === 'true';

    // Beginner lessons ya pehle se unlocked lessons
    if (lessonCost === 0 || isAlreadyUnlocked) {
      // Unlocked - koi lock nahi
      card.classList.remove('locked');
      
      // Lesson cost tag hatao
      const costTag = card.querySelector('.lesson-cost');
      if (costTag) costTag.remove();

    } else {
      // Locked - points check karo
      if (currentPoints < lessonCost) {
        // Points kam hain - locked
        card.classList.add('locked');
        
        const pointsNeeded = lessonCost - currentPoints;
        
        card.onclick = (e) => {
          e.preventDefault();
          
          if (typeof showToast === 'function') {
            showToast(`🔒 ${pointsNeeded} points aur chahiye! Quiz khelo.`, "warning");
          } else {
            alert(`🔒 Ye lesson unlock karne ke liye ${pointsNeeded} points aur chahiye!\n\nQuiz khelo, Game khelo, ya Daily Challenge complete karo.`);
          }
        };
      } else {
        // Points kaafi hain - unlock karne ka option do
        card.classList.remove('locked');
        
        card.onclick = (e) => {
          e.preventDefault();
          
          // Confirm karo
          const confirmUnlock = confirm(`🔓 Ye lesson unlock karne ke liye ${lessonCost} points lagenge.\n\nTumhare paas ${currentPoints} points hain.\n\nKya tum unlock karna chahte ho?`);
          
          if (confirmUnlock) {
            // Points kaato
            const newPoints = currentPoints - lessonCost;
            localStorage.setItem('points', newPoints);
            
            // Mark as unlocked
            localStorage.setItem(`lesson_${lessonNum}_unlocked`, 'true');
            
            // Firebase mein bhi update karo
            const currentUser = localStorage.getItem('currentUser');
            if (currentUser && window.firebaseDB) {
              const safeEmail = currentUser.replace(/[.#$\[\]]/g, '_');
              const userRef = window.firebaseRef(window.firebaseDB, 'users/' + safeEmail);
              window.firebaseGet(userRef).then((snapshot) => {
                let fbPoints = 0;
                if (snapshot.exists()) fbPoints = snapshot.val().points || 0;
                window.firebaseSet(userRef, {
                  points: fbPoints - lessonCost,
                  email: currentUser,
                  lastUpdated: Date.now()
                });
              });
            }
            
            if (typeof showToast === 'function') {
              showToast(`🎉 Lesson unlocked! -${lessonCost} points`, "success");
            } else {
              alert(`🎉 Lesson unlocked! -${lessonCost} points`);
            }
            
            // Page refresh karo taaki naya state dikhe
            setTimeout(() => {
              window.location.href = `lesson.html?lesson=${lessonNum}`;
            }, 1000);
          }
        };
      }
    }
  });
});