// =========================
// ELEMENT
// =========================

const openGift = document.getElementById("openGift");
const cakeSection = document.getElementById("cakeSection");
const cakeButton = document.getElementById("cakeButton");
const startCake = document.getElementById("startCake");

const music = document.getElementById("bgMusic");
const hearts = document.getElementById("hearts");

// =========================
// LOADING
// =========================

window.addEventListener("load", () => {

    const loading = document.getElementById("loading");

    setTimeout(() => {

        loading.style.opacity = "0";

        setTimeout(() => {

            loading.style.display = "none";

        }, 800);

    }, 1500);

});

// =========================
// FLOATING HEARTS
// =========================

function createHeart(){

    const heart = document.createElement("div");

    heart.classList.add("heart");

    heart.innerHTML = ["❤️","💖","💕","💘"][Math.floor(Math.random()*4)];

    heart.style.left = Math.random() * 100 + "vw";

    heart.style.fontSize = (16 + Math.random()*20) + "px";

    heart.style.animationDuration = (4 + Math.random()*5) + "s";

    hearts.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 8000);

}

setInterval(createHeart, 300);

// =========================
// OPEN GIFT
// =========================

openGift.addEventListener("click", () => {

    music.play().catch(()=>{});

    cakeSection.style.display = "block";

    cakeSection.scrollIntoView({ behavior: "smooth" });

});

// =========================
// START CAKE
// =========================

startCake.addEventListener("click", () => {

    cakeSection.scrollIntoView({ behavior: "smooth" });

    document.getElementById("cakeBox").classList.add("show");

});

// =========================
// CAKE BUTTON (STEP 1)
// =========================

cakeButton.addEventListener("click", () => {

    document.getElementById("layer1").classList.remove("hidden");

    setTimeout(() => {

        document.getElementById("layer2").classList.remove("hidden");

    }, 600);

    setTimeout(() => {

        document.getElementById("layer3").classList.remove("hidden");

    }, 1200);

});
// =========================
// CAKE CONTINUE (CREAM + CANDLE)
// =========================

const cream = document.getElementById("cream");
const candle = document.getElementById("candle");
const flame = document.getElementById("flame");

setTimeout(() => {

    cakeButton.addEventListener("click", () => {

        // show cream
        cream.classList.remove("hidden");

        setTimeout(() => {

            // show candle
            candle.classList.remove("hidden");

            cakeButton.textContent = "🕯 Tiup Lilin";

            cakeButton.id = "blowButton";

            enableBlow();

        }, 800);

    }, { once: true });

}, 1000);

// =========================
// BLOW CANDLE
// =========================

function enableBlow(){

    const blowButton = document.getElementById("blowButton");

    blowButton.addEventListener("click", () => {

        // blow effect
        flame.style.opacity = "0";
        flame.style.transform = "scale(0)";

        // popup
        showPopup("🎉 Make A Wish ❤️");

        // confetti
        createConfetti();

        // change button
        setTimeout(() => {

            blowButton.textContent = "🎥 Lihat Hadiah";

            blowButton.id = "toVideo";

            goToVideo();

        }, 1500);

    });

}

// =========================
// POPUP FUNCTION
// =========================

function showPopup(text){

    const pop = document.createElement("div");

    pop.className = "pop";

    pop.innerText = text;

    document.body.appendChild(pop);

    setTimeout(() => {

        pop.remove();

    }, 2500);

                          }
// =========================
// CONFETTI
// =========================

const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function createConfetti(){

    particles = [];

    for(let i=0;i<150;i++){

        particles.push({

            x: Math.random()*canvas.width,

            y: Math.random()*-canvas.height,

            r: Math.random()*6+2,

            d: Math.random()*2+1,

            color: ["#ff4f92","#fff","#ffd1dc","#ffb6c1"][Math.floor(Math.random()*4)]

        });

    }

    animateConfetti();

}

function animateConfetti(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    particles.forEach(p => {

        ctx.beginPath();

        ctx.fillStyle = p.color;

        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);

        ctx.fill();

        p.y += p.d;

        if(p.y > canvas.height){

            p.y = 0;

            p.x = Math.random()*canvas.width;

        }

    });

    requestAnimationFrame(animateConfetti);

}

// =========================
// GO TO VIDEO
// =========================

function goToVideo(){

    const btn = document.getElementById("toVideo");

    btn.addEventListener("click", () => {

        document.getElementById("videoSection").style.display = "block";

        document.getElementById("videoSection").scrollIntoView({

            behavior:"smooth"

        });

    });

}

// =========================
// TYPING LETTER
// =========================

const typing = document.getElementById("typing");

if(typing){

    const text = typing.innerText;

    typing.innerText = "";

    let i = 0;

    function type(){

        if(i < text.length){

            typing.innerText += text[i];

            i++;

            setTimeout(type, 30);

        }

    }

    setTimeout(type, 1000);

}

// =========================
// WHATSAPP
// =========================

const sendWA = document.getElementById("sendWA");
const sendVideo = document.getElementById("sendVideo");

const nomor = "6285184983950";

sendWA.addEventListener("click", () => {

    const msg = document.getElementById("replyMessage").value.trim();

    if(!msg){

        alert("Tulis pesan dulu ya ❤️");

        return;

    }

    window.open(

        `https://wa.me/${nomor}?text=${encodeURIComponent(msg)}`,

        "_blank"

    );

});

sendVideo.addEventListener("click", () => {

    const msg = document.getElementById("replyMessage").value.trim();

    if(!msg){

        alert("Tulis pesan dulu ya ❤️");

        return;

    }

    const finalMsg = `${msg}

📹 Aku juga mau video aslinya ya sayang ❤️`;

    window.open(

        `https://wa.me/${nomor}?text=${encodeURIComponent(finalMsg)}`,

        "_blank"

    );

});

// =========================
// REPLAY
// =========================

const replay = document.getElementById("replay");

if(replay){

    replay.addEventListener("click", () => {

        location.reload();

    });

        }
