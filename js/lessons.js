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
  },

5: {
    title: "Present Tense (Vartaman Kaal)",
    content: `
      <h2>Present Tense kya hota hai? 🤔</h2>
      <p>Jab koi kaam <strong>aaj (vartaman samay)</strong> mein ho raha ho, ya rozana hota ho, toh hum Present Tense ka use karte hain.</p>

      <div class="example-box">
        <p><strong>Hindi:</strong> Main school jaata hoon.</p>
        <p><strong>English:</strong> I go to school.</p>
      </div>

      <h2>Present Tense ke Types</h2>
      <h3>1. Simple Present</h3>
      <p>Rozana ki aadat ya sachchai batane ke liye.</p>
      <ul>
        <li>She <strong>reads</strong> a book daily.</li>
        <li>The sun <strong>rises</strong> in the east.</li>
      </ul>

      <h3>2. Present Continuous</h3>
      <p>Jo kaam abhi is waqt ho raha hai (verb + ing).</p>
      <ul>
        <li>I am <strong>eating</strong> food.</li>
        <li>They are <strong>playing</strong> cricket.</li>
      </ul>

      <div class="tip-box">
        💡 <strong>Tip:</strong> Simple present mein He/She/It ke saath verb mein 's' ya 'es' lagta hai. (jaise: go -> goes).
      </div>
    `
  },
  6: {
    title: "Past Tense (Bhoot Kaal)",
    content: `
      <h2>Past Tense kya hota hai? 🤔</h2>
      <p>Jo kaam <strong>kal ya pehle (beete hue samay)</strong> mein ho chuka hai, uske liye Past Tense use hota hai.</p>

      <div class="example-box">
        <p><strong>Hindi:</strong> Main kal school gaya tha.</p>
        <p><strong>English:</strong> I went to school yesterday.</p>
      </div>

      <h2>Past Tense ke Types</h2>
      <h3>1. Simple Past</h3>
      <p>Jo kaam pehle poora ho chuka hai. (Verb ki 2nd form)</p>
      <ul>
        <li>She <strong>watched</strong> a movie.</li>
        <li>I <strong>ate</strong> an apple.</li>
      </ul>

      <h3>2. Past Continuous</h3>
      <p>Jo kaam pehle kisi samay par chal raha tha. (was/were + verb+ing)</p>
      <ul>
        <li>I was <strong>reading</strong> a book.</li>
        <li>They were <strong>playing</strong> football.</li>
      </ul>

      <div class="tip-box">
        💡 <strong>Tip:</strong> Regular verbs mein -ed lagta hai (play -> played), lekin Irregular verbs badal jaate hain (go -> went, eat -> ate).
      </div>
    `
  },
  7: {
    title: "Future Tense (Bhavishya Kaal)",
    content: `
      <h2>Future Tense kya hota hai? 🤔</h2>
      <p>Jo kaam <strong>aage (aane wale samay)</strong> mein hone wala hai, uske liye Future Tense use hota hai.</p>

      <div class="example-box">
        <p><strong>Hindi:</strong> Main kal school jaunga.</p>
        <p><strong>English:</strong> I will go to school tomorrow.</p>
      </div>

      <h3>1. Simple Future</h3>
      <p>Jo kaam aage hone wala hai. (Will + Verb 1st form)</p>
      <ul>
        <li>I <strong>will help</strong> you.</li>
        <li>She <strong>will come</strong> tomorrow.</li>
      </ul>

      <h3>2. Future Continuous</h3>
      <p>Jo kaam aage kisi samay par chal raha hoga. (Will be + verb+ing)</p>
      <ul>
        <li>I <strong>will be studying</strong> at 8 PM.</li>
      </ul>

      <div class="tip-box">
        💡 <strong>Tip:</strong> Future mein 'Will' ka use karte hain (I, You, He, She sabke saath).
      </div>
    `
  },
  8: {
    title: "Prepositions (Sambandh Bodhak)",
    content: `
      <h2>Preposition kya hota hai? 🤔</h2>
      <p>Preposition wo shabd hain jo kisi noun ya pronoun ke pehle aakar unka <strong>sambandh</strong> batate hain — jagah, samay, ya disha ke baare mein.</p>

      <div class="example-box">
        <p><strong>Common Prepositions:</strong> in, on, at, under, over, behind, between, with</p>
      </div>

      <h3>1. Place (Jagah) ke liye</h3>
      <ul>
        <li>The book is <strong>on</strong> the table.</li>
        <li>He is <strong>in</strong> the room.</li>
        <li>Cat is <strong>under</strong> the chair.</li>
      </ul>

      <h3>2. Time (Samay) ke liye</h3>
      <ul>
        <li>I will meet you <strong>at</strong> 5 PM.</li>
        <li>We will meet <strong>on</strong> Monday.</li>
        <li>He was born <strong>in</strong> 2000.</li>
      </ul>

      <div class="tip-box">
        💡 <strong>Tip:</strong> 'At' chhote samay ke liye (at 5 PM), 'On' din ke liye (on Sunday), aur 'In' bade samay ke liye (in 2024).
      </div>
    `
  },
  9: {
    title: "Adjectives (Visheshan)",
    content: `
      <h2>Adjective kya hota hai? 🤔</h2>
      <p>Adjective wo shabd hai jo kisi noun (vyakti, jagah, cheez) ki <strong>visheshta (quality)</strong> batata hai.</p>

      <div class="example-box">
        <p><strong>Example:</strong> A <strong>beautiful</strong> garden.</p>
      </div>

      <h3>1. Quality batane wale</h3>
      <ul>
        <li>He is a <strong>tall</strong> boy.</li>
        <li>She is <strong>beautiful</strong>.</li>
      </ul>

      <h3>2. Quantity batane wale</h3>
      <ul>
        <li>There are <strong>many</strong> books.</li>
        <li>I have <strong>little</strong> money.</li>
      </ul>

      <h3>3. Comparison (Tulna)</h3>
      <ul>
        <li>He is <strong>taller</strong> than me.</li>
        <li>She is the <strong>tallest</strong> girl.</li>
      </ul>

      <div class="tip-box">
        💡 <strong>Tip:</strong> Adjective noun ke pehle aata hai (Red car) ya linking verb ke baad (The car is red).
      </div>
    `
  },
  10: {
    title: "Adverbs (Kriya Visheshan)",
    content: `
      <h2>Adverb kya hota hai? 🤔</h2>
      <p>Adverb wo shabd hai jo kisi <strong>verb (kaam)</strong> ki visheshta batata hai — kaam kaise, kab, kahan, ya kitni baar hua.</p>

      <div class="example-box">
        <p><strong>Example:</strong> She runs <strong>fast</strong>.</p>
      </div>

      <h3>1. Manner (Kaise)</h3>
      <ul>
        <li>He speaks <strong>softly</strong>.</li>
        <li>She sings <strong>beautifully</strong>.</li>
      </ul>

      <h3>2. Time (Kab)</h3>
      <ul>
        <li>I will go <strong>tomorrow</strong>.</li>
        <li>He came <strong>yesterday</strong>.</li>
      </ul>

      <h3>3. Frequency (Kitni baar)</h3>
      <ul>
        <li>I <strong>always</strong> drink tea.</li>
        <li>She <strong>never</strong> lies.</li>
      </ul>

      <div class="tip-box">
        💡 <strong>Tip:</strong> Aksar adverbs ke end mein "-ly" lagta hai (quick -> quickly), lekin kuch aise bhi hote hain (fast, well, hard).
      </div>
    `
  }  ,
  11: {
    title: "Conjunctions (Sanyojak)",
    content: `
      <h2>Conjunction kya hota hai? 🤔</h2>
      <p>Conjunction wo shabd hai jo do shabdon, phrases, ya sentences ko <strong>jodta</strong> hai.</p>

      <div class="example-box">
        <p><strong>Common Conjunctions:</strong> and, but, or, so, because, although</p>
      </div>

      <h3>1. And (Aur)</h3>
      <p>Do cheezon ko jodne ke liye.</p>
      <ul>
        <li>I like tea <strong>and</strong> coffee.</li>
        <li>She is smart <strong>and</strong> beautiful.</li>
      </ul>

      <h3>2. But (Lekin)</h3>
      <p>Ulta ya virudh baat batane ke liye.</p>
      <ul>
        <li>He is rich <strong>but</strong> not happy.</li>
        <li>I called him <strong>but</strong> he didn't answer.</li>
      </ul>

      <h3>3. Because (Kyunki)</h3>
      <p>Kaaran batane ke liye.</p>
      <ul>
        <li>I am tired <strong>because</strong> I worked all day.</li>
      </ul>

      <div class="tip-box">
        💡 <strong>Tip:</strong> Conjunction ka use karke aap chhote sentences ko jod kar ek lamba sentence bana sakte hain.
      </div>
    `
  },
  12: {
    title: "Interjections (Vismayadibodhak)",
    content: `
      <h2>Interjection kya hota hai? 🤔</h2>
      <p>Interjection wo shabd hai jo <strong>achanak bhaav</strong> (khushi, dukh, hairani, etc.) ko vyakt karta hai.</p>

      <div class="example-box">
        <p><strong>Common Interjections:</strong> Wow!, Oh!, Alas!, Hurray!, Ouch!</p>
      </div>

      <h3>Examples:</h3>
      <ul>
        <li><strong>Wow!</strong> What a beautiful view!</li>
        <li><strong>Alas!</strong> He lost the match.</li>
        <li><strong>Hurray!</strong> We won the game!</li>
        <li><strong>Ouch!</strong> That hurt!</li>
      </ul>

      <div class="tip-box">
        💡 <strong>Tip:</strong> Interjections aksar exclamation mark (!) ke saath likhe jaate hain.
      </div>
    `
  },
  13: {
    title: "Active & Passive Voice",
    content: `
      <h2>Active & Passive Voice kya hai? 🤔</h2>
      <p>Jab subject khud kaam karta hai toh <strong>Active Voice</strong>, aur jab subject par kaam hota hai toh <strong>Passive Voice</strong> use hota hai.</p>

      <div class="example-box">
        <p><strong>Active:</strong> Ram eats an apple.</p>
        <p><strong>Passive:</strong> An apple is eaten by Ram.</p>
      </div>

      <h3>Passive Voice ka Structure:</h3>
      <p><strong>Object + helping verb + past participle + by + subject</strong></p>
      <ul>
        <li>The book <strong>was written by</strong> him.</li>
        <li>The cake <strong>was made by</strong> mom.</li>
      </ul>

      <div class="tip-box">
        💡 <strong>Tip:</strong> Active voice zyada seedha aur clear hota hai. Passive voice tab use karein jab aapko doosre person par zor dena ho.
      </div>
    `
  },
  14: {
    title: "Direct & Indirect Speech",
    content: `
      <h2>Direct & Indirect Speech kya hai? 🤔</h2>
      <p>Kisi ki baat ko <strong>usi tarah</strong> batana (Direct) ya <strong>apne shabdon mein</strong> batana (Indirect).</p>

      <div class="example-box">
        <p><strong>Direct:</strong> He said, "I am happy."</p>
        <p><strong>Indirect:</strong> He said that he was happy.</p>
      </div>

      <h3>Rules:</h3>
      <ul>
        <li>Quotes (" ") hata do.</li>
        <li>Pronouns change karo (I → he/she).</li>
        <li>Tense change karo (am → was).</li>
      </ul>

      <div class="tip-box">
        💡 <strong>Tip:</strong> Direct speech mein inverted commas (" ") use hote hain, indirect mein nahi.
      </div>
    `
  },
  15: {
    title: "Punctuation (Viraam Chinh)",
    content: `
      <h2>Punctuation kya hota hai? 🤔</h2>
      <p>Punctuation wo chinh hain jo sentence ko <strong>sahi tarike se likhne</strong> mein madad karte hain.</p>

      <div class="example-box">
        <p><strong>Common Punctuation:</strong> . , ? ! : ; ' " </p>
      </div>

      <h3>1. Period (.)</h3>
      <p>Statement ke end mein.</p>
      <ul>
        <li>I am a student<strong>.</strong></li>
      </ul>

      <h3>2. Comma (,)</h3>
      <p>List ya pause ke liye.</p>
      <ul>
        <li>I bought apples<strong>,</strong> bananas<strong>,</strong> and oranges.</li>
      </ul>

      <h3>3. Question Mark (?)</h3>
      <p>Sawaal ke end mein.</p>
      <ul>
        <li>How are you<strong>?</strong></li>
      </ul>

      <h3>4. Exclamation (!)</h3>
      <p>Achanak bhaav ke liye.</p>
      <ul>
        <li>Wow<strong>!</strong> That's amazing!</li>
      </ul>

      <div class="tip-box">
        💡 <strong>Tip:</strong> Sahi punctuation ke bina sentence ka matlab badal sakta hai. Jaise: "Let's eat, grandma!" vs "Let's eat grandma!"
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