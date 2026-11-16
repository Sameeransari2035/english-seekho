// data/lessons-data.js
const lessonsData = {
  1: {
    title: "Nouns (Sangya)",
    content: `
      <h2>Noun kya hota hai? 🤔</h2>
      <p>Noun wo shabd hai jo kisi <strong>vyakti, jagah, cheez ya bhaav</strong> ka naam batata hai. English grammar ki duniya mein, Noun sabse pehla aur sabse zaroori topic hai. Bina noun ke, hum kisi cheez ka naam nahi le sakte.</p>
      
      <h3>Noun ke Types</h3>
      <div class="example-box">
        <p><strong>1. Proper Noun:</strong> Khaas vyakti/jagah ka naam. (e.g., Ram, Delhi, Monday)</p>
        <p><strong>2. Common Noun:</strong> Samanya cheez ka naam. (e.g., boy, city, book)</p>
        <p><strong>3. Collective Noun:</strong> Group ka naam. (e.g., team, family, army)</p>
        <p><strong>4. Abstract Noun:</strong> Jise chhua nahi ja sakta — bhaav. (e.g., love, happiness)</p>
      </div>

      <h3>Noun ki Pehchaan Kaise Karein?</h3>
      <p>Agar kisi shabd ke pehle <em>a, an, the</em> laga sakte hain, toh wo pakka noun hai. Jaise: <strong>a</strong> book, <strong>the</strong> sun.</p>

      <div class="tip-box">
        💡 <strong>Tip:</strong> Proper Nouns hamesha Capital letter se shuru hote hain (jaise India, Monday).
      </div>
    `,
    test: [
      { question: "Noun kya hota hai?", options: ["Kisi kaam ka naam", "Kisi vyakti, jagah ya cheez ka naam", "Kisi ki visheshta", "Kisi ka bhaav"], correct: 1, explanation: "Noun wo shabd hai jo kisi vyakti, jagah, cheez ya bhaav ka naam batata hai." },
      { question: "Inme se 'Proper Noun' kaunsa hai?", options: ["boy", "city", "Delhi", "book"], correct: 2, explanation: "Delhi ek khaas jagah ka naam hai, isliye ye Proper Noun hai." },
      { question: "Inme se 'Common Noun' kaunsa hai?", options: ["Rahul", "Monday", "Table", "India"], correct: 2, explanation: "Table ek samanya cheez hai, isliye ye Common Noun hai." },
      { question: "Collective Noun ka example kaunsa hai?", options: ["Apple", "Army", "Run", "Beautiful"], correct: 1, explanation: "Army (sena) ek group ka naam hai, isliye ye Collective Noun hai." },
      { question: "'Happiness' kaunsa noun hai?", options: ["Proper", "Common", "Collective", "Abstract"], correct: 3, explanation: "Happiness ek bhaav hai, isliye ye Abstract Noun hai." },
      { question: "Sahi sentence chuno:", options: ["I live in delhi.", "I live in Delhi.", "i live in Delhi.", "i live in delhi."], correct: 1, explanation: "Proper Noun (Delhi) hamesha capital letter se shuru hota hai." },
      { question: "Abstract Noun ka matlab kya hai?", options: ["Group ka naam", "Bhaav ya feeling", "Jagah ka naam", "Cheez ka naam"], correct: 1, explanation: "Abstract Noun bhaav ya feeling ko darshata hai (jaise love, anger)." },
      { question: "Inme se kaunsa Proper Noun hai?", options: ["Book", "City", "Taj Mahal", "Boy"], correct: 2, explanation: "Taj Mahal ek khaas jagah ka naam hai." },
      { question: "Nouns ko kitne types mein baanta gaya hai?", options: ["2", "3", "4", "5"], correct: 2, explanation: "Mainly 4 types hote hain: Proper, Common, Collective, Abstract." },
      { question: "Inme se kaunsa Abstract Noun hai?", options: ["Car", "Love", "Dog", "House"], correct: 1, explanation: "Love (pyaar) ek bhaav hai, isliye ye Abstract Noun hai." },
      { question: "Collective Noun ka matlab kya hai?", options: ["Ek vyakti ka naam", "Group ka naam", "Bhaav", "Jagah ka naam"], correct: 1, explanation: "Collective noun ek group (jaise team) ka naam batata hai." },
      { question: "'India' kaunsa noun hai?", options: ["Proper", "Common", "Collective", "Abstract"], correct: 0, explanation: "India ek khaas desh ka naam hai, isliye Proper Noun hai." },
      { question: "Inme se Common Noun kaunsa hai?", options: ["Monday", "Sharma", "Dog", "London"], correct: 2, explanation: "Dog ek samanya janwar hai, isliye Common Noun hai." },
      { question: "Proper Noun ko kaise likhte hain?", options: ["Small letters mein", "Capital letters mein", "Sirf numbers mein", "Sirf symbols mein"], correct: 1, explanation: "Proper Nouns hamesha Capital letter se shuru hote hain." },
      { question: "Inme se kaunsa Noun nahi hai?", options: ["Book", "Love", "Run", "Delhi"], correct: 2, explanation: "Run ek verb (kaam) hai, noun nahi." }
    ]
  },
  
  2: {
    title: "Pronouns (Sarvanam)",
    content: `
      <h2>Pronoun kya hota hai? 🤔</h2>
      <p>Pronoun wo shabd hai jo <strong>noun ki jagah</strong> use hota hai. Agar humein baar-baar kisi ka naam lena ho, toh hum pronoun ka use karte hain taaki sentence accha lage.</p>
      <div class="example-box">
        <p><strong>Bina Pronoun:</strong> Ram is a boy. Ram is playing. (Yahan Ram repeat ho raha hai)</p>
        <p><strong>Pronoun ke saath:</strong> Ram is a boy. <strong>He</strong> is playing. (Yahan 'He' pronoun hai)</p>
      </div>
      <h3>Pronouns ke Types</h3>
      <ul>
        <li><strong>Subject Pronouns:</strong> I, You, He, She, It, We, They (Jo kaam karte hain)</li>
        <li><strong>Object Pronouns:</strong> Me, You, Him, Her, It, Us, Them (Jin par kaam hota hai)</li>
        <li><strong>Possessive Pronouns:</strong> Mine, Yours, His, Hers, Ours, Theirs (Kiski cheez hai)</li>
      </ul>
    `,
    test: [
      { question: "Pronoun kya hota hai?", options: ["Kaam ka naam", "Noun ki jagah use hone wala shabd", "Visheshta batane wala shabd", "Sawaal poochne wala shabd"], correct: 1, explanation: "Pronoun noun ki jagah use hota hai." },
      { question: "Sahi pronoun chuno: '___ is my sister.'", options: ["He", "She", "It", "They"], correct: 1, explanation: "Sister (ladki) ke liye 'She' pronoun use hota hai." },
      { question: "Inme se Subject Pronoun kaunsa hai?", options: ["Him", "Her", "They", "Them"], correct: 2, explanation: "'They' subject pronoun hai, baaki object pronouns hain." },
      { question: "Sahi pronoun chuno: 'I gave ___ a book.'", options: ["He", "Him", "His", "They"], correct: 1, explanation: "Yahan object pronoun 'Him' aayega kyunki book usko di gayi." },
      { question: "Possessive Pronoun kaunsa hai?", options: ["I", "Me", "Mine", "My"], correct: 2, explanation: "'Mine' possessive pronoun hai (mera)." },
      { question: "'We' kaunsa pronoun hai?", options: ["Subject", "Object", "Possessive", "Reflexive"], correct: 0, explanation: "'We' subject pronoun hai (hum)." },
      { question: "Sahi pronoun chuno: '___ are going to the park.'", options: ["He", "She", "We", "It"], correct: 2, explanation: "'Are' ke saath plural pronoun 'We' aayega." },
      { question: "Inme se Object Pronoun kaunsa hai?", options: ["I", "He", "She", "Them"], correct: 3, explanation: "'Them' object pronoun hai." },
      { question: "Possessive Pronoun ka matlab kya hai?", options: ["Kiski cheez hai", "Kaam karne wala", "Jiske saath kaam ho raha hai", "Sawaal poochne wala"], correct: 0, explanation: "Possessive pronoun batata hai ki cheez kiska hai (jaise mine = mera)." },
      { question: "Sahi pronoun chuno: 'This book is ___.'", options: ["I", "Me", "Mine", "My"], correct: 2, explanation: "Yahan 'Mine' aayega kyunki sentence ke end mein pronoun chahiye." },
      { question: "Inme se kaunsa 'It' pronoun ka use hai?", options: ["Boy ke liye", "Girl ke liye", "Cheez ya janwar ke liye", "Group ke liye"], correct: 2, explanation: "'It' cheez ya janwar ke liye use hota hai." },
      { question: "Sahi pronoun chuno: 'Ram and ___ are friends.'", options: ["I", "Me", "Mine", "My"], correct: 0, explanation: "Subject ki jagah 'I' aayega." },
      { question: "Object pronoun kaunsa hai?", options: ["I", "You", "He", "Him"], correct: 3, explanation: "'Him' object pronoun hai." },
      { question: "Pronoun ka use kyun karte hain?", options: ["Sentence lamba karne ke liye", "Noun ko repeat hone se bachane ke liye", "Verb dikhane ke liye", "Adjective dikhane ke liye"], correct: 1, explanation: "Pronoun noun ko baar-baar repeat hone se bachata hai." },
      { question: "Sahi pronoun chuno: '___ is a beautiful city.'", options: ["He", "She", "It", "They"], correct: 2, explanation: "City (cheez) ke liye 'It' pronoun use hota hai." }
    ]
  },
  
  3: {
    title: "Verbs (Kriya)",
    content: `
      <h2>Verb kya hota hai? 🤔</h2>
      <p>Verb wo shabd hai jo <strong>kaam ya sthiti</strong> batata hai. Bina verb ke koi bhi sentence nahi ban sakta. Verb sentence ki jaan hota hai.</p>
      <div class="example-box">
        <p><strong>Action Verbs (Kaam):</strong> run, eat, sleep, write, read</p>
        <p><strong>Helping Verbs (Sahayak):</strong> is, am, are, was, were, have, has, had, will, can</p>
      </div>
      <h3>Verb ki Forms</h3>
      <ul>
        <li><strong>V1 (Base):</strong> go, eat, play</li>
        <li><strong>V2 (Past):</strong> went, ate, played</li>
        <li><strong>V3 (Past Participle):</strong> gone, eaten, played</li>
        <li><strong>V4 (Continuous):</strong> going, eating, playing</li>
      </ul>
      <div class="tip-box">💡 Har sentence mein ek main verb hona chahiye. Jaise: I <strong>eat</strong> an apple.</div>
    `,
    test: [
      { question: "Verb kya hota hai?", options: ["Cheez ka naam", "Kaam ya sthiti batane wala shabd", "Visheshta batane wala shabd", "Jodne wala shabd"], correct: 1, explanation: "Verb kaam ya sthiti batata hai." },
      { question: "Inme se action verb kaunsa hai?", options: ["Beautiful", "Quickly", "Run", "Happiness"], correct: 2, explanation: "'Run' ek kaam hai, isliye ye action verb hai." },
      { question: "Sahi verb chuno: 'She ___ to school every day.'", options: ["go", "goes", "going", "gone"], correct: 1, explanation: "She ke saath 'goes' aayega (present tense)." },
      { question: "Inme se helping verb kaunsa hai?", options: ["eat", "run", "is", "play"], correct: 2, explanation: "'Is' ek helping verb hai." },
      { question: "'Went' kis verb ki form hai?", options: ["V1 (Base)", "V2 (Past)", "V3 (Past Participle)", "V4 (Continuous)"], correct: 1, explanation: "'Went' go ka V2 (past) form hai." },
      { question: "Sahi verb chuno: 'I ___ an apple yesterday.'", options: ["eat", "ate", "eaten", "eating"], correct: 1, explanation: "Yesterday (past) ke liye 'ate' (V2) aayega." },
      { question: "Inme se V3 (Past Participle) kaunsa hai?", options: ["go", "went", "gone", "going"], correct: 2, explanation: "'Gone' go ka V3 form hai." },
      { question: "Sahi verb chuno: 'He ___ football now.'", options: ["play", "plays", "playing", "is playing"], correct: 3, explanation: "Abhi khel raha hai, isliye present continuous 'is playing' aayega." },
      { question: "Kaunsa sentence sahi hai?", options: ["I am go.", "I am going.", "I is going.", "I are going."], correct: 1, explanation: "I ke saath 'am' aur continuous 'going' aayega." },
      { question: "Inme se verb kaunsi hai?", options: ["Table", "Chair", "Sleep", "Book"], correct: 2, explanation: "'Sleep' ek action (kaam) hai." },
      { question: "Sahi verb chuno: 'They ___ playing cricket.'", options: ["is", "am", "are", "was"], correct: 2, explanation: "They (plural) ke saath 'are' aayega." },
      { question: "Kaunsa helping verb nahi hai?", options: ["is", "am", "run", "are"], correct: 2, explanation: "'Run' main verb hai, helping verb nahi." },
      { question: "Sahi verb chuno: 'She ___ a song.'", options: ["sing", "sings", "singing", "sang"], correct: 1, explanation: "She ke saath verb mein 's' lagta hai, isliye 'sings'." },
      { question: "Verb ke bina sentence ban sakta hai?", options: ["Haan", "Nahi", "Kabhi-kabhi", "Depends on noun"], correct: 1, explanation: "Verb ke bina koi bhi sentence nahi ban sakta." },
      { question: "'Going' kis form hai?", options: ["V1", "V2", "V3", "V4 (Continuous)"], correct: 3, explanation: "'Going' V4 (continuous) form hai." }
    ]
  },

  // Aap yahan 4 se 10 tak baaki lessons isi format mein add kar sakte hain
};