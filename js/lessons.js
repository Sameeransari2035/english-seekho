// ============================================
// LESSONS DATA
// ============================================
const lessonsData = {
  1: {
    title: "Nouns (Sangya)",
    content: `
      <h2>Noun kya hota hai? 🤔</h2>
      <p>Noun wo shabd hai jo kisi <strong>vyakti, jagah, cheez ya bhaav</strong> ka naam batata hai.</p>

      <div class="example-box">
        <p><strong>Hindi:</strong> Ram, Delhi, kitaab, khushi</p>
        <p><strong>English:</strong> Ram, Delhi, book, happiness</p>
      </div>

      <h2>Noun ke Types</h2>

      <h3>1. Proper Noun</h3>
      <p>Khaas vyakti/jagah ka naam. Capital letter se shuru.</p>
      <ul>
        <li>Ram, Sita, Delhi, India, Monday</li>
      </ul>

      <h3>2. Common Noun</h3>
      <p>Samanya cheez ka naam.</p>
      <ul>
        <li>boy, girl, city, book, dog</li>
      </ul>

      <h3>3. Collective Noun</h3>
      <p>Group ka naam.</p>
      <ul>
        <li>team, family, army, class</li>
      </ul>

      <h3>4. Abstract Noun</h3>
      <p>Jise chhua nahi ja sakta — bhaav.</p>
      <ul>
        <li>love, happiness, courage, beauty</li>
      </ul>

      <div class="tip-box">
        💡 <strong>Tip:</strong> Agar kisi shabd ke pehle <em>a, an, the</em> laga sakte ho, toh wo noun hai.
      </div>
    `
  },

  2: {
    title: "Pronouns (Sarvanam)",
    content: `
      <h2>Pronoun kya hota hai? 🤔</h2>
      <p>Pronoun wo shabd hai jo <strong>noun ki jagah</strong> use hota hai.</p>

      <div class="example-box">
        <p><strong>Bina pronoun:</strong> Ram is a boy. Ram is playing.</p>
        <p><strong>Pronoun ke saath:</strong> Ram is a boy. <strong>He</strong> is playing.</p>
      </div>

      <h2>Common Pronouns</h2>
      <table class="lesson-table">
        <tr><th>Person</th><th>Singular</th><th>Plural</th></tr>
        <tr><td>1st</td><td>I, me, my</td><td>we, us, our</td></tr>
        <tr><td>2nd</td><td>you, your</td><td>you, your</td></tr>
        <tr><td>3rd</td><td>he, she, it</td><td>they, them</td></tr>
      </table>

      <div class="tip-box">
        💡 <strong>Tip:</strong> "I" hamesha capital letter mein likha jaata hai.
      </div>
    `
  },

  3: {
    title: "Verbs (Kriya)",
    content: `
      <h2>Verb kya hota hai? 🤔</h2>
      <p>Verb wo shabd hai jo <strong>kaam ya sthiti</strong> batata hai.</p>

      <div class="example-box">
        <p>run, eat, sleep, write, read, is, am, are</p>
      </div>

      <h3>1. Action Verbs</h3>
      <ul>
        <li>She <strong>runs</strong> every day.</li>
        <li>He <strong>eats</strong> an apple.</li>
      </ul>

      <h3>2. Helping Verbs</h3>
      <ul>
        <li>is, am, are, was, were, have, has</li>
      </ul>

      <div class="tip-box">
        💡 <strong>Tip:</strong> Verb ke bina sentence nahi ban sakta!
      </div>
    `
  },

  4: {
    title: "Articles (A, An, The)",
    content: `
      <h2>Articles kya hote hain? 🤔</h2>
      <p>Chhote shabd jo noun ke pehle aate hain — <strong>a, an, the</strong>.</p>

      <h3>"A" ka use</h3>
      <p>Consonant sound se shuru hone wale shabd ke pehle.</p>
      <ul>
        <li><strong>a</strong> book, <strong>a</strong> car, <strong>a</strong> boy</li>
      </ul>

      <h3>"An" ka use</h3>
      <p>Vowel sound se shuru hone wale shabd ke pehle.</p>
      <ul>
        <li><strong>an</strong> apple, <strong>an</strong> egg, <strong>an</strong> hour</li>
      </ul>

      <h3>"The" ka use</h3>
      <p>Khaas noun ke pehle.</p>
      <ul>
        <li><strong>the</strong> sun, <strong>the</strong> moon</li>
      </ul>

      <div class="tip-box">
        💡 <strong>Tip:</strong> "An" sound par depend karta hai, spelling par nahi. <em>An hour</em> (h silent).
      </div>
    `
  }
};

// ============================================
// LOAD LESSON
// ============================================
const params = new URLSearchParams(window.location.search);
const lessonNum = params.get('lesson') || 1;
const lesson = lessonsData[lessonNum];

if (lesson) {
  document.title = lesson.title + " - English Seekho";
  document.getElementById('lessonNum').textContent = lessonNum;
  document.getElementById('lessonTitle').textContent = lesson.title;
  document.getElementById('lessonContent').innerHTML = lesson.content;
} else {
  document.getElementById('lessonTitle').textContent = "Lesson nahi mila 😕";
  document.getElementById('lessonContent').innerHTML =
    '<p>Ye lesson available nahi hai. <a href="grammar.html">Saare lessons dekho</a>.</p>';
}