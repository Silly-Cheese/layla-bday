const TARGET_UNLOCK = new Date("2026-06-23T00:00:00-05:00").getTime();

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

function pad(value) {
  return String(value).padStart(2, "0");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2600);
}

function updateCountdown() {
  const now = Date.now();
  const distance = TARGET_UNLOCK - now;

  if (distance <= 0) {
    unlockSite();
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  countdownEls.days.textContent = pad(days);
  countdownEls.hours.textContent = pad(hours);
  countdownEls.minutes.textContent = pad(minutes);
  countdownEls.seconds.textContent = pad(seconds);
}

function unlockSite() {
  lockedScreen.classList.add("hidden");
  birthdaySite.classList.remove("hidden");
  launchConfetti(220);
  window.setTimeout(() => showToast("⚽ Happy Sweet 16, Layla!"), 500);
}

previewBtn.addEventListener("click", () => {
  const distance = TARGET_UNLOCK - Date.now();
  if (distance <= 0) {
    unlockSite();
    return;
  }
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
    card.innerHTML = `
      <span class="flip-inner">
        <span class="flip-face"><strong>#${index + 1}</strong><br>Tap to reveal ⚽</span>
        <span class="flip-face flip-back">${reason}</span>
      </span>
    `;
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
      locker.innerHTML = `<span>${surprise}</span>`;
      if (index === 15) launchConfetti(80);
    });
    grid.appendChild(locker);
  });
}

function buildHiddenBalls() {
  const field = document.getElementById("hiddenBalls");
  const countText = document.getElementById("soccerCount");
  const progress = document.getElementById("soccerProgress");
  const positions = [
    [4, 9], [16, 72], [25, 25], [36, 82], [48, 13], [58, 55], [70, 21], [83, 78],
    [90, 35], [12, 43], [31, 59], [44, 39], [66, 87], [76, 48], [88, 10], [5, 88]
  ];
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

function setupGuestbook() {
  const form = document.getElementById("guestbookForm");
  const nameInput = document.getElementById("guestName");
  const messageInput = document.getElementById("guestMessage");
  const container = document.getElementById("guestbookMessages");
  const key = "laylaSweet16Guestbook";

  function getMessages() {
    try {
      return JSON.parse(localStorage.getItem(key)) || [];
    } catch {
      return [];
    }
  }

  function saveMessages(messages) {
    localStorage.setItem(key, JSON.stringify(messages));
  }

  function render() {
    const messages = getMessages();
    container.innerHTML = "";
    if (!messages.length) {
      container.innerHTML = `<div class="message-card"><strong>No messages yet</strong><p>Be the first to leave Layla a Sweet 16 note.</p></div>`;
      return;
    }
    messages.slice().reverse().forEach((entry) => {
      const card = document.createElement("div");
      card.className = "message-card";
      const safeName = escapeHTML(entry.name);
      const safeMsg = escapeHTML(entry.message);
      card.innerHTML = `<strong>${safeName}</strong><p>${safeMsg}</p>`;
      container.appendChild(card);
    });
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = nameInput.value.trim();
    const message = messageInput.value.trim();
    if (!name || !message) return;
    const messages = getMessages();
    messages.push({ name, message, createdAt: new Date().toISOString() });
    saveMessages(messages);
    form.reset();
    render();
    showToast("Birthday note added!");
  });

  render();
}

function escapeHTML(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function setupButtons() {
  document.getElementById("celebrateBtn").addEventListener("click", () => launchConfetti(160));
  document.getElementById("chantBtn").addEventListener("click", () => {
    showToast("🎶 Lay-la! Lay-la! Sweet 16 MVP! 🎶");
  });
  document.getElementById("topBtn").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");
let confetti = [];

function sizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
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
setupGuestbook();
setupButtons();
