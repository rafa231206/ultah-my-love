// ==========================
// Loading Screen
// ==========================

window.addEventListener("load", () => {

    setTimeout(() => {

        document.getElementById("loading").style.opacity = "0";

        setTimeout(() => {

            document.getElementById("loading").style.display = "none";

        },800);

    },1800);

});

// ==========================
// Element
// ==========================

const openBtn = document.getElementById("openGift");
const music = document.getElementById("bgMusic");
const video = document.getElementById("birthdayVideo");
const replay = document.getElementById("replay");

// ==========================
// Open Gift
// ==========================

openBtn.addEventListener("click",()=>{

    music.play().catch(()=>{});

    document.querySelector(".video-section").scrollIntoView({

        behavior:"smooth"

    });

    setTimeout(()=>{

        video.play().catch(()=>{});

    },700);

});

// ==========================
// Replay
// ==========================

replay.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

    video.currentTime=0;

});

// ==========================
// Floating Hearts
// ==========================

const hearts = document.getElementById("hearts");

function createHeart(){

    const heart = document.createElement("div");

    heart.className="heart";

    heart.innerHTML="❤";

    heart.style.left=Math.random()*100+"vw";

    heart.style.fontSize=(20+Math.random()*25)+"px";

    heart.style.animationDuration=(5+Math.random()*5)+"s";

    hearts.appendChild(heart);

    setTimeout(()=>{

        heart.remove();

    },10000);

}

setInterval(createHeart,300);

// ==========================
// Scroll Animation
// ==========================

const sections=document.querySelectorAll("section");

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";

entry.target.style.transform="translateY(0)";

}

});

});

sections.forEach(sec=>{

sec.style.opacity="0";

sec.style.transform="translateY(60px)";

sec.style.transition=".8s";

observer.observe(sec);

});
// ==========================
// TYPING EFFECT
// ==========================

const typing = document.getElementById("typing");

const fullText = typing.innerText;

typing.innerText = "";

let index = 0;

function typeLetter(){

    if(index < fullText.length){

        typing.innerHTML += fullText.charAt(index);

        index++;

        setTimeout(typeLetter,45);

    }

}

const typingObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            if(index===0){

                typeLetter();

            }

        }

    });

});

typingObserver.observe(typing);

// ==========================
// COUNTDOWN
// Ganti tanggal sesuai hari jadian
// Format: Tahun, Bulan-1, Tanggal
// ==========================

const startDate = new Date(2025, 6, 15);

function updateCounter(){

    const now = new Date();

    const diff = now - startDate;

    const days = Math.floor(diff / (1000*60*60*24));

    const hours = now.getHours();

    const minutes = now.getMinutes();

    const seconds = now.getSeconds();

    document.getElementById("days").innerHTML = days;

    document.getElementById("hours").innerHTML =
        String(hours).padStart(2,"0");

    document.getElementById("minutes").innerHTML =
        String(minutes).padStart(2,"0");

    document.getElementById("seconds").innerHTML =
        String(seconds).padStart(2,"0");

}

updateCounter();

setInterval(updateCounter,1000);

// ==========================
// CONFETTI
// ==========================

const canvas = document.getElementById("confetti");

const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;

canvas.height = window.innerHeight;

let confetti = [];

function random(min,max){

    return Math.random()*(max-min)+min;

}

function createConfetti(){

    confetti = [];

    for(let i=0;i<180;i++){

        confetti.push({

            x:random(0,canvas.width),

            y:random(-canvas.height,0),

            r:random(4,9),

            d:random(2,6),

            color:[
                "#ff5fa2",
                "#ff99cc",
                "#ffffff",
                "#ffd166",
                "#ff6b6b"
            ][Math.floor(Math.random()*5)]

        });

    }

}

function drawConfetti(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    confetti.forEach(c=>{

        ctx.beginPath();

        ctx.fillStyle=c.color;

        ctx.arc(c.x,c.y,c.r,0,Math.PI*2);

        ctx.fill();

        c.y += c.d;

        if(c.y > canvas.height){

            c.y = -20;

        }

    });

    requestAnimationFrame(drawConfetti);

}

openBtn.addEventListener("click",()=>{

    createConfetti();

    drawConfetti();

});

window.addEventListener("resize",()=>{

    canvas.width = window.innerWidth;

    canvas.height = window.innerHeight;

});
