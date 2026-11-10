
const surpriseBtn = document.getElementById("surpriseBtn");
const popup = document.getElementById("popup");
const closeBtn = document.getElementById("closeBtn");

const blowBtn = document.getElementById("blowBtn");
const flame = document.getElementById("flame");

const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

// Open surprise
surpriseBtn.addEventListener("click", () => {
    popup.classList.add("show");
});

// Close surprise
closeBtn.addEventListener("click", () => {
    popup.classList.remove("show");
});

// Close popup by clicking outside
popup.addEventListener("click", (event) => {
    if (event.target === popup) {
        popup.classList.remove("show");
    }
});

// Blow candle
blowBtn.addEventListener("click", () => {
    if (flame.style.display !== "none") {
        flame.style.display = "none";
        blowBtn.textContent = "Candle Blown! 🎉";
    } else {
        flame.style.display = "block";
        blowBtn.textContent = "Blow the Candle 🕯️";
    }
});

// Music button
musicBtn.addEventListener("click", async () => {
    if (music.paused) {
        try {
            await music.play();
            musicBtn.textContent = "⏸ Pause Music";
        } catch (error) {
            musicBtn.textContent = "Music unavailable";
            console.error(error);
        }
    } else {
        music.pause();
        musicBtn.textContent = "🎵 Play Music";
    }
});

// Floating hearts
const heartsContainer = document.getElementById("hearts");

function createHeart() {
    const heart = document.createElement("div");

    heart.classList.add("heart");
    heart.innerHTML = "❤️";

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (Math.random() * 20 + 10) + "px";
    heart.style.animationDuration = (Math.random() * 5 + 5) + "s";

    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 10000);
}

setInterval(createHeart, 500);
