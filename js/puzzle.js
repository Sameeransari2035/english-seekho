// ============================================
// WORD SEARCH PUZZLE LOGIC (FINAL)
// ============================================

const gridSize = 10;
const allWords = [
  "APPLE", "BOOK", "CAT", "DOG", "TREE", 
  "FISH", "BIRD", "STAR", "MOON", "SUN",
  "HOUSE", "WATER", "FIRE", "GOLD", "RING",
  "BLUE", "GREEN", "PINK", "MILK", "RICE",
  "LION", "TIGER", "BEAR", "WOLF", "DEER",
  "CLOCK", "PHONE", "TABLE", "CHAIR", "LIGHT"
];

let words = []; 
let grid = [];
let selectedCells = [];
let foundWords = [];
let isSelecting = false;

// --- Generate Grid ---
function generateGrid() {
  words = pickRandomWords(5); // Har baar naye 5 words
  grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));

  words.forEach(word => {
    let placed = false;
    let attempts = 0;
    
    while (!placed && attempts < 200) {
      attempts++;
      const direction = Math.random() > 0.5 ? 'H' : 'V';
      const row = Math.floor(Math.random() * gridSize);
      const col = Math.floor(Math.random() * gridSize);

      if (canPlaceWord(word, row, col, direction)) {
        placeWord(word, row, col, direction);
        placed = true;
      }
    }
  });

  // Khali jagahon ko random letters se bharo
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      if (grid[r][c] === '') {
        grid[r][c] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      }
    }
  }
}

function pickRandomWords(count) {
  const shuffled = [...allWords].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function canPlaceWord(word, row, col, direction) {
  if (direction === 'H' && col + word.length > gridSize) return false;
  if (direction === 'V' && row + word.length > gridSize) return false;

  for (let i = 0; i < word.length; i++) {
    const r = direction === 'H' ? row : row + i;
    const c = direction === 'H' ? col + i : col;
    
    if (grid[r][c] !== '' && grid[r][c] !== word[i]) {
      return false; 
    }
  }
  return true;
}

function placeWord(word, row, col, direction) {
  for (let i = 0; i < word.length; i++) {
    const r = direction === 'H' ? row : row + i;
    const c = direction === 'H' ? col + i : col;
    grid[r][c] = word[i];
  }
}

// --- Render UI ---
function renderPuzzle() {
  const gridContainer = document.getElementById('gridContainer');
  const wordsContainer = document.getElementById('wordsToFind');
  
  gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  gridContainer.innerHTML = '';
  wordsContainer.innerHTML = '';

  // Words list render
  words.forEach(word => {
    const span = document.createElement('span');
    span.className = 'word-item';
    span.id = `word-${word}`;
    span.textContent = word;
    wordsContainer.appendChild(span);
  });

  // Grid render
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      const cell = document.createElement('div');
      cell.className = 'grid-cell';
      cell.dataset.row = r;
      cell.dataset.col = c;
      cell.textContent = grid[r][c];
      
      // Mouse Events
      cell.addEventListener('mousedown', () => startSelection(r, c));
      cell.addEventListener('mouseenter', () => continueSelection(r, c));
      
      gridContainer.appendChild(cell);
    }
  }
}

// --- Selection Logic ---
function startSelection(row, col) {
  isSelecting = true;
  selectedCells = [{ row, col }];
  updateSelectionUI();
}

function continueSelection(row, col) {
  if (!isSelecting) return;
  
  const first = selectedCells[0];
  
  if (row === first.row) {
    selectedCells = [];
    const minC = Math.min(first.col, col);
    const maxC = Math.max(first.col, col);
    for (let c = minC; c <= maxC; c++) {
      selectedCells.push({ row: first.row, col: c });
    }
  } else if (col === first.col) {
    selectedCells = [];
    const minR = Math.min(first.row, row);
    const maxR = Math.max(first.row, row);
    for (let r = minR; r <= maxR; r++) {
      selectedCells.push({ row: r, col: first.col });
    }
  }
  
  updateSelectionUI();
}

function updateSelectionUI() {
  document.querySelectorAll('.grid-cell').forEach(cell => cell.classList.remove('selected'));
  
  selectedCells.forEach(cellData => {
    const cellEl = document.querySelector(`.grid-cell[data-row="${cellData.row}"][data-col="${cellData.col}"]`);
    if (cellEl) cellEl.classList.add('selected');
  });
}

// Global mouse up to check word
document.addEventListener('mouseup', () => {
  if (!isSelecting) return;
  isSelecting = false;
  
  let selectedWord = '';
  selectedCells.forEach(cellData => {
    const cellEl = document.querySelector(`.grid-cell[data-row="${cellData.row}"][data-col="${cellData.col}"]`);
    selectedWord += cellEl.textContent;
  });

  const reversedWord = selectedWord.split('').reverse().join('');
  let found = null;
  
  if (words.includes(selectedWord)) found = selectedWord;
  else if (words.includes(reversedWord)) found = reversedWord;

  if (found) {
    if (!foundWords.includes(found)) {
      // Pehli baar mila
      foundWords.push(found);
      markWordAsFound(found);
      addPuzzlePoints(10);
      
      if (foundWords.length === words.length) {
        if (typeof showToast === 'function') {
          showToast("🎉 Shandar! Aapne saare words dhoondh liye! +50 Points", "success");
        }
        addPuzzlePoints(50);
      }
    } else {
      // Already mila tha, phir se select kiya
      selectedCells.forEach(cellData => {
        const cellEl = document.querySelector(`.grid-cell[data-row="${cellData.row}"][data-col="${cellData.col}"]`);
        if (cellEl) cellEl.classList.add('found-permanent');
      });
    }
  }
  
  // Clear temporary selection
  setTimeout(() => {
    document.querySelectorAll('.grid-cell').forEach(cell => {
      if (!cell.classList.contains('found-permanent')) {
        cell.classList.remove('selected');
      }
    });
    selectedCells = [];
  }, 300);
});

function markWordAsFound(word) {
  const wordEl = document.getElementById(`word-${word}`);
  if (wordEl) wordEl.classList.add('found');
  
  selectedCells.forEach(cellData => {
    const cellEl = document.querySelector(`.grid-cell[data-row="${cellData.row}"][data-col="${cellData.col}"]`);
    if (cellEl) cellEl.classList.add('found-permanent');
  });
}

// --- Points Logic ---
function addPuzzlePoints(points) {
  let totalPoints = parseInt(localStorage.getItem('points') || 0) + points;
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
        points: fbPoints + points,
        weeklyPoints: fbWeeklyPoints + points,
        email: currentUser,
        lastUpdated: Date.now()
      });
    });
  }
}

// --- Start Game ---
document.addEventListener('DOMContentLoaded', () => {
  generateGrid();
  renderPuzzle();
});


function startNewPuzzle() {
  foundWords = []; // Reset found words
  generateGrid();  // Generate new grid
  renderPuzzle();  // Render new UI
}