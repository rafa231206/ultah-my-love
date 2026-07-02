// =========================
// ELEMENT
// =========================

const loading = document.getElementById("loading");

const openGift = document.getElementById("openGift");

const bgMusic = document.getElementById("bgMusic");

const hearts = document.getElementById("hearts");

const cakeSection = document.getElementById("cakeSection");

const videoSection = document.getElementById("videoSection");

const gallerySection = document.getElementById("gallery");

const letterSection = document.getElementById("letter");

const replySection = document.getElementById("replySection");

const endingSection = document.getElementById("ending");


// =========================
// LOADING
// =========================

window.addEventListener("load", () => {

    setTimeout(() => {

        loading.style.opacity = "0";

        setTimeout(() => {

            loading.style.display = "none";

        }, 800);

    }, 1500);

});


// =========================
// FLOATING HEART
// =========================

function createHeart() {

    const heart = document.createElement("div");

    heart.className = "heart";

    const icons = ["❤️", "💕", "💖", "💘"];

    heart.innerHTML = icons[Math.floor(Math.random() * icons.length)];

    heart.style.left = Math.random() * 100 + "vw";

    heart.style.fontSize = (15 + Math.random() * 25) + "px";

    heart.style.animationDuration = (4 + Math.random() * 4) + "s";

    hearts.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 8000);

}

setInterval(createHeart, 350);


// =========================
// OPEN GIFT
// =========================

openGift.addEventListener("click", () => {

    bgMusic.play().catch(() => {});

    cakeSection.style.display = "block";

    cakeSection.scrollIntoView({

        behavior: "smooth"

    });

});
// =========================
// CAKE LOGIC
// =========================

const cakeButton = document.getElementById("cakeButton");

const layer1 = document.getElementById("layer1");
const layer2 = document.getElementById("layer2");
const layer3 = document.getElementById("layer3");

const cream = document.getElementById("cream");
const candle = document.getElementById("candle");
const flame = document.getElementById("flame");

let cakeStep = 0;

cakeButton.addEventListener("click", () => {

    switch (cakeStep) {

        // =====================
        // STEP 0
        // MUNCULKAN KUE
        // =====================

        case 0:

            layer1.classList.remove("hidden");

            setTimeout(() => {
                layer2.classList.remove("hidden");
            }, 500);

            setTimeout(() => {
                layer3.classList.remove("hidden");
            }, 1000);

            cakeButton.textContent = "🧁 Tambahkan Cream";

            cakeStep++;

            break;

        // =====================
        // STEP 1
        // CREAM
        // =====================

        case 1:

            cream.classList.remove("hidden");

            cakeButton.textContent = "🕯 Pasang Lilin";

            cakeStep++;

            break;

        // =====================
        // STEP 2
        // LILIN
        // =====================

        case 2:

            candle.classList.remove("hidden");

            cakeButton.textContent = "💨 Tiup Lilin";

            cakeStep++;

            break;

        // =====================
        // STEP 3
        // TIUP LILIN
        // =====================

        case 3:

            flame.style.opacity = "0";

            flame.style.transform = "scale(0)";

            showPopup("🎉 Make A Wish ❤️");

            createConfetti();

            cakeButton.textContent = "🎥 Lihat Hadiah";

            cakeStep++;

            break;

        // =====================
        // STEP 4
        // VIDEO
        // =====================

        case 4:

            videoSection.style.display = "block";

            videoSection.scrollIntoView({

                behavior: "smooth"

            });

            cakeButton.disabled = true;

            break;

    }

});
// =========================
// NAVIGATION
// =========================

const nextGallery = document.getElementById("nextGallery");
const nextLetter = document.getElementById("nextLetter");
const nextReply = document.getElementById("nextReply");
const nextEnding = document.getElementById("nextEnding");

nextGallery.addEventListener("click", () => {

    gallerySection.style.display = "block";

    gallerySection.scrollIntoView({

        behavior: "smooth"

    });

});

nextLetter.addEventListener("click", () => {

    letterSection.style.display = "block";

    letterSection.scrollIntoView({

        behavior: "smooth"

    });

});

nextReply.addEventListener("click", () => {

    replySection.style.display = "block";

    replySection.scrollIntoView({

        behavior: "smooth"

    });

});

nextEnding.addEventListener("click", () => {

    endingSection.style.display = "block";

    endingSection.scrollIntoView({

        behavior: "smooth"

    });

});
// =========================
// POPUP
// =========================

function showPopup(text) {

    const pop = document.createElement("div");

    pop.className = "pop";

    pop.textContent = text;

    document.body.appendChild(pop);

    setTimeout(() => {

        pop.remove();

    }, 2500);

}
