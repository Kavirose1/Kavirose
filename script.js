const surpriseBtn = document.getElementById("surpriseBtn");
const popup = document.getElementById("popup");
const closeBtn = document.getElementById("closeBtn");
const blowBtn = document.getElementById("blowBtn");
const flame = document.getElementById("flame");
const music = document.getElementById("music");// Automatically try to play music
window.addEventListener("load", () => {
    music.volume = 0.7;

    music.play().catch(() => {
        console.log("Autoplay blocked. Waiting for a tap.");
    });
});

// Start music when she taps anywhere
function startMusic() {
    if (music.paused) {
        music.play().then(() => {
            musicBtn.textContent = "⏸ Pause Music";
        }).catch(error => {
            console.log(error);
        });
    }

    document.removeEventListener("click", startMusic);
    document.removeEventListener("touchstart", startMusic);
}

document.addEventListener("click", startMusic);
document.addEventListener("touchstart", startMusic);
const musicBtn = document.getElementById("musicBtn");
const giftBox = document.getElementById("giftBox");
const promiseCard = document.getElementById("promiseCard");
const promiseBtn = document.getElementById("promiseBtn");
const loveBtn = document.getElementById("loveBtn");
const promiseResponse = document.getElementById("promiseResponse");
const heartsContainer = document.getElementById("hearts");
const sparklesContainer = document.getElementById("sparkles");

surpriseBtn?.addEventListener("click", () => popup?.classList.add("show"));
closeBtn?.addEventListener("click", () => popup?.classList.remove("show"));
popup?.addEventListener("click", event => {
  if (event.target === popup) popup.classList.remove("show");
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape") popup?.classList.remove("show");
});

blowBtn?.addEventListener("click", () => {
  const blown = flame.style.display === "none";
  flame.style.display = blown ? "block" : "none";
  blowBtn.textContent = blown ? "Blow the Candle 🕯️" : "Candle Blown! 🎉";
  if (!blown) launchConfetti();
});

musicBtn?.addEventListener("click", async () => {
  if (!music) return;
  if (music.paused) {
    try {
      await music.play();
      musicBtn.textContent = "⏸ Pause Music";
    } catch (error) {
      musicBtn.textContent = "Music file missing";
      console.warn("Add your audio file at music/song.mp3", error);
    }
  } else {
    music.pause();
    musicBtn.textContent = "🎵 Play Music";
  }
});

giftBox?.addEventListener("click", () => {
  giftBox.classList.add("opened");
  promiseCard.classList.add("show");
  promiseCard.setAttribute("aria-hidden", "false");
  giftBox.setAttribute("aria-expanded", "true");
  window.setTimeout(() => promiseCard.scrollIntoView({behavior:"smooth", block:"center"}), 250);
  launchConfetti();
});

function respond(message) {
  promiseResponse.textContent = message;
  launchConfetti();
}
promiseBtn?.addEventListener("click", () => respond("A promise sealed with love… I’ll cherish you and our future, always. 💍❤️"));
loveBtn?.addEventListener("click", () => respond("My heart is yours. Here’s to our forever and the beautiful life we’ll build. 💖"));

function createHeart() {
  if (!heartsContainer) return;
  const heart = document.createElement("span");
  heart.className = "heart";
  heart.textContent = ["❤️","💗","💕","💖","♡"][Math.floor(Math.random()*5)];
  heart.style.left = Math.random()*100 + "vw";
  heart.style.fontSize = (Math.random()*18+12) + "px";
  heart.style.animationDuration = (Math.random()*5+5) + "s";
  heartsContainer.appendChild(heart);
  window.setTimeout(() => heart.remove(), 10000);
}
window.setInterval(createHeart, 650);

function createSparkle() {
  if (!sparklesContainer) return;
  const sparkle = document.createElement("span");
  sparkle.className = "sparkle";
  sparkle.textContent = ["✦","✧","⋆","✨"][Math.floor(Math.random()*4)];
  sparkle.style.left = Math.random()*100 + "vw";
  sparkle.style.bottom = (Math.random()*10) + "vh";
  sparkle.style.animationDuration = (Math.random()*2+3) + "s";
  sparklesContainer.appendChild(sparkle);
  window.setTimeout(() => sparkle.remove(), 5000);
}
window.setInterval(createSparkle, 900);

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, {threshold: 0.12});
document.querySelectorAll(".reveal").forEach(section => revealObserver.observe(section));

function launchConfetti() {
  const colors = ["#e75480","#ffd166","#fff0f5","#c084fc","#fb7185"];
  for (let i=0;i<70;i++) {
    const piece = document.createElement("i");
    piece.style.position = "fixed";
    piece.style.zIndex = "1500";
    piece.style.pointerEvents = "none";
    piece.style.left = (Math.random()*100) + "vw";
    piece.style.top = "-15px";
    piece.style.width = (Math.random()*7+4) + "px";
    piece.style.height = (Math.random()*10+5) + "px";
    piece.style.background = colors[Math.floor(Math.random()*colors.length)];
    piece.style.borderRadius = Math.random() > .5 ? "50%" : "2px";
    piece.style.opacity = "0.95";
    const duration = Math.random()*2+2;
    piece.animate([
      {transform:"translate3d(0,0,0) rotate(0deg)",opacity:1},
      {transform:`translate3d(${Math.random()*220-110}px,${window.innerHeight+40}px,0) rotate(${Math.random()*720}deg)`,opacity:0.1}
    ], {duration:duration*1000,easing:"cubic-bezier(.2,.7,.3,1)"});
    document.body.appendChild(piece);
    window.setTimeout(()=>piece.remove(), duration*1000+100);
  }
}
