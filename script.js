/* ============================================================
   ✏️  PERSONALIZE HERE
   Everything she reads lives in this CONFIG object.
   Change the words, add photos, swap names — no other file
   needs to be touched.
   ============================================================ */
const CONFIG = {
  texts: {
    welcomeTitle: "Hey, Little Troublemaker! ❤️",
    welcomeSubtitle: "There’s something I’ve wanted to tell you, so I made this little corner of the internet just for us.",
    siteTitle: "A Sister I Found, A Bond I Choose ❤️",
    reminder: "“You don’t need my permission to live your life. You just need to know that you always have someone in your corner.”",
    brotherName: "Simar",
    sisterName: "Sana",
    signature: "Your forever Paaji.",
  },

  // Background music: drop an mp3 at assets/music.mp3 (or change the path).
  // If the file isn't there, a soft built-in music-box tune plays instead.
  musicFile: "assets/music.mp3",

  // Section 2 — each string is one paragraph. The last one is styled as a highlight.
  letter: [
    "Some people enter your life unexpectedly, and somehow become a part of it that you never want to lose. That’s what you are to me.",
    "You’re not my sister by blood, but that has never made you any less of one. You’re my little sister, my favourite headache, my partner in random conversations, and someone I can be completely myself around.",
    "You’re someone I genuinely worry about, laugh with, argue with, and want to see happy.",
    "I don’t want to be someone who controls your choices or tells you how to live. I want to be the person you can call without hesitation, tell anything without fear of judgment, and count on when life gets difficult.",
    "We might misunderstand each other, disagree, or have our little fights, but I hope we never let those things make us strangers.",
    "I didn’t get to choose you as family, but somewhere along the way, life gave me that privilege.",
    "And if there’s one thing I hope you never doubt, it’s this: You have a brother in me, not just for the good days, but for all the days.",
  ],

  // Photo scrapbook — put pictures in assets/photos/ and set `src`.
  // Leave `src` empty ("") to show a cute placeholder frame.
  photos: [
    { src: "", caption: "that one random day", emoji: "📸" },
    { src: "", caption: "us being silly", emoji: "🤪" },
    { src: "", caption: "festival vibes", emoji: "🪔" },
    { src: "", caption: "chai & gossip", emoji: "☕" },
    { src: "", caption: "the blurry one we love", emoji: "🌀" },
    { src: "", caption: "add your fav here", emoji: "💗" },
  ],

  // Section 3 — front is what she sees first, back is revealed on tap.
  memories: [
    { emoji: "💬", title: "Our random conversations", back: "Starting at ‘hey, quick question’ and ending three hours later somewhere completely different.", color: "#f8c8d4" },
    { emoji: "😤", title: "The silly arguments", back: "Where we both know you’re wrong… but I let you win anyway. Sometimes. 😌", color: "#ffd9c2" },
    { emoji: "😜", title: "The endless teasing", back: "It’s my official job as Paaji. I take it very seriously.", color: "#e3d7f5" },
    { emoji: "🌙", title: "The serious late-night talks", back: "The ones where the jokes stop for a bit and we actually say what’s on our minds.", color: "#fde2c8" },
    { emoji: "🫶", title: "Understanding without explaining", back: "One look, one ‘hmm’, one emoji — and somehow we both just get it.", color: "#fbd3de" },
    { emoji: "✨", title: "The little moments", back: "The tiny, ordinary ones that turn out to mean more than they seem.", color: "#e8def8" },
  ],

  // Section 4
  promises: [
    "I’ll always respect your individuality and choices.",
    "I’ll listen without judging.",
    "I’ll be honest, even when conversations are difficult.",
    "I’ll celebrate your happiness and support your growth.",
    "I’ll never let a small misunderstanding erase the value of our bond.",
  ],

  // Section 7 — the letter inside the envelope. The last one is a highlight.
  finalLetter: [
    "Whenever life gets overwhelming, whenever you feel alone, or whenever you just need someone to listen, remember that you’ve got me.",
    "Keep growing, keep smiling, keep making questionable decisions (occasionally 😂), and never stop being you.",
    "Love you, little troublemaker. ❤️",
  ],
};

/* ============================================================
   You shouldn't need to edit below this line.
   ============================================================ */
const $ = (s, el = document) => el.querySelector(s);
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Fill content from CONFIG ---------- */
document.querySelectorAll("[data-text]").forEach((el) => {
  const v = CONFIG.texts[el.dataset.text];
  if (v) el.textContent = v;
});

function paragraphs(container, list) {
  list.forEach((t, i) => {
    const p = document.createElement("p");
    p.textContent = t;
    if (i === list.length - 1) p.classList.add("highlight");
    container.appendChild(p);
  });
}
paragraphs($("#letterBody"), CONFIG.letter);
paragraphs($("#finalBody"), CONFIG.finalLetter);

// Polaroids
const tilts = [-3, 2, -1.5, 3, -2.5, 1.5];
CONFIG.photos.forEach((ph, i) => {
  const fig = document.createElement("figure");
  fig.className = "polaroid reveal";
  fig.style.setProperty("--tilt", tilts[i % tilts.length] + "deg");
  fig.tabIndex = 0;
  const box = document.createElement("div");
  box.className = "photo";
  if (ph.src) {
    const img = document.createElement("img");
    img.src = ph.src;
    img.alt = ph.caption;
    img.loading = "lazy";
    box.appendChild(img);
  } else {
    box.innerHTML = `<span><span class="ph-emoji">${ph.emoji || "📷"}</span>photo goes here</span>`;
  }
  const cap = document.createElement("figcaption");
  cap.textContent = ph.caption;
  fig.append(box, cap);
  $("#polaroids").appendChild(fig);
});

// Flip cards
CONFIG.memories.forEach((m) => {
  const b = document.createElement("button");
  b.className = "flip reveal";
  b.type = "button";
  b.setAttribute("aria-pressed", "false");
  b.style.setProperty("--c", m.color);
  b.innerHTML = `
    <span class="flip-inner">
      <span class="face face-front">
        <span class="emo" aria-hidden="true">${m.emoji}</span>
        <h3></h3>
        <span class="tap">tap to flip</span>
      </span>
      <span class="face face-back"></span>
    </span>`;
  $("h3", b).textContent = m.title;
  $(".face-back", b).textContent = m.back;
  b.addEventListener("click", (e) => {
    const on = b.classList.toggle("flipped");
    b.setAttribute("aria-pressed", String(on));
    if (on) burst(e.clientX, e.clientY, 6);
  });
  $("#flipGrid").appendChild(b);
});

// Promises
CONFIG.promises.forEach((t, i) => {
  const li = document.createElement("li");
  li.className = "promise";
  li.tabIndex = 0;
  li.setAttribute("role", "button");
  li.setAttribute("aria-pressed", "false");
  li.style.transitionDelay = `${i * 0.12}s`;
  li.innerHTML = `<span class="num">${i + 1}</span><p></p><span class="seal" aria-hidden="true">🤞</span>`;
  $("p", li).textContent = t;
  const seal = (e) => {
    const on = li.classList.toggle("sealed");
    li.setAttribute("aria-pressed", String(on));
    if (on) {
      const r = li.getBoundingClientRect();
      burst(e.clientX || r.right - 30, e.clientY || r.top + r.height / 2, 8);
    }
    updatePromiseHint();
  };
  li.addEventListener("click", seal);
  li.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); seal(e); }
  });
  $("#promiseList").appendChild(li);
});
const promiseHint = document.createElement("p");
promiseHint.className = "promise-hint";
$("#promiseList").after(promiseHint);
function updatePromiseHint() {
  const n = document.querySelectorAll(".promise.sealed").length;
  const total = CONFIG.promises.length;
  promiseHint.textContent =
    n === 0 ? "Tap each promise to pinky-seal it 🤞"
    : n < total ? `${n} of ${total} sealed… keep going 💗`
    : "All sealed. No take-backs now 😌❤️";
  if (n === total) {
    for (let k = 0; k < 4; k++) setTimeout(() => burst(innerWidth / 2, innerHeight / 2, 10), k * 180);
  }
}
updatePromiseHint();

/* ---------- Floating hearts & sparkles ---------- */
const sky = $(".sky");
const floaties = ["💗", "💕", "🤍", "💜", "🧡", "✨", "🌸", "🎀"];
function spawnFloaty() {
  if (document.hidden) return;
  const s = document.createElement("span");
  s.className = "floaty";
  s.textContent = floaties[Math.floor(Math.random() * floaties.length)];
  s.style.left = Math.random() * 100 + "vw";
  s.style.fontSize = 12 + Math.random() * 16 + "px";
  s.style.setProperty("--drift", (Math.random() * 80 - 40).toFixed(0) + "px");
  const dur = 9 + Math.random() * 8;
  s.style.animationDuration = dur + "s";
  sky.appendChild(s);
  setTimeout(() => s.remove(), dur * 1000);
}
if (!reduceMotion) {
  for (let i = 0; i < 14; i++) {
    const sp = document.createElement("span");
    sp.className = "sparkle";
    sp.style.left = Math.random() * 100 + "vw";
    sp.style.top = Math.random() * 100 + "vh";
    sp.style.animationDelay = (Math.random() * 3).toFixed(2) + "s";
    sky.appendChild(sp);
  }
  setInterval(spawnFloaty, window.innerWidth < 600 ? 1400 : 900);
  for (let i = 0; i < 5; i++) setTimeout(spawnFloaty, i * 300);
}

function burst(x, y, count = 8) {
  if (reduceMotion) return;
  const icons = ["💗", "✨", "💕", "🌸"];
  for (let i = 0; i < count; i++) {
    const b = document.createElement("span");
    b.className = "burst";
    b.textContent = icons[i % icons.length];
    const a = (Math.PI * 2 * i) / count + Math.random() * 0.5;
    const d = 40 + Math.random() * 40;
    b.style.left = x + "px";
    b.style.top = y + "px";
    b.style.setProperty("--dx", Math.cos(a) * d + "px");
    b.style.setProperty("--dy", Math.sin(a) * d + "px");
    document.body.appendChild(b);
    setTimeout(() => b.remove(), 950);
  }
}

/* ---------- Welcome → open surprise ---------- */
$("#openSurprise").addEventListener("click", (e) => {
  burst(e.clientX, e.clientY, 12);
  $("#welcome").classList.add("gone");
  $("#welcome").setAttribute("aria-hidden", "true");
  document.body.classList.remove("locked");
  $("#main").removeAttribute("aria-hidden");
  window.scrollTo(0, 0);
  setTimeout(() => $(".hero .title").focus?.(), 900);
});

/* ---------- Scroll reveals ---------- */
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target;
      el.classList.add("in");
      if (el.id === "letterBody") revealLetter();
      io.unobserve(el);
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
);
document.querySelectorAll(".reveal, .promise, .bond, #letterBody").forEach((el) => io.observe(el));

function revealLetter() {
  const ps = document.querySelectorAll("#letterBody p");
  ps.forEach((p, i) => setTimeout(() => p.classList.add("show"), reduceMotion ? 0 : i * 650));
}

/* ---------- Envelope ---------- */
const envelope = $("#envelope");
const finalLetter = $("#finalLetter");
function openEnvelope(e) {
  if (envelope.classList.contains("open")) {
    finalLetter.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  envelope.classList.add("open");
  envelope.setAttribute("aria-expanded", "true");
  $("#envHint").textContent = "It’s for you 💗";
  const r = envelope.getBoundingClientRect();
  burst(e.clientX || r.left + r.width / 2, e.clientY || r.top + r.height / 2, 14);
  setTimeout(() => {
    finalLetter.hidden = false;
    finalLetter.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    for (let k = 0; k < 10; k++) setTimeout(spawnFloaty, k * 120);
  }, reduceMotion ? 0 : 1300);
}
function closeEnvelope() {
  finalLetter.hidden = true;
  envelope.classList.remove("open");
  envelope.setAttribute("aria-expanded", "false");
  $("#envHint").textContent = "Tap the envelope 💌";
  envelope.scrollIntoView({ behavior: "smooth", block: "center" });
}
envelope.addEventListener("click", openEnvelope);
$("#closeFinal").addEventListener("click", closeEnvelope);
$("#replayBtn").addEventListener("click", () => {
  document.querySelectorAll("#letterBody p").forEach((p) => p.classList.remove("show"));
  $("#letter").scrollIntoView({ behavior: "smooth" });
  setTimeout(revealLetter, 700);
});
$("#toTop").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

/* ---------- Music (optional, off by default) ---------- */
const musicBtn = $("#musicBtn");
const audio = $("#bgMusic");
let playing = false;
let useSynth = false;
let synth = null;

// A gentle music-box loop made with the Web Audio API (no file needed).
function createSynth() {
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return null;
  const ctx = new Ctx();
  const master = ctx.createGain();
  master.gain.value = 0.0;
  master.connect(ctx.destination);
  // Simple, sweet melody in C major (note frequencies in Hz, 0 = rest)
  const N = { C4: 261.6, D4: 293.7, E4: 329.6, F4: 349.2, G4: 392, A4: 440, B4: 493.9, C5: 523.3, D5: 587.3, E5: 659.3, G5: 784 };
  const melody = [
    "E5","D5","C5","G4", "A4","C5","G4","0",
    "E4","G4","C5","D5", "E5","D5","C5","0",
    "C5","E5","G5","E5", "D5","C5","A4","0",
    "F4","A4","G4","E4", "D4","E4","C4","0",
  ];
  const bass = ["C4","C4","A4","A4","F4","F4","G4","G4"];
  const step = 0.42;
  let next = ctx.currentTime + 0.1;
  let i = 0;
  let timer = null;

  function bell(freq, t, vol = 0.18, len = 1.6) {
    [1, 2, 3].forEach((h, k) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.value = freq * h;
      const v = vol / (k * 2.5 + 1);
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(v, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + len / h);
      o.connect(g).connect(master);
      o.start(t);
      o.stop(t + len);
    });
  }
  function schedule() {
    while (next < ctx.currentTime + 0.6) {
      const n = melody[i % melody.length];
      if (n !== "0") bell(N[n], next);
      if (i % 4 === 0) bell(N[bass[(i / 4) % bass.length]] / 2, next, 0.12, 2.4);
      next += step;
      i++;
    }
  }
  return {
    play() {
      ctx.resume();
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.8);
      next = Math.max(next, ctx.currentTime + 0.05);
      schedule();
      timer = setInterval(schedule, 200);
    },
    pause() {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);
      clearInterval(timer);
      setTimeout(() => { if (!playing) ctx.suspend(); }, 500);
    },
  };
}

function setPlaying(on) {
  playing = on;
  musicBtn.setAttribute("aria-pressed", String(on));
  musicBtn.setAttribute("aria-label", on ? "Pause background music" : "Play background music");
  $(".music-label", musicBtn).textContent = on ? "Pause" : "Music";
}

async function toggleMusic() {
  if (playing) {
    useSynth ? synth?.pause() : audio.pause();
    setPlaying(false);
    return;
  }
  if (!useSynth) {
    try {
      if (!audio.src) audio.src = CONFIG.musicFile;
      audio.volume = 0.45;
      await audio.play();
      setPlaying(true);
      return;
    } catch {
      useSynth = true; // file missing or blocked → fall back to music box
    }
  }
  synth = synth || createSynth();
  if (synth) { synth.play(); setPlaying(true); }
}
audio.addEventListener("error", () => {
  if (!useSynth) {
    useSynth = true;
    if (playing) { synth = synth || createSynth(); synth?.play(); }
  }
});
musicBtn.addEventListener("click", toggleMusic);
