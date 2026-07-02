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
// ==========================
// LIGHTBOX GALLERY
// ==========================

const images = document.querySelectorAll(".gallery-grid img");

const overlay = document.createElement("div");
overlay.id = "lightbox";

overlay.innerHTML = `
    <span id="closeLightbox">&times;</span>
    <img id="lightboxImage">
`;

document.body.appendChild(overlay);

const lightboxImage = document.getElementById("lightboxImage");
const closeLightbox = document.getElementById("closeLightbox");

images.forEach(img=>{

    img.addEventListener("click",()=>{

        overlay.style.display="flex";

        lightboxImage.src=img.src;

    });

});

closeLightbox.addEventListener("click",()=>{

    overlay.style.display="none";

});

overlay.addEventListener("click",(e)=>{

    if(e.target===overlay){

        overlay.style.display="none";

    }

});

// ==========================
// VIDEO AUTOPLAY
// ==========================

const videoObserver = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

video.play().catch(()=>{});

}else{

video.pause();

}

});

});

videoObserver.observe(video);

// ==========================
// BUTTON GLOW
// ==========================

setInterval(()=>{

openBtn.animate([

{

boxShadow:"0 0 0px #fff"

},

{

boxShadow:"0 0 35px #ffffff"

},

{

boxShadow:"0 0 0px #fff"

}

],{

duration:1800

});

},1800);

// ==========================
// PARALLAX
// ==========================

window.addEventListener("scroll",()=>{

const y=window.scrollY;

document.body.style.backgroundPositionY=(y*0.2)+"px";

});

// ==========================
// POPUP
// ==========================

function birthdayPopup(){

const popup=document.createElement("div");

popup.innerHTML="🎉 Happy Birthday ❤️";

popup.style.position="fixed";

popup.style.top="50%";

popup.style.left="50%";

popup.style.transform="translate(-50%,-50%)";

popup.style.background="white";

popup.style.color="#ff4f92";

popup.style.padding="25px 40px";

popup.style.borderRadius="20px";

popup.style.fontSize="30px";

popup.style.fontWeight="bold";

popup.style.zIndex="999999";

popup.style.boxShadow="0 20px 50px rgba(0,0,0,.3)";

document.body.appendChild(popup);

setTimeout(()=>{

popup.remove();

},2500);

}

openBtn.addEventListener("click",birthdayPopup);

// ==========================
// SPARKLE
// ==========================

function sparkle(){

const star=document.createElement("div");

star.innerHTML="✨";

star.style.position="fixed";

star.style.left=Math.random()*window.innerWidth+"px";

star.style.top=Math.random()*window.innerHeight+"px";

star.style.fontSize=(15+Math.random()*25)+"px";

star.style.pointerEvents="none";

star.style.transition="1.5s";

document.body.appendChild(star);

setTimeout(()=>{

star.style.opacity="0";

star.style.transform="translateY(-60px)";

},100);

setTimeout(()=>{

star.remove();

},1600);

}

openBtn.addEventListener("click",()=>{

for(let i=0;i<80;i++){

setTimeout(sparkle,i*30);

}

});

// ==========================
// LOVE MESSAGE
// ==========================

console.log(`
❤️
Happy Birthday
Semoga selalu bahagia.
Terima kasih sudah hadir.
Aku sayang kamu ❤️
`);
