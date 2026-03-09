/**
 * ████████████████████████████████████████████████████
 *  ELQPB — script.js
 *
 *  CO3: JS Fundamentals — operators, conditions, loops,
 *       functions, arrow functions, callbacks, objects,
 *       object inheritance, array methods, hex/sci literals
 *  CO4: DOM manipulation, event handling, browser storage,
 *       asynchronous programming, Promises
 *  CO5: Exception handling, ES6 modules, form validation,
 *       API integration, CORS awareness
 * ████████████████████████████████████████████████████
 */

// CO5: ES6 module — "type=module" on script tag in HTML
// Strict mode is implicit in ES modules


/* ════════════════════════════════════════════════════
   CO3: CONSTANTS — hex & scientific number literals
════════════════════════════════════════════════════ */
const MAX_QUESTIONS   = 0x1E;         // CO3: hex literal  = 30
const MIN_QUESTIONS   = 0x05;         // CO3: hex literal  = 5
const SCORE_PER_Q     = 1.0e1;        // CO3: scientific   = 10
const BONUS_STREAK    = 5.0e0;        // CO3: scientific   = 5
const PASSING_SCORE   = 0x28;         // CO3: hex literal  = 40 (percent)
const ANIM_DURATION   = 8.0e2;        // CO3: scientific   = 800ms
const STORAGE_KEY_USER   = 'elqpb_user';
const STORAGE_KEY_DB     = 'elqpb_db';
const STORAGE_KEY_THEME  = 'elqpb_theme';

/* ════════════════════════════════════════════════════
   CO3: QUESTION BANK — Object with subject arrays
   CO3: Objects, Array methods
════════════════════════════════════════════════════ */
const questionBank = {
  Math: [
    { q: 'What is the value of π (pi) to 2 decimal places?', opts: ['3.14', '3.41', '3.12', '3.16'], ans: 0, exp: 'π ≈ 3.14159… rounds to 3.14', diff: 'easy' },
    { q: 'Solve: 2x + 6 = 14. What is x?', opts: ['4', '5', '3', '6'], ans: 0, exp: '2x = 8, x = 4', diff: 'easy' },
    { q: 'What is 7² (7 squared)?', opts: ['49', '14', '42', '56'], ans: 0, exp: '7 × 7 = 49', diff: 'easy' },
    { q: 'What is the area of a circle with radius 5?', opts: ['78.54', '31.4', '25π', '50π'], ans: 0, exp: 'A = πr² = π × 25 ≈ 78.54', diff: 'medium' },
    { q: 'What is the derivative of x³?', opts: ['3x²', '3x', 'x²', '2x³'], ans: 0, exp: 'd/dx(xⁿ) = nxⁿ⁻¹, so 3x²', diff: 'hard' },
    { q: 'If a triangle has sides 3, 4, 5 — what type is it?', opts: ['Right-angled', 'Equilateral', 'Obtuse', 'Isosceles'], ans: 0, exp: '3² + 4² = 5², Pythagoras theorem', diff: 'medium' },
    { q: 'What is the LCM of 4 and 6?', opts: ['12', '24', '8', '6'], ans: 0, exp: 'LCM(4,6) = 12', diff: 'easy' },
    { q: 'What is log₁₀(1000)?', opts: ['3', '4', '2', '10'], ans: 0, exp: '10³ = 1000, so log₁₀(1000) = 3', diff: 'medium' },
    { q: 'Simplify: (x² - 4) / (x - 2)', opts: ['x + 2', 'x - 2', 'x²', '2x'], ans: 0, exp: 'x² - 4 = (x-2)(x+2), divide by (x-2) = x+2', diff: 'hard' },
    { q: 'What is ∫2x dx?', opts: ['x²+C', '2x²+C', 'x+C', '2+C'], ans: 0, exp: '∫2x dx = x² + C (power rule)', diff: 'hard' },
  ],
  Science: [
    { q: 'What is the chemical symbol for Gold?', opts: ['Au', 'Go', 'Gd', 'Ag'], ans: 0, exp: 'Au from Latin "Aurum"', diff: 'easy' },
    { q: 'Speed of light in vacuum (approx)?', opts: ['3×10⁸ m/s', '3×10⁶ m/s', '3×10¹⁰ m/s', '1×10⁸ m/s'], ans: 0, exp: 'c ≈ 2.998×10⁸ m/s', diff: 'medium' },
    { q: 'What is Newton\'s 2nd Law of Motion?', opts: ['F = ma', 'E = mc²', 'F = mv', 'P = mv'], ans: 0, exp: 'Force = mass × acceleration', diff: 'easy' },
    { q: 'What type of bond forms between Na and Cl?', opts: ['Ionic', 'Covalent', 'Metallic', 'Hydrogen'], ans: 0, exp: 'Na donates an electron to Cl — ionic bond', diff: 'medium' },
    { q: 'What organelle is the "powerhouse of the cell"?', opts: ['Mitochondria', 'Nucleus', 'Ribosome', 'Vacuole'], ans: 0, exp: 'Mitochondria produces ATP via cellular respiration', diff: 'easy' },
    { q: 'What is the pH of pure water?', opts: ['7', '0', '14', '5'], ans: 0, exp: 'Pure water is neutral — pH 7', diff: 'easy' },
    { q: 'Photosynthesis equation produces?', opts: ['Glucose + O₂', 'CO₂ + H₂O', 'ATP only', 'Glucose only'], ans: 0, exp: '6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂', diff: 'medium' },
    { q: 'What force keeps planets in orbit?', opts: ['Gravity', 'Magnetism', 'Nuclear force', 'Friction'], ans: 0, exp: 'Gravitational pull between sun and planets', diff: 'easy' },
    { q: 'What is Avogadro\'s number?', opts: ['6.022×10²³', '6.022×10²⁴', '3.14×10²³', '1.38×10²³'], ans: 0, exp: '6.022×10²³ particles per mole', diff: 'hard' },
    { q: 'Ohm\'s Law is:?', opts: ['V = IR', 'P = IV', 'F = ma', 'E = mc²'], ans: 0, exp: 'Voltage = Current × Resistance', diff: 'easy' },
  ],
  History: [
    { q: 'In which year did World War II end?', opts: ['1945', '1943', '1944', '1946'], ans: 0, exp: 'WWII ended with Japan\'s surrender on Sept 2, 1945', diff: 'easy' },
    { q: 'Who was the first President of the USA?', opts: ['George Washington', 'Abraham Lincoln', 'Thomas Jefferson', 'John Adams'], ans: 0, exp: 'George Washington, 1789–1797', diff: 'easy' },
    { q: 'The French Revolution began in:?', opts: ['1789', '1776', '1799', '1801'], ans: 0, exp: 'The storming of the Bastille was July 14, 1789', diff: 'medium' },
    { q: 'Who wrote "The Communist Manifesto"?', opts: ['Marx & Engels', 'Lenin', 'Stalin', 'Rousseau'], ans: 0, exp: 'Karl Marx and Friedrich Engels, 1848', diff: 'medium' },
    { q: 'Indus Valley Civilization flourished around:?', opts: ['2600–1900 BCE', '3500–3000 BCE', '1500–1000 BCE', '500–200 BCE'], ans: 0, exp: 'Major cities: Mohenjo-daro, Harappa', diff: 'hard' },
    { q: 'The Cold War was primarily between which two nations?', opts: ['USA & USSR', 'USA & China', 'UK & USSR', 'USA & Germany'], ans: 0, exp: 'Ideological conflict: capitalism vs communism (1947–1991)', diff: 'easy' },
    { q: 'Who was the last Pharaoh of ancient Egypt?', opts: ['Cleopatra VII', 'Ramesses II', 'Tutankhamun', 'Nefertiti'], ans: 0, exp: 'Cleopatra VII, died 30 BCE', diff: 'medium' },
    { q: 'Battle of Waterloo was fought in:?', opts: ['1815', '1812', '1800', '1820'], ans: 0, exp: 'June 18, 1815 — Napoleon\'s final defeat', diff: 'medium' },
  ],
  English: [
    { q: 'What is the plural of "phenomenon"?', opts: ['Phenomena', 'Phenomenons', 'Phenomenas', 'Phenomenon'], ans: 0, exp: '"Phenomena" is the Greek-origin plural', diff: 'medium' },
    { q: 'Identify the figure of speech: "The pen is mightier than the sword."', opts: ['Metaphor', 'Simile', 'Alliteration', 'Personification'], ans: 0, exp: 'Metaphor: comparing pen to sword directly, no "like/as"', diff: 'easy' },
    { q: 'Which word is an antonym of "benevolent"?', opts: ['Malevolent', 'Generous', 'Kind', 'Charitable'], ans: 0, exp: '"Benevolent" = kind; "Malevolent" = wishing harm', diff: 'easy' },
    { q: '"To be or not to be" is from which Shakespeare play?', opts: ['Hamlet', 'Othello', 'Macbeth', 'King Lear'], ans: 0, exp: 'Act 3, Scene 1 of Hamlet', diff: 'easy' },
    { q: 'What does "verbose" mean?', opts: ['Using too many words', 'Brief and concise', 'Visually appealing', 'Forceful'], ans: 0, exp: 'Verbose = wordy, overly long speech or writing', diff: 'medium' },
    { q: 'Identify the passive voice: "The book was read by her."', opts: ['Passive', 'Active', 'Imperative', 'Interrogative'], ans: 0, exp: 'Subject receives the action — passive construction', diff: 'easy' },
    { q: 'What is an oxymoron?', opts: ['Two contradictory words together', 'Exaggeration for effect', 'Comparison using like/as', 'Human traits to non-humans'], ans: 0, exp: 'e.g., "deafening silence", "living death"', diff: 'medium' },
    { q: 'Choose the correct spelling:', opts: ['Necessary', 'Neccessary', 'Necesary', 'Necesary'], ans: 0, exp: 'One C, two S: nec-es-sary', diff: 'easy' },
  ],
  CS: [
    { q: 'What does HTTP stand for?', opts: ['HyperText Transfer Protocol', 'High Transfer Text Protocol', 'HyperText Transit Protocol', 'Hyper Transfer Text Procedure'], ans: 0, exp: 'The foundation of data communication on the web', diff: 'easy' },
    { q: 'What is the time complexity of Binary Search?', opts: ['O(log n)', 'O(n)', 'O(n²)', 'O(1)'], ans: 0, exp: 'Halves the search space each step — O(log n)', diff: 'medium' },
    { q: 'What does CSS stand for?', opts: ['Cascading Style Sheets', 'Creative Style Syntax', 'Computer Style Sheets', 'Coding Style Sheets'], ans: 0, exp: 'CSS controls the visual presentation of HTML', diff: 'easy' },
    { q: 'Which data structure uses LIFO order?', opts: ['Stack', 'Queue', 'Linked List', 'Tree'], ans: 0, exp: 'Stack: Last In, First Out — like a pile of plates', diff: 'easy' },
    { q: 'What is a DNS used for?', opts: ['Domain Name to IP translation', 'Data Node Security', 'Dynamic Network Switching', 'Domain Note Syntax'], ans: 0, exp: 'DNS maps domain names (e.g., google.com) to IP addresses', diff: 'easy' },
    { q: 'What is the output of: typeof null in JavaScript?', opts: ['"object"', '"null"', '"undefined"', '"boolean"'], ans: 0, exp: 'Historical JS bug: typeof null === "object"', diff: 'hard' },
    { q: 'In Big-O, what is the worst case of Bubble Sort?', opts: ['O(n²)', 'O(n)', 'O(log n)', 'O(n log n)'], ans: 0, exp: 'Nested loops: n×n comparisons in worst case', diff: 'medium' },
    { q: 'What does API stand for?', opts: ['Application Programming Interface', 'Application Process Integration', 'Automated Process Interface', 'App Protocol Interface'], ans: 0, exp: 'APIs let different software systems communicate', diff: 'easy' },
    { q: 'What is CORS?', opts: ['Cross-Origin Resource Sharing', 'Client Object Response System', 'Cross-Origin Request Security', 'Common Object Reference Set'], ans: 0, exp: 'CO5: CORS controls cross-domain API access via HTTP headers', diff: 'hard' },
    { q: 'Which is a block-level HTML element?', opts: ['<div>', '<span>', '<a>', '<strong>'], ans: 0, exp: '<div> creates a block; <span> is inline', diff: 'easy' },
  ],
  General: [
    { q: 'How many planets are in our Solar System?', opts: ['8', '9', '7', '10'], ans: 0, exp: 'Pluto was reclassified as a dwarf planet in 2006', diff: 'easy' },
    { q: 'The capital of Japan is?', opts: ['Tokyo', 'Kyoto', 'Osaka', 'Hiroshima'], ans: 0, exp: 'Tokyo has been Japan\'s capital since 1869', diff: 'easy' },
    { q: 'Who painted the Mona Lisa?', opts: ['Leonardo da Vinci', 'Michelangelo', 'Raphael', 'Donatello'], ans: 0, exp: 'Painted c.1503–1519 by Leonardo da Vinci', diff: 'easy' },
    { q: 'What gas do plants absorb from the atmosphere?', opts: ['CO₂', 'O₂', 'N₂', 'H₂'], ans: 0, exp: 'Plants absorb CO₂ during photosynthesis', diff: 'easy' },
    { q: 'The largest ocean on Earth?', opts: ['Pacific', 'Atlantic', 'Indian', 'Arctic'], ans: 0, exp: 'Pacific Ocean covers ~165 million km²', diff: 'easy' },
    { q: 'Which country invented the printing press?', opts: ['Germany', 'China', 'UK', 'France'], ans: 0, exp: 'Johannes Gutenberg, Germany, c.1440', diff: 'medium' },
    { q: 'The speed of sound in air at room temp is approx?', opts: ['343 m/s', '300 m/s', '400 m/s', '1000 m/s'], ans: 0, exp: 'Sound travels at ~343 m/s at 20°C', diff: 'medium' },
    { q: 'Who wrote "Romeo and Juliet"?', opts: ['Shakespeare', 'Dickens', 'Austen', 'Tolstoy'], ans: 0, exp: 'William Shakespeare, c.1594–1596', diff: 'easy' },
  ],
};

/* ════════════════════════════════════════════════════
   CO3: DATA STORE — Object-based DB (simulates HashMap)
   CO3: Object inheritance pattern
════════════════════════════════════════════════════ */
// CO3: Object constructor pattern (inheritance)
function UserProfile(username, email, phone, fname, lname, role) {
  this.username   = username;
  this.email      = email || '';
  this.phone      = phone || '';
  this.fname      = fname || '';
  this.lname      = lname || '';
  this.role       = role  || 'student';
  this.scores     = [];           // CO3: Array for history
  this.subjectMap = {};           // CO3: Object as HashMap
  this.diffMap    = { easy: 0, medium: 0, hard: 0 };
  this.streak     = 0;
  this.totalPts   = 0;
  this.createdAt  = Date.now();
}

// CO3: Object prototype — method on shared prototype
UserProfile.prototype.getAvg = function() {
  if (!this.scores.length) return 0;
  // CO3: Array.reduce (array method)
  const sum = this.scores.reduce((acc, s) => acc + s.pct, 0);
  return Math.round(sum / this.scores.length);
};

UserProfile.prototype.getBest = function() {
  if (!this.scores.length) return 0;
  // CO3: Arrow function + Array.map
  return Math.max(...this.scores.map(s => s.pct));
};

UserProfile.prototype.getSubjectAvg = function(subj) {
  const arr = this.subjectMap[subj];
  if (!arr || !arr.length) return 0;
  return Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);
};

/* CO4: Browser localStorage — persistent storage
   CO5: Exception handling with try/catch */
function loadDB() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_DB);
    return raw ? JSON.parse(raw) : buildDefaultDB();
  } catch (e) {
    console.warn('[ELQPB] DB load error:', e.message);
    return buildDefaultDB();
  }
}

function saveDB() {
  try {
    localStorage.setItem(STORAGE_KEY_DB, JSON.stringify(db));
  } catch (e) {
    console.warn('[ELQPB] DB save error:', e.message);
  }
}

function buildDefaultDB() {
  // CO3: Array.forEach to seed demo users
  const seed = [
    { u: 'admin',   e: 'admin@elqpb.com',   p: 'admin', fn: 'Admin',   scores: [78,85,92,88,95] },
    { u: 'alice',   e: 'alice@uni.edu',      p: 'alice', fn: 'Alice',   scores: [72,80,68,75,82] },
    { u: 'bob',     e: 'bob@uni.edu',        p: 'bob',   fn: 'Bob',     scores: [55,60,70,65,72] },
    { u: 'charlie', e: 'charlie@uni.edu',    p: 'test',  fn: 'Charlie', scores: [88,90,92,94,96] },
    { u: 'diana',   e: 'diana@uni.edu',      p: 'test',  fn: 'Diana',   scores: [45,50,60,55,65] },
    { u: 'ethan',   e: 'ethan@uni.edu',      p: 'test',  fn: 'Ethan',   scores: [30,40,35,50,45] },
  ];

  const users = {};
  const subjects = Object.keys(questionBank);

  // CO3: forEach callback
  seed.forEach(({ u, e, p, fn, scores }) => {
    const prof = new UserProfile(u, e, '', fn, '');
    prof.password = p;
    // CO3: scores array (ArrayList simulation)
    scores.forEach((pct, i) => {
      const subj = subjects[i % subjects.length];
      prof.scores.push({ pct, subject: subj, diff: 'medium', date: Date.now() - (5 - i) * 86400000 });
      if (!prof.subjectMap[subj]) prof.subjectMap[subj] = [];
      prof.subjectMap[subj].push(pct);
    });
    prof.totalPts = scores.reduce((a, b) => a + b, 0);
    users[u] = prof;
  });

  return { users };
}

/* ════════════════════════════════════════════════════
   APPLICATION STATE
════════════════════════════════════════════════════ */
let db           = loadDB();
let currentUser  = null;
let loginMethod  = 'username';    // username | email | phone
let quizConfig   = { subject: null, count: 10, diff: 'medium', time: 30, mode: 'exam' };
let quizState    = { questions: [], idx: 0, score: 0, answers: [], timerInterval: null, startTimes: [] };
let chartInstances = {};          // CO4: store chart refs for cleanup

/* ════════════════════════════════════════════════════
   CO4: DOM MANIPULATION helpers
════════════════════════════════════════════════════ */
// CO3: Arrow functions
const $ = id => document.getElementById(id);
const el = (tag, cls, html) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html !== undefined) e.innerHTML = html;
  return e;
};

/* ════════════════════════════════════════════════════
   CO4: EVENT LISTENERS — Page load
════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  // CO4: DOM event handling
  loadTheme();
  checkSession();

  // CO4: keyboard event
  document.addEventListener('keydown', handleKeyboard);

  // Close user menu on outside click
  document.addEventListener('click', e => {
    const menu = $('user-menu');
    const btn  = $('nav-avatar');
    if (menu && btn && !menu.contains(e.target) && !btn.contains(e.target)) {
      closeUserMenu();
    }
  });

  // CO4: Range input live update (event delegation)
  const qRange = $('q-range');
  if (qRange) {
    qRange.addEventListener('input', function() {
      quizConfig.count = +this.value;
      updateRangeStyle(this);
    });
  }
});

// CO3: Arrow function
const updateRangeStyle = (input) => {
  const pct = ((input.value - input.min) / (input.max - input.min)) * 100;
  input.style.setProperty('--progress', pct + '%');
  if ($('q-val')) $('q-val').textContent = input.value;
  if (input.getAttribute('aria-valuenow') !== undefined)
    input.setAttribute('aria-valuenow', input.value);
};

function updateRange(el) {
  quizConfig.count = +el.value;
  updateRangeStyle(el);
}

/* ════════════════════════════════════════════════════
   THEME — CO2: CSS custom properties toggling
════════════════════════════════════════════════════ */
function loadTheme() {
  // CO4: localStorage.getItem
  const saved = localStorage.getItem(STORAGE_KEY_THEME) || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  const icon = $('theme-icon');
  if (icon) icon.textContent = saved === 'dark' ? '🌙' : '☀️';
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem(STORAGE_KEY_THEME, next);
  const icon = $('theme-icon');
  if (icon) icon.textContent = next === 'dark' ? '🌙' : '☀️';
  showToast(`${next === 'dark' ? '🌙 Dark' : '☀️ Light'} mode enabled`, 'info');
}

/* ════════════════════════════════════════════════════
   SESSION MANAGEMENT — CO4: localStorage
════════════════════════════════════════════════════ */
function checkSession() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_USER);
    if (saved) {
      const { username } = JSON.parse(saved);
      if (db.users[username]) {
        currentUser = db.users[username];
        enterApp();
        return;
      }
    }
  } catch (e) { /* ignore */ }
  showPage('login');
}

function saveSession(username) {
  // CO4: localStorage.setItem
  localStorage.setItem(STORAGE_KEY_USER, JSON.stringify({ username }));
}

function clearSession() {
  localStorage.removeItem(STORAGE_KEY_USER);
}

/* ════════════════════════════════════════════════════
   PAGE NAVIGATION — CO4: DOM manipulation
════════════════════════════════════════════════════ */
function showPage(id) {
  // CO3: querySelectorAll (DOM method) + forEach
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + id);
  if (target) target.classList.add('active');
}

function showSection(id) {
  document.querySelectorAll('.app-sec').forEach(s => s.classList.remove('active'));
  const sec = document.getElementById('sec-' + id);
  if (sec) sec.classList.add('active');

  // Update nav active state — CO4: querySelectorAll + forEach
  document.querySelectorAll('.nav-item').forEach(n => {
    n.classList.toggle('active', n.dataset.section === id);
    n.setAttribute('aria-current', n.dataset.section === id ? 'page' : '');
  });

  // Lazy-render section content
  const renders = {
    dashboard:   renderDashboard,
    analysis:    renderAnalysis,
    leaderboard: renderLeaderboard,
    competition: renderCompetitions,
  };
  if (renders[id]) renders[id]();
}

/* ════════════════════════════════════════════════════
   AUTH — Tab switching
   CO4: DOM events
════════════════════════════════════════════════════ */
function switchAuthTab(tab) {
  // CO4: classList manipulation
  document.querySelectorAll('.auth-tab').forEach((b, i) => {
    const isActive = (i === 0 && tab === 'login') || (i === 1 && tab === 'register');
    b.classList.toggle('active', isActive);
    b.setAttribute('aria-selected', String(isActive));
  });
  document.querySelectorAll('.auth-panel').forEach(p => p.classList.remove('active'));
  $('panel-' + tab).classList.add('active');

  // Animate tab slider
  const track = $('tab-track');
  if (track) {
    const container = document.querySelector('.auth-tabs');
    const tabs = container.querySelectorAll('.auth-tab');
    const active = tab === 'login' ? tabs[0] : tabs[1];
    track.style.width  = active.offsetWidth + 'px';
    track.style.transform = `translateX(${active.offsetLeft - 4}px)`;
  }
}

// Initialize track on load
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => switchAuthTab('login'), 100);
});

/* ════════════════════════════════════════════════════
   LOGIN METHOD SELECTOR
   CO4: DOM manipulation
════════════════════════════════════════════════════ */
function setMethod(method) {
  loginMethod = method;
  const config = {
    username: { type: 'text',  icon: '@',  placeholder: 'Enter your username',    autocomplete: 'username', label: 'Username' },
    email:    { type: 'email', icon: '✉',  placeholder: 'you@university.edu',     autocomplete: 'email',    label: 'Email' },
    phone:    { type: 'tel',   icon: '📱', placeholder: '+91 98765 43210',         autocomplete: 'tel',      label: 'Phone Number' },
  };
  const c   = config[method];
  const inp = $('login-id');
  const lbl = document.querySelector('[for="login-id"]') || document.querySelector('label[for="login-id"]');
  const ico = document.querySelector('.field-input-wrap .field-ico');

  if (inp) { inp.type = c.type; inp.placeholder = c.placeholder; inp.autocomplete = c.autocomplete; inp.value = ''; }
  if (lbl) lbl.textContent = c.label;
  if (ico) ico.textContent = c.icon;

  // Update aria-pressed on method pills
  ['method-u', 'method-e', 'method-p'].forEach((id, i) => {
    const btn = $(id);
    const methods = ['username', 'email', 'phone'];
    if (btn) {
      btn.classList.toggle('active', methods[i] === method);
      btn.setAttribute('aria-pressed', String(methods[i] === method));
    }
  });
}

/* ════════════════════════════════════════════════════
   PASSWORD VISIBILITY TOGGLE
   CO4: DOM manipulation
════════════════════════════════════════════════════ */
function togglePassword(inputId, btn) {
  const inp = $(inputId);
  if (!inp) return;
  const isPass = inp.type === 'password';
  inp.type      = isPass ? 'text' : 'password';
  btn.textContent = isPass ? '🙈' : '👁';
  btn.setAttribute('aria-label', isPass ? 'Hide password' : 'Show password');
}

/* ════════════════════════════════════════════════════
   PASSWORD STRENGTH
   CO3: conditions, functions
   CO5: Dynamic input handling
════════════════════════════════════════════════════ */
function calcStrength(pw) {
  // CO3: conditions + operators
  let score = 0;
  if (pw.length >= 6)                          score++;
  if (pw.length >= 10)                         score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw))   score++;
  if (/\d/.test(pw) && /[^A-Za-z0-9]/.test(pw)) score++;

  const levels = [
    { lbl: '',        color: '' },
    { lbl: 'Weak',    color: 'var(--rose)' },
    { lbl: 'Fair',    color: 'var(--amber)' },
    { lbl: 'Good',    color: 'var(--cyan)' },
    { lbl: 'Strong',  color: 'var(--green)' },
  ];
  const lvl = levels[score];

  // CO3: Loop — for loop
  for (let i = 1; i <= 4; i++) {
    const bar = $('sb-' + i);
    if (bar) bar.style.background = i <= score ? lvl.color : 'var(--border)';
  }
  const txt = $('strength-txt');
  if (txt) { txt.textContent = lvl.lbl; txt.style.color = lvl.color; }
}

/* ════════════════════════════════════════════════════
   CO5: FORM VALIDATION with async/Promises
   CO4: Async programming
════════════════════════════════════════════════════ */

// CO5: Exception handling
async function handleLogin(e) {
  e.preventDefault();
  const btn = $('login-btn');
  try {
    clearFormErr('login-err');
    btn.classList.add('loading');

    const id  = $('login-id').value.trim();
    const pw  = $('login-pw').value;

    // CO5: Form validation
    if (!id)  throw new Error('Please enter your ' + loginMethod);
    if (!pw)  throw new Error('Please enter your password');

    // CO4: Simulate async authentication (Promise)
    await simulateAsync(600);

    // CO3: Object lookup (HashMap search)
    const user = findUser(id, loginMethod, pw);
    if (!user) throw new Error('Invalid credentials. Try admin/admin');

    currentUser = user;
    const remember = $('remember')?.checked;
    if (remember) saveSession(user.username);

    showToast('Welcome back, ' + (user.fname || user.username) + '! 👋', 'success');
    enterApp();
  } catch (err) {
    showFormErr('login-err', err.message);
  } finally {
    btn.classList.remove('loading');
  }
}

// CO3: Arrow function — find user by method
const findUser = (id, method, pw) => {
  // CO3: Object.values (array method on object)
  return Object.values(db.users).find(u => {
    const matchId = method === 'username' ? u.username === id
                  : method === 'email'    ? u.email    === id
                  :                         u.phone    === id;
    return matchId && u.password === pw;
  }) || null;
};

// CO4: Async / Promise for registration
async function handleRegister(e) {
  e.preventDefault();
  const btn = $('register-btn');
  try {
    clearFormErr('reg-err');
    btn.classList.add('loading');

    // CO5: Gather & validate form inputs
    const fn    = $('reg-fn').value.trim();
    const ln    = $('reg-ln').value.trim();
    const uname = $('reg-user').value.trim();
    const email = $('reg-email').value.trim();
    const phone = $('reg-phone')?.value.trim() || '';
    const pw    = $('reg-pw').value;
    const cpw   = $('reg-cpw').value;
    const role  = $('reg-role').value;
    const terms = $('reg-terms')?.checked;

    // CO5: Validation chain
    if (!fn || !ln)           throw new Error('Please enter your full name');
    if (uname.length < 3)     throw new Error('Username must be at least 3 characters');
    if (!/^[a-zA-Z0-9_]+$/.test(uname)) throw new Error('Username: letters, numbers and _ only');
    if (db.users[uname])      throw new Error('Username already taken');
    if (!email.includes('@')) throw new Error('Please enter a valid email');
    if (pw.length < 6)        throw new Error('Password must be at least 6 characters');
    if (pw !== cpw)           throw new Error('Passwords do not match');
    if (!role)                throw new Error('Please select your role');
    if (!terms)               throw new Error('Please accept the Terms of Service');

    await simulateAsync(800);

    // CO3: Object constructor
    const newUser = new UserProfile(uname, email, phone, fn, ln, role);
    newUser.password = pw;
    db.users[uname] = newUser;
    saveDB();

    currentUser = newUser;
    showToast('Account created! Welcome, ' + fn + '! 🎉', 'success');
    enterApp();

  } catch (err) {
    showFormErr('reg-err', err.message);
  } finally {
    btn.classList.remove('loading');
  }
}

// CO4: Async/Promise — simulated network delay
const simulateAsync = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// CO3: Functions for form errors
function showFormErr(id, msg) {
  const el = $(id);
  if (el) { el.textContent = msg; el.classList.add('show'); }
}
function clearFormErr(id) {
  const el = $(id);
  if (el) { el.textContent = ''; el.classList.remove('show'); }
}

function socialLogin(provider) {
  showToast(`${provider} login coming soon!`, 'info');
}

/* ════════════════════════════════════════════════════
   APP ENTRY & LOGOUT
════════════════════════════════════════════════════ */
function enterApp() {
  showPage('app');
  // CO4: DOM manipulation — update user UI
  const initials = (currentUser.fname?.[0] || currentUser.username[0]).toUpperCase();
  ['nav-avatar', 'um-avatar'].forEach(id => { if ($(id)) $(id).textContent = initials; });
  if ($('um-name'))  $('um-name').textContent  = currentUser.fname ? `${currentUser.fname} ${currentUser.lname || ''}`.trim() : currentUser.username;
  if ($('um-email')) $('um-email').textContent = currentUser.email || currentUser.username;

  showSection('dashboard');
}

function doLogout() {
  clearSession();
  currentUser = null;
  closeUserMenu();
  showPage('login');
  switchAuthTab('login');
  showToast('Signed out. See you soon! 👋', 'info');
}

/* ════════════════════════════════════════════════════
   USER MENU — CO4: DOM events
════════════════════════════════════════════════════ */
function toggleUserMenu() {
  const menu = $('user-menu');
  const btn  = $('nav-avatar');
  if (!menu) return;
  const isHidden = menu.getAttribute('aria-hidden') === 'true';
  menu.setAttribute('aria-hidden', String(!isHidden));
  btn.setAttribute('aria-expanded', String(isHidden));
  if (isHidden) menu.removeAttribute('hidden');
  else          menu.setAttribute('hidden', '');
  if (isHidden) menu.removeAttribute('hidden');
  // toggle visibility
  if (menu.getAttribute('aria-hidden') === 'false') {
    menu.style.display = 'block';
  } else {
    menu.style.display = 'none';
  }
}
function closeUserMenu() {
  const menu = $('user-menu');
  if (menu) {
    menu.setAttribute('aria-hidden', 'true');
    menu.style.display = 'none';
  }
  const btn = $('nav-avatar');
  if (btn) btn.setAttribute('aria-expanded', 'false');
}

/* ════════════════════════════════════════════════════
   DASHBOARD RENDER
   CO3: Array methods, objects
   CO4: DOM manipulation, Chart.js API integration
════════════════════════════════════════════════════ */
function renderDashboard() {
  if (!currentUser) return;

  // CO3: Conditional (ternary)
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const name = currentUser.fname || currentUser.username;
  if ($('dash-greet')) $('dash-greet').textContent = `${greeting}, ${name} 👋`;

  const scores = currentUser.scores;
  const avg    = currentUser.getAvg();
  const best   = currentUser.getBest();

  // CO4: DOM manipulation — stat cards
  if ($('sc-quizzes')) $('sc-quizzes').textContent = scores.length;
  if ($('sc-avg'))     $('sc-avg').textContent     = avg ? avg + '%' : '—';
  if ($('sc-best'))    $('sc-best').textContent    = best ? best + '%' : '—';

  // CO3: DSA — Sorting (Array.sort comparator)
  const sorted = Object.values(db.users)
    .map(u => ({ u, avg: u.getAvg() }))
    .sort((a, b) => b.avg - a.avg);
  const rank = sorted.findIndex(x => x.u.username === currentUser.username) + 1;
  if ($('sc-rank')) $('sc-rank').textContent = rank > 0 ? '#' + rank : '#—';

  // Streak badge
  if ($('streak-badge') && scores.length >= 3) {
    $('streak-badge').textContent = '🔥 ' + scores.length + ' quizzes!';
  }

  renderHistoryChart();
  renderSubjectChart();
  renderRecentActivity();
}

// CO4: Chart.js integration (async-style: waits for DOM)
function renderHistoryChart() {
  const canvas = $('chart-history');
  if (!canvas) return;
  if (chartInstances.history) { chartInstances.history.destroy(); }

  const scores = currentUser.scores.slice(-10);
  // CO3: Array.map (array method)
  const labels = scores.map((_, i) => 'Q' + (i + 1));
  const data   = scores.map(s => s.pct);

  chartInstances.history = new Chart(canvas, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Score %',
        data,
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245,158,11,0.08)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#f59e0b',
        pointRadius: 4,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: true,
      plugins: { legend: { display: false } },
      scales: {
        y: { min: 0, max: 100, ticks: { color: '#4a5a78' }, grid: { color: 'rgba(255,255,255,.05)' } },
        x: { ticks: { color: '#4a5a78' }, grid: { display: false } }
      }
    }
  });
}

function renderSubjectChart() {
  const canvas = $('chart-subjects');
  if (!canvas) return;
  if (chartInstances.subjects) { chartInstances.subjects.destroy(); }

  const subjects = Object.keys(questionBank);
  // CO3: Array.map
  const avgs = subjects.map(s => currentUser.getSubjectAvg(s));

  chartInstances.subjects = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: subjects,
      datasets: [{
        label: 'Avg %',
        data: avgs,
        backgroundColor: ['#f59e0b','#06b6d4','#8b5cf6','#10b981','#f43f5e','#3b82f6'],
        borderRadius: 6,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: true,
      plugins: { legend: { display: false } },
      scales: {
        y: { min: 0, max: 100, ticks: { color: '#4a5a78' }, grid: { color: 'rgba(255,255,255,.05)' } },
        x: { ticks: { color: '#4a5a78', font: { size: 11 } }, grid: { display: false } }
      }
    }
  });
}

function renderRecentActivity() {
  const feed = $('recent-list');
  if (!feed) return;

  const recent = currentUser.scores.slice(-5).reverse();
  if (!recent.length) {
    feed.innerHTML = '<p class="empty-msg">No quizzes yet — press <strong>+ New Quiz</strong>! 🚀</p>';
    return;
  }

  // CO3: Array.map + join
  feed.innerHTML = recent.map((s, i) => {
    const icons = { Math:'📐', Science:'🔬', History:'🏛️', English:'📚', CS:'💻', General:'🌐' };
    const icon  = icons[s.subject] || '📝';
    const color = s.pct >= 80 ? 'var(--green)' : s.pct >= 60 ? 'var(--amber)' : 'var(--rose)';
    // CO2: <time> semantic element
    const date  = new Date(s.date).toLocaleDateString();
    return `
      <div class="activity-item">
        <div class="ai-icon" style="background:${color}22;color:${color}">${icon}</div>
        <div class="ai-info">
          <div class="ai-title">${s.subject} · ${s.diff}</div>
          <div class="ai-meta"><time datetime="${new Date(s.date).toISOString()}">${date}</time></div>
        </div>
        <div class="ai-score" style="color:${color}">${s.pct}%</div>
      </div>`;
  }).join('');
}

/* ════════════════════════════════════════════════════
   QUIZ SETUP — CO3: Functions
════════════════════════════════════════════════════ */
function pickSubject(subj, btn) {
  quizConfig.subject = subj;
  document.querySelectorAll('.subj-btn').forEach(b => {
    b.setAttribute('aria-checked', 'false');
    b.classList.remove('active');
  });
  btn.setAttribute('aria-checked', 'true');
  btn.classList.add('active');
}

function pickDiff(diff, btn) {
  quizConfig.diff = diff;
  document.querySelectorAll('.diff-opt').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-checked','false'); });
  btn.classList.add('active');
  btn.setAttribute('aria-checked', 'true');
}

function pickTime(t, btn) {
  quizConfig.time = t;
  document.querySelectorAll('.chip').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-checked','false'); });
  btn.classList.add('active');
  btn.setAttribute('aria-checked', 'true');
}

function pickMode(mode, btn) {
  quizConfig.mode = mode;
  document.querySelectorAll('.mode-opt').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-checked','false'); });
  btn.classList.add('active');
  btn.setAttribute('aria-checked', 'true');
}

/* ════════════════════════════════════════════════════
   QUIZ ENGINE
   CO3: DSA — Fisher-Yates shuffle, Arrays
   CO4: setTimeout (async), DOM manipulation
════════════════════════════════════════════════════ */
function launchQuiz() {
  if (!quizConfig.subject) {
    showToast('Please pick a subject first!', 'error');
    return;
  }

  // CO3: Get questions for subject + filter by difficulty
  const pool = questionBank[quizConfig.subject] || [];
  const filtered = quizConfig.diff === 'all'
    ? pool
    : pool.filter(q => q.diff === quizConfig.diff);

  // Fallback: if not enough questions for diff, use all
  const source = filtered.length >= 5 ? filtered : pool;

  // CO3: DSA — Fisher-Yates shuffle algorithm
  const shuffled = fisherYatesShuffle([...source]);
  const questions = shuffled.slice(0, Math.min(quizConfig.count, shuffled.length));

  // CO3: Shuffle answer options for each question
  quizState = {
    questions: questions.map(q => shuffleOptions(q)),
    idx:       0,
    score:     0,
    answers:   [],
    timerInterval: null,
    startTimes: [],
    selected:  null,
  };

  showPage('quiz');
  loadQuestion();
}

// CO3: DSA — Fisher-Yates Shuffle
function fisherYatesShuffle(arr) {
  // CO3: Loop (for loop) + Math operations
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];  // CO3: destructuring swap
  }
  return arr;
}

// Shuffle answer options while tracking correct answer
function shuffleOptions(q) {
  const opts    = [...q.opts];
  const correct = opts[q.ans];
  const shuffled = fisherYatesShuffle(opts);
  return { ...q, opts: shuffled, ans: shuffled.indexOf(correct) };
}

function loadQuestion() {
  const { questions, idx } = quizState;
  if (idx >= questions.length) { endQuiz(); return; }

  const q = questions[idx];
  quizState.selected = null;
  quizState.startTimes[idx] = Date.now();

  // CO4: DOM manipulation
  const total = questions.length;
  if ($('q-num-label')) $('q-num-label').textContent = `Q${idx + 1} of ${total}`;
  if ($('quiz-prog')) {
    const pct = (idx / total) * 100;
    $('quiz-prog').style.width = pct + '%';
    $('quiz-prog-outer')?.setAttribute('aria-valuenow', Math.round(pct));
  }

  // Difficulty & subject tags
  const diffEl = $('q-diff-tag');
  if (diffEl) { diffEl.textContent = q.diff; diffEl.className = 'q-tag diff-tag ' + q.diff; }
  if ($('q-subj-tag')) $('q-subj-tag').textContent = quizConfig.subject;

  // Points display (hex: 0x0A = 10, harder = more)
  const pts = q.diff === 'hard' ? 0x0F : q.diff === 'medium' ? 0x0A : 0x05;
  if ($('q-pts-label')) $('q-pts-label').textContent = `+${pts} pts`;

  // Question text — CO4: DOM innerHTML
  if ($('q-text')) $('q-text').textContent = q.q;

  // Options — CO4: DOM manipulation loop
  const optsEl = $('q-opts');
  if (optsEl) {
    const keys = ['A', 'B', 'C', 'D'];
    optsEl.innerHTML = q.opts.map((opt, i) => `
      <button class="opt-btn" onclick="selectOpt(${i}, this)"
        role="radio" aria-checked="false"
        data-idx="${i}">
        <span class="opt-key">${keys[i]}</span>
        ${escHtml(opt)}
      </button>`).join('');
  }

  // Hide explanation
  const expBox = $('q-explain');
  if (expBox) { expBox.textContent = ''; expBox.hidden = true; }

  // Button states
  if ($('btn-next'))   $('btn-next').hidden   = true;
  if ($('btn-submit')) $('btn-submit').hidden  = false;

  // Footer meta
  if ($('qf-meta')) $('qf-meta').textContent = `${quizConfig.subject} · ${quizConfig.mode} mode`;

  // Timer
  startTimer(q);
}

function selectOpt(idx, btn) {
  if (quizState.selected !== null) return; // Already submitted
  quizState.selected = idx;

  // CO4: DOM querySelectorAll + forEach
  document.querySelectorAll('.opt-btn').forEach(b => {
    b.classList.remove('selected');
    b.setAttribute('aria-checked', 'false');
  });
  btn.classList.add('selected');
  btn.setAttribute('aria-checked', 'true');
}

function submitAnswer() {
  const q   = quizState.questions[quizState.idx];
  const sel = quizState.selected;
  const timeTaken = ((Date.now() - quizState.startTimes[quizState.idx]) / 1000).toFixed(1);

  clearInterval(quizState.timerInterval);

  const isCorrect = sel !== null && sel === q.ans;
  const pts = q.diff === 'hard' ? 0x0F : q.diff === 'medium' ? 0x0A : 0x05;

  if (isCorrect) {
    quizState.score += pts;
    if ($('live-score')) $('live-score').textContent = quizState.score;
  }

  quizState.answers.push({ q, selected: sel, correct: isCorrect, time: +timeTaken });

  // CO4: DOM — highlight answers
  document.querySelectorAll('.opt-btn').forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.ans) btn.classList.add('correct');
    else if (i === sel && !isCorrect) btn.classList.add('wrong');
  });

  // Practice mode — show explanation
  if (quizConfig.mode === 'practice' && q.exp) {
    const expBox = $('q-explain');
    if (expBox) {
      expBox.textContent = '💡 ' + q.exp;
      expBox.hidden = false;
    }
  }

  if ($('btn-submit')) $('btn-submit').hidden = true;
  if ($('btn-next'))   $('btn-next').hidden   = false;
}

function nextQ() {
  quizState.idx++;
  loadQuestion();
}

// CO3: Timer with setInterval (callback)
function startTimer(q) {
  clearInterval(quizState.timerInterval);
  const numEl    = $('timer-num');
  const ringEl   = $('timer-circle');
  const limit    = quizConfig.time;

  if (!limit) {
    if (numEl)  numEl.textContent = '∞';
    if (ringEl) ringEl.style.strokeDashoffset = '0';
    return;
  }

  let remaining = limit;
  const totalDash = 125.7; // 2πr for r=20

  // CO3: Arrow function in setInterval
  quizState.timerInterval = setInterval(() => {
    remaining--;
    if (numEl) numEl.textContent = remaining;

    const offset = totalDash * (1 - remaining / limit);
    if (ringEl) ringEl.style.strokeDashoffset = offset;

    // CO3: Conditional logic
    if (numEl) {
      numEl.classList.remove('timer-warn', 'timer-danger', 'timer-danger-anim');
      if (remaining <= 5) { numEl.classList.add('timer-danger', 'timer-danger-anim'); }
      else if (remaining <= 10) { numEl.classList.add('timer-warn'); }
    }

    if (remaining <= 0) {
      clearInterval(quizState.timerInterval);
      if (quizState.selected === null) quizState.selected = -1;
      submitAnswer();
    }
  }, 1000);
}

/* ════════════════════════════════════════════════════
   QUIT MODAL
   CO4: DOM events
════════════════════════════════════════════════════ */
function confirmQuit() {
  const modal = $('quit-modal');
  if (modal) modal.removeAttribute('hidden');
}
function closeModal(id) {
  const modal = $(id);
  if (modal) modal.setAttribute('hidden', '');
}
function doQuit() {
  clearInterval(quizState.timerInterval);
  closeModal('quit-modal');
  showPage('app');
  showSection('quiz-setup');
  showToast('Quiz abandoned', 'info');
}

/* ════════════════════════════════════════════════════
   END QUIZ & RESULTS
   CO3: Array methods, math operations
   CO4: DOM manipulation, Chart.js
════════════════════════════════════════════════════ */
function endQuiz() {
  clearInterval(quizState.timerInterval);

  const answers  = quizState.answers;
  const total    = answers.length;
  const correct  = answers.filter(a => a.correct).length;
  const wrong    = answers.filter(a => !a.correct && a.selected !== -1).length;
  const skipped  = answers.filter(a => a.selected === -1 || a.selected === null).length;
  // CO3: Array.reduce for avg time
  const avgTime  = total ? (answers.reduce((s, a) => s + a.time, 0) / total).toFixed(1) : 0;
  const pct      = Math.round((correct / total) * 100);

  // Save result to user profile
  const result = { pct, subject: quizConfig.subject, diff: quizConfig.diff, date: Date.now(), correct, wrong, skipped };
  currentUser.scores.push(result);
  if (!currentUser.subjectMap[quizConfig.subject]) currentUser.subjectMap[quizConfig.subject] = [];
  currentUser.subjectMap[quizConfig.subject].push(pct);
  currentUser.diffMap[quizConfig.diff] = (currentUser.diffMap[quizConfig.diff] || 0) + 1;
  currentUser.totalPts += quizState.score;
  db.users[currentUser.username] = currentUser;
  saveDB();

  // Show results page
  showPage('result');

  // CO4: DOM updates
  if ($('rs-correct')) $('rs-correct').textContent = correct;
  if ($('rs-wrong'))   $('rs-wrong').textContent   = wrong;
  if ($('rs-skip'))    $('rs-skip').textContent     = skipped;
  if ($('rs-time'))    $('rs-time').textContent     = avgTime + 's';

  // Grade
  const { grade, msg, color } = getGrade(pct);
  if ($('res-grade')) { $('res-grade').textContent = grade; $('res-grade').style.color = color; }
  if ($('res-msg'))     $('res-msg').textContent   = msg;

  // Animate score ring
  const ringEl = $('score-ring-circle');
  const pctEl  = $('res-pct');
  if (ringEl && pctEl) {
    const circumference = 477.5;
    const offset = circumference * (1 - pct / 100);
    // CO4: CSS transition via JS
    setTimeout(() => {
      ringEl.style.transition      = 'stroke-dashoffset 1.2s cubic-bezier(0.16,1,0.3,1)';
      ringEl.style.strokeDashoffset = offset;
      ringEl.style.stroke           = color;
    }, 100);

    // CO4: Async count-up animation
    let count = 0;
    const step = Math.ceil(pct / 40);
    const timer = setInterval(() => {
      count = Math.min(count + step, pct);
      pctEl.textContent = count + '%';
      if (count >= pct) clearInterval(timer);
    }, ANIM_DURATION / 40);
  }

  renderImprovementCards(pct, skipped, wrong);
  renderResultChart(correct, wrong, skipped);
  renderQuestionReview(answers);
}

// CO3: Conditions — grade mapping
function getGrade(pct) {
  if (pct >= 90) return { grade: 'OUTSTANDING ⭐', msg: 'Exceptional work! You\'re at the top.', color: 'var(--amber)' };
  if (pct >= 75) return { grade: 'GREAT JOB 🚀',  msg: 'Strong performance! Keep pushing.',    color: 'var(--green)' };
  if (pct >= 60) return { grade: 'GOOD WORK 👍',  msg: 'Solid effort. Room to grow!',           color: 'var(--cyan)' };
  if (pct >= 40) return { grade: 'KEEP TRYING 💪',msg: 'You\'re making progress. Don\'t stop.', color: 'var(--violet)' };
  return           { grade: 'NEEDS WORK 📖',       msg: 'Review the material and try again!',    color: 'var(--rose)' };
}

// CO3: Rule-based improvement suggestions
function renderImprovementCards(pct, skipped, wrong) {
  const container = $('res-improve');
  if (!container) return;

  const tips = [];
  // CO3: Conditions
  if (pct < 60)    tips.push({ icon: '📖', title: 'Study More',      text: 'Review your notes on ' + quizConfig.subject + ' before your next attempt.' });
  if (skipped > 2) tips.push({ icon: '⏱', title: 'Speed Up',        text: 'You skipped ' + skipped + ' questions. Practice timed sessions to improve pace.' });
  if (wrong > 3)   tips.push({ icon: '🎯', title: 'Accuracy Focus',  text: 'Focus on conceptual clarity — ' + wrong + ' wrong answers need review.' });
  if (pct >= 80)   tips.push({ icon: '🔥', title: 'Try Hard Mode',   text: 'You\'re ready for a challenge! Switch to Hard difficulty next time.' });
  if (tips.length === 0) tips.push({ icon: '⭐', title: 'Perfect Run!', text: 'Amazing! Try a different subject to expand your knowledge.' });

  container.innerHTML = tips.map(t => `
    <div class="imp-card">
      <strong>${t.icon} ${t.title}</strong>${t.text}
    </div>`).join('');
}

function renderResultChart(correct, wrong, skipped) {
  const canvas = $('chart-result');
  if (!canvas) return;
  if (chartInstances.result) chartInstances.result.destroy();

  chartInstances.result = new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels: ['Correct', 'Wrong', 'Skipped'],
      datasets: [{ data: [correct, wrong, skipped], backgroundColor: ['#10b981','#f43f5e','#f59e0b'], borderWidth: 0 }]
    },
    options: { responsive: true, plugins: { legend: { position: 'bottom', labels: { color: '#8898bb', font: { size: 12 } } } }, cutout: '65%' }
  });
}

function renderQuestionReview(answers) {
  const el = $('q-review');
  if (!el) return;
  el.innerHTML = answers.map((a, i) => {
    const icon = a.correct ? '✅' : a.selected === -1 ? '⏭' : '❌';
    const userAns = a.selected >= 0 ? a.q.opts[a.selected] : '(skipped)';
    return `
      <div class="q-review-item" role="listitem">
        <span class="qr-icon">${icon}</span>
        <div>
          <div class="qr-q">Q${i+1}: ${escHtml(a.q.q.substring(0, 60))}…</div>
          <div class="qr-a">Your answer: <span style="color:${a.correct?'var(--green)':'var(--rose)'}">${escHtml(userAns)}</span></div>
          ${!a.correct ? `<div style="font-size:.75rem;color:var(--cyan);margin-top:2px">✓ ${escHtml(a.q.opts[a.q.ans])}</div>` : ''}
        </div>
      </div>`;
  }).join('');
}

function backToDash() {
  showPage('app');
  showSection('dashboard');
}

/* ════════════════════════════════════════════════════
   ANALYSIS
   CO4: Chart.js, DOM manipulation
════════════════════════════════════════════════════ */
function renderAnalysis() {
  if (!currentUser) return;
  renderTrendChart();
  renderRadarChart();
  renderTopicBars();
  renderSmartTips();
  renderDiffChart();
}

function renderTrendChart() {
  const canvas = $('chart-trend');
  if (!canvas) return;
  if (chartInstances.trend) chartInstances.trend.destroy();

  const scores = currentUser.scores.slice(-10);
  chartInstances.trend = new Chart(canvas, {
    type: 'line',
    data: {
      labels: scores.map((_, i) => 'Q'+(i+1)),
      datasets: [{
        label: 'Score %', data: scores.map(s => s.pct),
        borderColor: '#f59e0b', backgroundColor: 'rgba(245,158,11,.06)',
        fill: true, tension: 0.4, pointBackgroundColor: '#f59e0b', pointRadius: 5,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: true,
      scales: {
        y: { min:0, max:100, ticks:{color:'#4a5a78'}, grid:{color:'rgba(255,255,255,.05)'} },
        x: { ticks:{color:'#4a5a78'}, grid:{display:false} }
      },
      plugins: { legend: { display: false } }
    }
  });
}

function renderRadarChart() {
  const canvas = $('chart-radar');
  if (!canvas) return;
  if (chartInstances.radar) chartInstances.radar.destroy();

  const subjects = Object.keys(questionBank);
  const avgs     = subjects.map(s => currentUser.getSubjectAvg(s));

  chartInstances.radar = new Chart(canvas, {
    type: 'radar',
    data: {
      labels: subjects,
      datasets: [{
        label: 'Score %', data: avgs,
        borderColor: '#06b6d4', backgroundColor: 'rgba(6,182,212,.1)',
        pointBackgroundColor: '#06b6d4',
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: true,
      scales: { r: { min:0, max:100, ticks:{color:'#4a5a78', stepSize:25}, grid:{color:'rgba(255,255,255,.08)'}, pointLabels:{color:'#8898bb'} } },
      plugins: { legend: { display: false } }
    }
  });
}

function renderTopicBars() {
  const container = $('topic-bars');
  if (!container) return;

  const subjects = Object.keys(questionBank);
  // CO3: Array.map + Arrow function
  container.innerHTML = subjects.map(subj => {
    const avg   = currentUser.getSubjectAvg(subj);
    const color = avg >= 75 ? 'var(--green)' : avg >= 50 ? 'var(--amber)' : avg > 0 ? 'var(--rose)' : 'var(--border)';
    return `
      <div class="topic-bar-item" role="listitem">
        <span class="tb-name">${subj}</span>
        <div class="tb-track"><div class="tb-fill" style="width:${avg}%;background:${color}"></div></div>
        <span class="tb-val">${avg ? avg+'%' : '—'}</span>
      </div>`;
  }).join('');
}

function renderSmartTips() {
  const container = $('smart-tips');
  if (!container) return;

  const subjects = Object.keys(questionBank);
  const weak = subjects.filter(s => { const a = currentUser.getSubjectAvg(s); return a > 0 && a < 60; });
  const tips = [];

  // CO3: Conditions
  if (weak.length) tips.push({ icon: '📚', text: `Focus on: ${weak.join(', ')}` });
  if (currentUser.scores.length < 3) tips.push({ icon: '🎯', text: 'Take more quizzes to unlock deeper analytics!' });
  const recent3 = currentUser.scores.slice(-3);
  if (recent3.length === 3 && recent3.every(s => s.pct < 60)) tips.push({ icon: '🔄', text: 'Consistent low scores — try Easy mode to build confidence' });
  tips.push({ icon: '⚡', text: 'Attempt quizzes daily to build a strong streak' });
  tips.push({ icon: '🧠', text: 'Review explanations in Practice mode to learn faster' });

  container.innerHTML = tips.map(t =>
    `<div class="tip-item" role="listitem"><span class="tip-icon">${t.icon}</span><span>${t.text}</span></div>`
  ).join('');
}

function renderDiffChart() {
  const canvas = $('chart-diff-split');
  if (!canvas) return;
  if (chartInstances.diff) chartInstances.diff.destroy();

  const dm = currentUser.diffMap || {};
  chartInstances.diff = new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels: ['Easy', 'Medium', 'Hard'],
      datasets: [{ data: [dm.easy||0, dm.medium||0, dm.hard||0], backgroundColor: ['#10b981','#f59e0b','#f43f5e'], borderWidth: 0 }]
    },
    options: { responsive: true, plugins: { legend: { position: 'bottom', labels: { color: '#8898bb' } } }, cutout: '55%' }
  });
}

/* ════════════════════════════════════════════════════
   LEADERBOARD
   CO3: DSA — Sorting algorithm
   CO4: DOM table manipulation
════════════════════════════════════════════════════ */
function renderLeaderboard() {
  const filter = $('lb-subject')?.value || 'all';

  // CO3: DSA — Sort all users by avg score (custom comparator)
  const rankings = Object.values(db.users)
    .map(u => {
      const avg = filter === 'all'
        ? u.getAvg()
        : u.getSubjectAvg(filter);
      return { u, avg, best: u.getBest() };
    })
    .filter(x => x.avg > 0)
    .sort((a, b) => b.avg - a.avg || b.best - a.best);  // CO3: sort comparator

  const tbody = $('lb-rows');
  if (!tbody) return;

  // CO4: DOM innerHTML
  tbody.innerHTML = rankings.slice(0, 15).map((item, i) => {
    const rank   = i + 1;
    const isMe   = item.u.username === currentUser?.username;
    const medal  = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : '';
    const rankCls = `rank-cell rank-${rank}`;
    const rowCls  = isMe ? 'me-row' : '';
    const barW    = item.avg;
    return `
      <tr class="${rowCls}" ${isMe ? 'aria-current="true"' : ''}>
        <td class="${rankCls}">${medal || rank}</td>
        <td>${escHtml(item.u.fname || item.u.username)} ${isMe ? '← you' : ''}</td>
        <td>${item.u.scores.length}</td>
        <td><strong>${item.avg}%</strong></td>
        <td>${item.best ? item.best + '%' : '—'}</td>
        <td><div class="lb-mini-bar"><div class="lb-mini-fill" style="width:${barW}%"></div></div></td>
      </tr>`;
  }).join('');

  // Your rank
  const myRank = rankings.findIndex(x => x.u.username === currentUser?.username) + 1;
  if ($('your-rank')) $('your-rank').textContent = myRank > 0 ? '#' + myRank : '#—';

  // Podium top 3
  const podium = $('podium');
  if (podium) {
    const top3 = rankings.slice(0, 3);
    podium.innerHTML = top3.map((item, i) => {
      const medals = ['🥇', '🥈', '🥉'];
      return `<li class="podium-item"><span class="podium-medal">${medals[i]}</span> ${escHtml(item.u.fname || item.u.username)} — <strong>${item.avg}%</strong></li>`;
    }).join('');
  }
}

/* ════════════════════════════════════════════════════
   COMPETITIONS
   CO4: DOM manipulation
   CO3: Objects, conditions
════════════════════════════════════════════════════ */
function renderCompetitions() {
  const grid = $('comp-cards');
  if (!grid) return;

  const comps = [
    { title: 'Math Olympiad',      subject: 'Math',    status: 'live',     prize: '🥇 Gold Badge + 500 pts',   ends: 'Today 11:59 PM',   icon: '📐' },
    { title: 'CS Weekly Challenge',subject: 'CS',      status: 'live',     prize: '🏆 Trophy + 300 pts',        ends: 'Ends in 3 hours',  icon: '💻' },
    { title: 'Science Sprint',     subject: 'Science', status: 'upcoming', prize: '⭐ Star Badge + 200 pts',    ends: 'Starts tomorrow',  icon: '🔬' },
    { title: 'History Hive',       subject: 'History', status: 'upcoming', prize: '📜 Certificate + 150 pts',   ends: 'Starts in 2 days', icon: '🏛️' },
    { title: 'English Elite',      subject: 'English', status: 'ended',    prize: '🎖️ Completed',               ends: 'Ended',            icon: '📚' },
    { title: 'General Knowledge',  subject: 'General', status: 'upcoming', prize: '🌟 500 bonus pts',           ends: 'This weekend',     icon: '🌐' },
  ];

  grid.innerHTML = comps.map(c => {
    const statusLabel = c.status === 'live' ? '<span class="live-dot"></span> LIVE' : c.status.toUpperCase();
    const statusColor = c.status === 'live' ? 'var(--green)' : c.status === 'upcoming' ? 'var(--amber)' : 'var(--tx-3)';
    const btnText     = c.status === 'live' ? 'Join Now →' : c.status === 'upcoming' ? 'Register' : 'View Results';
    const btnClass    = c.status === 'ended' ? 'btn-ghost' : 'btn-accent';

    return `
      <div class="comp-card ${c.status}" role="listitem">
        <div class="cc-status" style="color:${statusColor}">${statusLabel}</div>
        <div class="cc-title">${c.icon} ${c.title}</div>
        <div class="cc-meta">Subject: ${c.subject} · ${c.ends}</div>
        <div class="cc-prize">${c.prize}</div>
        <button class="${btnClass}" onclick="joinComp('${c.title}','${c.subject}','${c.status}')" style="width:100%">${btnText}</button>
      </div>`;
  }).join('');
}

function joinComp(title, subject, status) {
  if (status === 'live') {
    quizConfig.subject = subject;
    quizConfig.diff    = 'hard';
    quizConfig.count   = 10;
    quizConfig.mode    = 'exam';
    launchQuiz();
  } else if (status === 'upcoming') {
    showToast('Registered for ' + title + '! 🎉', 'success');
  } else {
    showToast(title + ' has ended. Check leaderboard!', 'info');
  }
}

/* ════════════════════════════════════════════════════
   CO4: KEYBOARD NAVIGATION
════════════════════════════════════════════════════ */
function handleKeyboard(e) {
  // CO3: Conditions
  if (e.key === 'Escape') {
    closeModal('quit-modal');
    closeUserMenu();
  }
  // Number keys 1-4 for options in quiz
  if (document.getElementById('page-quiz')?.classList.contains('active')) {
    const n = parseInt(e.key);
    if (n >= 1 && n <= 4) {
      const btns = document.querySelectorAll('.opt-btn');
      if (btns[n-1] && !btns[n-1].disabled) btns[n-1].click();
    }
    if (e.key === 'Enter' && $('btn-next') && !$('btn-next').hidden) nextQ();
  }
}

/* ════════════════════════════════════════════════════
   TOAST NOTIFICATIONS
   CO4: DOM manipulation, setTimeout
   CO5: Async-like UI feedback
════════════════════════════════════════════════════ */
let toastTimeout;
function showToast(msg, type = 'info') {
  const toast = $('toast');
  const icon  = $('toast-icon');
  const text  = $('toast-text');
  if (!toast) return;

  const icons = { success: '✅', error: '❌', info: 'ℹ️' };
  if (icon) icon.textContent = icons[type] || 'ℹ️';
  if (text) text.textContent = msg;
  toast.className = `toast ${type}`;
  toast.removeAttribute('hidden');
  toast.classList.remove('hiding');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.add('hiding');
    setTimeout(() => toast.setAttribute('hidden', ''), 300);
  }, 3500);
}

/* ════════════════════════════════════════════════════
   CO5: API INTEGRATION — Trivia API (async/await + CORS)
════════════════════════════════════════════════════ */
// CO5: async function with try/catch (exception handling)
// CO5: CORS — This fetch uses a public CORS-enabled API
async function fetchTriviaFact() {
  // CO5: try/catch for exception handling + CORS awareness
  try {
    // CO4: Async programming — fetch (Promise-based)
    // CO5: CORS — using a CORS-enabled public endpoint
    const response = await fetch('https://opentdb.com/api.php?amount=1&type=boolean', {
      method: 'GET',
      // CO5: CORS note — this API allows cross-origin requests
      headers: { 'Accept': 'application/json' },
    });

    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

    // CO4: Async — await JSON parse
    const data = await response.json();
    const item = data.results?.[0];
    if (item) {
      showToast('🌐 Trivia: ' + decodeHTML(item.question).substring(0, 80) + '…', 'info');
    }
  } catch (err) {
    // CO5: Exception handling
    console.warn('[ELQPB] Trivia API error (CORS or network):', err.message);
    // Graceful degradation — no visible error to user
  }
}

// CO3: Arrow function + Array.find
const decodeHTML = str => {
  // CO3: object literal + method
  const map = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#039;': "'" };
  return str.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, m => map[m]);
};

/* ════════════════════════════════════════════════════
   CO5: ES6 MODULES — Export/Import pattern
   (Demonstrating module pattern within the same file)
════════════════════════════════════════════════════ */
// CO5: Named export-style pattern (used as module)
export const Utils = {
  // CO3: Arrow functions as object methods
  formatDate: (ts) => new Date(ts).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
  clamp:      (val, min, max) => Math.min(Math.max(val, min), max),
  pctToGrade: (p) => p >= 90 ? 'A+' : p >= 80 ? 'A' : p >= 70 ? 'B' : p >= 60 ? 'C' : 'F',
  // CO3: Arrow function with template literal
  initials:   (name) => name.split(' ').map(w => w[0]).join('').toUpperCase().substring(0, 2),
};

// CO5: Default export (module pattern)
export default { Utils, questionBank };

/* ════════════════════════════════════════════════════
   UTILITY
════════════════════════════════════════════════════ */
// CO3: Arrow function
const escHtml = str => String(str)
  .replace(/&/g,'&amp;')
  .replace(/</g,'&lt;')
  .replace(/>/g,'&gt;')
  .replace(/"/g,'&quot;');

// Expose globals for inline HTML onclick handlers
// (ES modules don't auto-expose to global scope)
Object.assign(window, {
  switchAuthTab, setMethod, togglePassword, calcStrength,
  handleLogin, handleRegister, socialLogin,
  doLogout, toggleUserMenu, closeUserMenu, toggleTheme,
  showSection, showPage,
  pickSubject, pickDiff, pickTime, pickMode, updateRange,
  launchQuiz,
  selectOpt, submitAnswer, nextQ,
  confirmQuit, closeModal, doQuit,
  renderLeaderboard, joinComp,
  backToDash,
  showToast,
});

// CO5: Fetch a fun trivia fact on page load (API integration demo)
setTimeout(fetchTriviaFact, 4000);
