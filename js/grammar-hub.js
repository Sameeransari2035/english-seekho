// js/grammar-hub.js

const grammarCategories = [
  {
    title: "Parts of Speech",
    icon: "🧩",
    desc: "Noun, Pronoun, Verb, Adjective, Adverb",
    color: "#6366f1",
    links: [
      { title: "Nouns", id: 1 },
      { title: "Pronouns", id: 2 },
      { title: "Verbs", id: 3 },
      { title: "Adjectives", id: 9 },
      { title: "Adverbs", id: 10 }
    ]
  },
  {
    title: "Tenses (Kaal)",
    icon: "⏳",
    desc: "Present, Past, Future aur unke types",
    color: "#10b981",
    links: [
      { title: "Present Tense", id: 5 },
      { title: "Past Tense", id: 6 },
      { title: "Future Tense", id: 7 }
    ]
  },
  {
    title: "Articles & Prepositions",
    icon: "🔗",
    desc: "A, An, The, In, On, At ka use",
    color: "#f59e0b",
    links: [
      { title: "Articles (A, An, The)", id: 4 },
      { title: "Prepositions", id: 8 }
    ]
  },
  {
    title: "Sentence Structure",
    icon: "🏗️",
    desc: "Active-Passive, Direct-Indirect",
    color: "#ec4899",
    links: [
      { title: "Active & Passive Voice", id: 13 },
      { title: "Direct & Indirect Speech", id: 14 }
    ]
  }
];

function renderGrammarHub() {
  const container = document.getElementById('grammarCategoryGrid');
  if (!container) return;

  container.innerHTML = '';

  grammarCategories.forEach(cat => {
    const card = document.createElement('div');
    card.className = 'grammar-category-card';
    card.style.borderTopColor = cat.color;

    let linksHTML = '';
    cat.links.forEach(link => {
      linksHTML += `<a href="lesson.html?lesson=${link.id}" class="category-link">${link.title} →</a>`;
    });

    card.innerHTML = `
      <div class="category-icon" style="background: ${cat.color}20; color: ${cat.color};">${cat.icon}</div>
      <h3>${cat.title}</h3>
      <p>${cat.desc}</p>
      <div class="category-links-list">
        ${linksHTML}
      </div>
    `;

    container.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', renderGrammarHub);