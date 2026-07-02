// ==========================================
// HAPPY BIRTHDAY PROJECT
// SCRIPT.JS
// BAGIAN 1
// ==========================================

// ==========================================
// ELEMENT
// ==========================================

const loading = document.getElementById("loading");
const hearts = document.getElementById("hearts");
const bgMusic = document.getElementById("bgMusic");

const openGift = document.getElementById("openGift");

const cakeSection = document.getElementById("cakeSection");
const videoSection = document.getElementById("videoSection");
const gallerySection = document.getElementById("gallery");
const letterSection = document.getElementById("letter");
const replySection = document.getElementById("replySection");
const endingSection = document.getElementById("ending");

const cakeButton = document.getElementById("cakeButton");

const layer1 = document.getElementById("layer1");
const layer2 = document.getElementById("layer2");
const layer3 = document.getElementById("layer3");

const cream = document.getElementById("cream");
const candle = document.getElementById("candle");
const flame = document.getElementById("flame");

// ==========================================
// LOADING
// ==========================================

window.addEventListener("load", () => {

    setTimeout(() => {

        loading.style.opacity = "0";

        setTimeout(() => {

            loading.style.display = "none";

        }, 800);

    }, 1500);

});

// ==========================================
// FLOATING HEART
// ==========================================

function createHeart() {

    const heart = document.createElement("div");

    const emoji = ["❤️", "💖", "💕", "💘"];

    heart.className = "heart";

    heart.innerHTML = emoji[Math.floor(Math.random() * emoji.length)];

    heart.style.left = Math.random() * 100 + "vw";

    heart.style.fontSize = (15 + Math.random() * 20) + "px";

    heart.style.animationDuration = (4 + Math.random() * 4) + "s";

    hearts.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 8000);

}

setInterval(createHeart, 350);

// ==========================================
// OPEN GIFT
// ==========================================

openGift.addEventListener("click", () => {

    bgMusic.play().catch(() => {});

    cakeSection.style.display = "block";

    cakeSection.scrollIntoView({

        behavior: "smooth"

    });

});

// ==========================================
// CAKE STEP
// ==========================================

let cakeStep = 0;

cakeButton.addEventListener("click", () => {

    switch (cakeStep) {

        // STEP 1
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

        // STEP 2
        case 1:

            cream.classList.remove("hidden");

            cakeButton.textContent = "🕯 Pasang Lilin";

            cakeStep++;

            break;

        // STEP 3
        case 2:

            candle.classList.remove("hidden");

            cakeButton.textContent = "💨 Tiup Lilin";

            cakeStep++;

            break;
                    // ==========================
        // STEP 4 - TIUP LILIN
        // ==========================

        case 3:

            flame.style.opacity = "0";

            flame.style.transform = "translateX(-50%) scale(0)";

            showPopup("🎉 Make A Wish ❤️");

            createConfetti();

            cakeButton.textContent = "🎥 Lihat Hadiah";

            cakeStep++;

            break;

        // ==========================
        // STEP 5 - VIDEO
        // ==========================

        case 4:

            videoSection.style.display = "block";

            videoSection.scrollIntoView({

                behavior: "smooth"

            });

            cakeButton.disabled = true;

            cakeStep++;

            break;

    }

});

// ==========================================
// POPUP
// ==========================================

function showPopup(text){

    const popup = document.createElement("div");

    popup.className = "pop";

    popup.textContent = text;

    document.body.appendChild(popup);

    setTimeout(() => {

        popup.remove();

    },2500);

}

// ==========================================
// CONFETTI
// ==========================================

const canvas = document.getElementById("confetti");

const ctx = canvas.getContext("2d");

let particles = [];

let animationId = null;

function resizeCanvas(){

    canvas.width = window.innerWidth;

    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize",resizeCanvas);

function createConfetti(){

    particles = [];

    for(let i=0;i<180;i++){

        particles.push({

            x:Math.random()*canvas.width,

            y:Math.random()*-canvas.height,

            r:Math.random()*5+2,

            speed:Math.random()*4+2,

            color:[
                "#ff4f92",
                "#ff8fab",
                "#ffd1dc",
                "#ffffff"
            ][Math.floor(Math.random()*4)]

        });

    }

    animateConfetti();

    setTimeout(()=>{

        cancelAnimationFrame(animationId);

        ctx.clearRect(0,0,canvas.width,canvas.height);

    },6000);

}

function animateConfetti(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    particles.forEach(p=>{

        ctx.beginPath();

        ctx.fillStyle=p.color;

        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);

        ctx.fill();

        p.y+=p.speed;

    });

    animationId=requestAnimationFrame(animateConfetti);

        }
// ==========================================
// NAVIGATION
// ==========================================

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

    startTyping();

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


// ==========================================
// TYPING EFFECT
// ==========================================

const typing = document.getElementById("typing");

const originalText = typing.textContent.trim();

typing.textContent = "";

let typingIndex = 0;

let typingStarted = false;

function startTyping(){

    if(typingStarted) return;

    typingStarted = true;

    function type(){

        if(typingIndex < originalText.length){

            typing.textContent += originalText.charAt(typingIndex);

            typingIndex++;

            setTimeout(type,35);

        }

    }

    type();

}


// ==========================================
// WHATSAPP
// ==========================================

const nomor = "6285184983950";

const sendWA = document.getElementById("sendWA");

const sendVideo = document.getElementById("sendVideo");

const replyMessage = document.getElementById("replyMessage");

function kirimWA(text){

    window.open(

        `https://wa.me/${nomor}?text=${encodeURIComponent(text)}`,

        "_blank"

    );

}

sendWA.addEventListener("click",()=>{

    const pesan = replyMessage.value.trim();

    if(!pesan){

        alert("Tulis pesan dulu ya ❤️");

        return;

    }

    kirimWA(pesan);

});

sendVideo.addEventListener("click",()=>{

    const pesan = replyMessage.value.trim();

    if(!pesan){

        alert("Tulis pesan dulu ya ❤️");

        return;

    }

    kirimWA(

        pesan +

        "\n\n📹 Aku juga mau video aslinya ya ❤️"

    );

});


// ==========================================
// REPLAY
// ==========================================

const replay = document.getElementById("replay");

replay.addEventListener("click",()=>{

    location.reload();

});


// ==========================================
// FINISH
// ==========================================

console.log("Happy Birthday Project Loaded ❤️");
