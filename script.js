import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  limit,
  serverTimestamp,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBp7gQ2qWe0XgzUlavc_eQHHpj9S2enJ7s",
  authDomain: "layla-bday.firebaseapp.com",
  projectId: "layla-bday",
  storageBucket: "layla-bday.firebasestorage.app",
  messagingSenderId: "280877512621",
  appId: "1:280877512621:web:b35b10d14386cd4c729324"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const TARGET_UNLOCK = new Date("2026-06-22T00:00:00-05:00").getTime();

const lockedScreen = document.getElementById("lockedScreen");
const birthdaySite = document.getElementById("birthdaySite");
const lockedMessage = document.getElementById("lockedMessage");
const previewBtn = document.getElementById("previewBtn");
const toast = document.getElementById("toast");

const countdownEls = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
};

const reasons = [
  "You make ordinary days feel brighter.",
  "You have the kind of smile people remember.",
  "You are loyal to the people you care about.",
  "You bring fun energy wherever you go.",
  "You are stronger than you probably realize.",
  "You know how to make people laugh.",
  "You are a great teammate on and off the field.",
  "You have a heart that matters more than you know.",
  "You keep going even when things are hard.",
  "You make people feel included.",
  "You have your own unique style and personality.",
  "You are thoughtful in ways people notice.",
  "You can turn a boring moment into a memory.",
  "You are worth celebrating, not just today, but always.",
  "You are stepping into 16 with so much ahead of you.",
  "You are Layla, and that is already enough to be amazing."
];

const lockerSurprises = [
  "Birthday power-up unlocked: +16 joy points!",
  "You found a sparkle bonus. Keep shining!",
  "Locker secret: today is officially Layla Day.",
  "A tiny crowd is chanting your name right now.",
  "You unlocked unlimited birthday smiles.",
  "Sweet 16 status confirmed.",
  "Soccer-ball surprise: you are today's MVP.",
  "This locker contains one giant virtual hug.",
  "You found a golden birthday candle.",
  "A reminder: you are appreciated more than you know.",
  "Confetti boost activated.",
  "Your birthday crown has been upgraded.",
  "You found the secret goal celebration dance.",
  "This locker says: never forget how loved you are.",
  "Final-minute goal: Layla wins!",
  "Champion locker opened. Happy Sweet 16!"
];

const shotMessages = [
  "GOAL! Happy Sweet 16, Layla!",
  "Top corner shot! Birthday champion unlocked!",
  "GOOOOAL! The crowd goes wild for Layla!",
  "Perfect kick! Today belongs to you!",
  "Birthday hat trick! Three cheers for Layla!",
  "MVP finish! Level 16 has officially begun!"
];

const teamOptions = ["USA", "Barcelona", "Real Madrid", "Arsenal", "Other"];
const traitOptions = ["Kindness", "Humor", "Soccer Skills", "Friendship", "Determination"];
const reactionKeys = ["soccer", "cake", "heart", "party", "trophy"];

function pad(value) { return String(value).padStart(2, "0"); }

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2600);
}

function updateCountdown() {
  const distance = TARGET_UNLOCK - Date.now();
  if (distance <= 0) {
    unlockSite();
    return;
  }
  countdownEls.days.textContent = pad(Math.floor(distance / (1000 * 60 * 60 * 24)));
  countdownEls.hours.textContent = pad(Math.floor((distance / (1000 * 60 * 60)) % 24));
  countdownEls.minutes.textContent = pad(Math.floor((distance / (1000 * 60)) % 60));
  countdownEls.seconds.textContent = pad(Math.floor((distance / 1000) % 60));
}

function unlockSite() {
  lockedScreen.classList.add("hidden");
  birthdaySite.classList.remove("hidden");
  launchConfetti(220);
  window.setTimeout(() => showToast("⚽ Happy Sweet 16, Layla!"), 500);
}

previewBtn.addEventListener("click", () => {
  if (TARGET_UNLOCK - Date.now() <= 0) return unlockSite();
  lockedMessage.textContent = "The stadium doors are still locked. Come back at midnight!";
  showToast("Locked until June 23, 2026 at 12:00 AM.");
});
setInterval(updateCountdown, 1000);
updateCountdown();

function buildReasons() {
  const grid = document.getElementById("reasonGrid");
  reasons.forEach((reason, index) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "flip-card";
    card.innerHTML = `<span class="flip-inner"><span class="flip-face"><strong>#${index + 1}</strong><br>Tap to reveal ⚽</span><span class="flip-face flip-back">${reason}</span></span>`;
    card.addEventListener("click", () => card.classList.toggle("flipped"));
    grid.appendChild(card);
  });
}

function buildLockers() {
  const grid = document.getElementById("lockerGrid");
  lockerSurprises.forEach((surprise, index) => {
    const locker = document.createElement("button");
    locker.type = "button";
    locker.className = "locker";
    locker.innerHTML = `<span><span class="door">🎁</span>Locker ${index + 1}</span>`;
    locker.addEventListener("click", () => {
      locker.classList.add("opened");
      locker.innerHTML = `<span>${escapeHTML(surprise)}</span>`;
      if (index === 15) launchConfetti(80);
    });
    grid.appendChild(locker);
  });
}

function buildHiddenBalls() {
  const field = document.getElementById("hiddenBalls");
  const countText = document.getElementById("soccerCount");
  const progress = document.getElementById("soccerProgress");
  const positions = [[4,9],[16,72],[25,25],[36,82],[48,13],[58,55],[70,21],[83,78],[90,35],[12,43],[31,59],[44,39],[66,87],[76,48],[88,10],[5,88]];
  let found = 0;
  positions.forEach(([left, top], index) => {
    const ball = document.createElement("button");
    ball.type = "button";
    ball.className = "secret-ball";
    ball.style.left = `${left}%`;
    ball.style.top = `${top}%`;
    ball.setAttribute("aria-label", `Hidden soccer ball ${index + 1}`);
    ball.textContent = "⚽";
    ball.addEventListener("click", () => {
      if (ball.classList.contains("found")) return;
      ball.classList.add("found");
      found += 1;
      countText.textContent = `${found} / 16 found`;
      progress.style.width = `${(found / 16) * 100}%`;
      showToast(`Secret soccer ball found: ${found}/16`);
      if (found === 16) {
        showToast("🏆 You found every soccer ball. Champion status unlocked!");
        launchConfetti(180);
      }
    });
    field.appendChild(ball);
  });
}

function setupPenaltyKick() {
  const shootBtn = document.getElementById("shootBtn");
  const ball = document.getElementById("ball");
  const result = document.getElementById("shotResult");
  shootBtn.addEventListener("click", () => {
    ball.classList.remove("shoot");
    void ball.offsetWidth;
    ball.classList.add("shoot");
    const message = shotMessages[Math.floor(Math.random() * shotMessages.length)];
    window.setTimeout(() => {
      result.textContent = message;
      launchConfetti(45);
    }, 550);
  });
}

function clean(value, max = 220) {
  return String(value || "").trim().replace(/\s+/g, " ").slice(0, max);
}

function escapeHTML(value) {
  return String(value || "")
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

async function addEntry(collectionName, data, successMessage) {
  await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: serverTimestamp()
  });
  showToast(successMessage);
  launchConfetti(30);
}

function listenCards(collectionName, containerId, emptyText, countId, formatter) {
  const container = document.getElementById(containerId);
  const count = document.getElementById(countId);
  const q = query(collection(db, collectionName), orderBy("createdAt", "desc"), limit(60));
  onSnapshot(q, (snapshot) => {
    if (count) count.textContent = snapshot.size;
    container.innerHTML = "";
    if (snapshot.empty) {
      container.innerHTML = `<div class="message-card"><strong>No entries yet</strong><p>${escapeHTML(emptyText)}</p></div>`;
      return;
    }
    snapshot.forEach((docSnap) => {
      const card = document.createElement("div");
      card.className = "message-card";
      card.innerHTML = formatter(docSnap.data());
      container.appendChild(card);
    });
  }, (error) => showToast(`Could not load ${collectionName}: ${error.message}`));
}

function listenWordCloud() {
  const container = document.getElementById("wordCloud");
  const count = document.getElementById("wordCount");
  const q = query(collection(db, "oneWords"), orderBy("createdAt", "desc"), limit(100));
  onSnapshot(q, (snapshot) => {
    count.textContent = snapshot.size;
    const totals = {};
    snapshot.forEach((docSnap) => {
      const word = clean(docSnap.data().word, 24);
      if (!word) return;
      const key = word.toLowerCase();
      totals[key] = { word, count: (totals[key]?.count || 0) + 1 };
    });
    container.innerHTML = "";
    const words = Object.values(totals).sort((a, b) => b.count - a.count);
    if (!words.length) {
      container.innerHTML = `<span class="word-pill">No words yet</span>`;
      return;
    }
    words.forEach(({ word, count }) => {
      const span = document.createElement("span");
      span.className = "word-pill";
      span.style.fontSize = `${1 + Math.min(count, 5) * 0.18}rem`;
      span.textContent = count > 1 ? `${word} ×${count}` : word;
      container.appendChild(span);
    });
  }, (error) => showToast(`Could not load word wall: ${error.message}`));
}

function setupFirestoreForms() {
  bindForm("guestbookForm", () => ({
    name: clean(document.getElementById("guestName").value, 40),
    message: clean(document.getElementById("guestMessage").value, 220)
  }), "messages", "Birthday message added!");

  bindForm("awesomeForm", () => ({
    name: clean(document.getElementById("awesomeName").value, 40),
    text: clean(document.getElementById("awesomeText").value, 180)
  }), "awesomeNotes", "Awesome note added!");

  bindForm("wordForm", () => ({
    name: clean(document.getElementById("wordName").value, 40),
    word: clean(document.getElementById("oneWord").value, 24)
  }), "oneWords", "Word added!");

  bindForm("adviceForm", () => ({
    name: clean(document.getElementById("adviceName").value, 40),
    advice: clean(document.getElementById("adviceText").value, 220)
  }), "advice", "Advice added!");

  bindForm("timeCapsuleForm", () => ({
    name: clean(document.getElementById("timeName").value, 40),
    prediction: clean(document.getElementById("timeText").value, 220)
  }), "timeCapsule", "Time capsule prediction added!");
}

function bindForm(formId, readData, collectionName, successMessage) {
  const form = document.getElementById(formId);
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = readData();
    if (Object.values(data).some(value => !value)) return showToast("Please fill out every field first.");
    try {
      await addEntry(collectionName, data, successMessage);
      form.reset();
    } catch (error) {
      showToast(`Could not save: ${error.message}`);
    }
  });
}

async function ensureDoc(path, seedData) {
  const ref = doc(db, ...path);
  const snap = await getDoc(ref);
  if (!snap.exists()) await setDoc(ref, seedData);
  return ref;
}

async function setupReactions() {
  const ref = await ensureDoc(["siteStats", "reactions"], Object.fromEntries(reactionKeys.map(key => [key, 0])));
  onSnapshot(ref, (snap) => {
    const data = snap.data() || {};
    reactionKeys.forEach((key) => {
      const el = document.getElementById(`reaction-${key}`);
      if (el) el.textContent = data[key] || 0;
    });
  });
  document.querySelectorAll(".reaction-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const key = btn.dataset.reaction;
      await updateDoc(ref, { [key]: increment(1) });
      showToast("Reaction sent!");
    });
  });
}

async function setupPoll(id, pollName, options) {
  const container = document.getElementById(id);
  const ref = await ensureDoc(["polls", pollName], Object.fromEntries(options.map(option => [option, 0])));

  onSnapshot(ref, (snap) => {
    const data = snap.data() || {};
    const total = options.reduce((sum, option) => sum + (data[option] || 0), 0);
    container.innerHTML = "";
    options.forEach((option) => {
      const votes = data[option] || 0;
      const percent = total ? Math.round((votes / total) * 100) : 0;
      const wrap = document.createElement("div");
      wrap.className = "vote-row";
      wrap.innerHTML = `
        <button type="button" data-option="${escapeHTML(option)}">${escapeHTML(option)}</button>
        <div class="vote-bar"><span style="width:${percent}%"></span></div>
        <small>${votes} vote${votes === 1 ? "" : "s"} • ${percent}%</small>
      `;
      wrap.querySelector("button").addEventListener("click", async () => {
        await updateDoc(ref, { [option]: increment(1) });
        showToast("Vote counted!");
      });
      container.appendChild(wrap);
    });
  });
}

function setupLiveListeners() {
  listenCards("messages", "guestbookMessages", "Be the first to leave Layla a Sweet 16 note.", "messageCount", data => `<strong>${escapeHTML(data.name)}</strong><p>${escapeHTML(data.message)}</p>`);
  listenCards("awesomeNotes", "awesomeMessages", "Be the first to say what makes Layla awesome.", "awesomeCount", data => `<strong>${escapeHTML(data.name)}</strong><p>${escapeHTML(data.text)}</p>`);
  listenCards("advice", "adviceMessages", "Be the first to give birthday advice.", "adviceCount", data => `<strong>${escapeHTML(data.name)}</strong><p>${escapeHTML(data.advice)}</p>`);
  listenCards("timeCapsule", "timeCapsuleMessages", "Be the first to predict Layla's future.", null, data => `<strong>${escapeHTML(data.name)}</strong><p>${escapeHTML(data.prediction)}</p>`);
  listenWordCloud();
}

function setupButtons() {
  document.getElementById("celebrateBtn").addEventListener("click", () => launchConfetti(160));
  document.getElementById("chantBtn").addEventListener("click", () => showToast("🎶 Lay-la! Lay-la! Sweet 16 MVP! 🎶"));
  document.getElementById("topBtn").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");
let confetti = [];
function sizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.addEventListener("resize", sizeCanvas);
sizeCanvas();

function launchConfetti(amount = 120) {
  const colors = ["#ff4fa3", "#ffe370", "#37d67a", "#23c7ff", "#ffffff", "#7b3cff"];
  for (let i = 0; i < amount; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * canvas.height * 0.25,
      size: 6 + Math.random() * 9,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: 2 + Math.random() * 5,
      drift: -2 + Math.random() * 4,
      rotation: Math.random() * 360,
      spin: -8 + Math.random() * 16
    });
  }
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti = confetti.filter(piece => piece.y < canvas.height + 30);
  confetti.forEach(piece => {
    piece.y += piece.speed;
    piece.x += piece.drift;
    piece.rotation += piece.spin;
    ctx.save();
    ctx.translate(piece.x, piece.y);
    ctx.rotate(piece.rotation * Math.PI / 180);
    ctx.fillStyle = piece.color;
    ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size * 0.62);
    ctx.restore();
  });
  requestAnimationFrame(animateConfetti);
}

animateConfetti();
buildReasons();
buildLockers();
buildHiddenBalls();
setupPenaltyKick();
setupButtons();
setupFirestoreForms();
setupLiveListeners();
setupReactions().catch(error => showToast(`Reactions not ready: ${error.message}`));
setupPoll("teamPoll", "favoriteTeam", teamOptions).catch(error => showToast(`Team poll not ready: ${error.message}`));
setupPoll("traitPoll", "mvpTrait", traitOptions).catch(error => showToast(`Trait poll not ready: ${error.message}`));
