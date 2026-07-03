// ======================================================
// ELEMENT
// ======================================================

const openBtn = document.getElementById("openGift");
const replayBtn = document.getElementById("replay");

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

const loading = document.getElementById("loading");
const hiddenContent = document.getElementById("hiddenContent");

const hearts = document.getElementById("hearts");

const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

const typing = document.getElementById("typing");

const cakeContainer = document.getElementById("cakeContainer");
const blowBtn = document.getElementById("blowCandles");

let giftOpened = false;
let candleBlown = false;

let confettiAnimation = null;

// ======================================================
// LOCK SCROLL
// ======================================================

document.body.classList.add("lock-scroll");
hiddenContent.style.display = "none";

// ======================================================
// LOADING
// ======================================================

window.addEventListener("load",()=>{

setTimeout(()=>{

loading.style.opacity="0";

setTimeout(()=>{

loading.remove();

},800);

},1500);

});

// ======================================================
// MUSIC
// ======================================================

music.volume=.5;

function updateMusicButton(){

musicBtn.textContent=
music.paused ? "🔇" : "🔊";

}

musicBtn.onclick=async()=>{

try{

if(music.paused){

await music.play();

}else{

music.pause();

}

}catch(e){}

updateMusicButton();

};

// ======================================================
// OPEN GIFT
// ======================================================

openBtn.addEventListener("click",async()=>{

if(giftOpened) return;

giftOpened=true;

hiddenContent.style.display="block";

requestAnimationFrame(()=>{

hiddenContent.classList.add("show");

revealHiddenSections();

});

document.body.classList.remove("lock-scroll");

// Kue langsung dimunculkan begitu hadiah dibuka
// (tanpa perlu tombol "Munculkan Kue" lagi).
cakeContainer.classList.add("show");

// Putar musik di background TANPA menunggu (await) hasilnya,
// supaya kalau file musik gagal/lambat dimuat, tampilan
// (popup, confetti, auto-scroll ke kue) tetap jalan normal.
music.play()
.then(updateMusicButton)
.catch(()=>{

updateMusicButton();

});

birthdayPopup();

createConfetti();

for(let i=0;i<80;i++){

setTimeout(sparkle,i*35);

}

setTimeout(()=>{

document.querySelector(".cake-section")
.scrollIntoView({

behavior:"smooth"

});

},700);

});

// ======================================================
// BLOW CANDLES
// ======================================================

blowBtn.addEventListener("click",()=>{

if(candleBlown) return;

candleBlown=true;

// Matikan semua api lilin
document.querySelectorAll(".cake-flame").forEach(f=>{

f.classList.add("off");

// Efek asap, posisinya dihitung dari lokasi lilin di layar
// (fixed ke body, karena lilin sekarang bagian dari SVG)
const rect=f.getBoundingClientRect();

const smoke=document.createElement("div");

smoke.className="smoke";

smoke.textContent="☁";

smoke.style.left=(rect.left+rect.width/2-9)+"px";

smoke.style.top=(rect.top-4)+"px";

document.body.appendChild(smoke);

setTimeout(()=>{

smoke.remove();

},1800);

});

// Animasi kue bergoyang
document.querySelector(".cake-wrapper")
.classList.add("cakeBoom");

// Popup
birthdayPopup();

// Confetti
createConfetti();

// Sparkle
for(let i=0;i<120;i++){

setTimeout(sparkle,i*18);

}

// Tombol berubah
blowBtn.disabled=true;

blowBtn.innerHTML="🎉 Wish Terkabul";

// Scroll ke video
setTimeout(()=>{

document.querySelector(".video-section")
.scrollIntoView({

behavior:"smooth"

});

},2500);

});

// ======================================================
// REPLAY
// ======================================================

replayBtn.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

if(music.paused){

music.play().catch(()=>{});

}

updateMusicButton();

});

// ======================================================
// FLOATING HEART
// ======================================================

function createHeart(){

const heart=document.createElement("div");

heart.className="heart";

heart.textContent=[
"❤",
"💕",
"💖",
"💗",
"💘"
][Math.floor(Math.random()*5)];

heart.style.left=Math.random()*100+"vw";

heart.style.fontSize=
(18+Math.random()*20)+"px";

heart.style.animationDuration=
(5+Math.random()*4)+"s";

hearts.appendChild(heart);

setTimeout(()=>{

heart.remove();

},9000);

}

setInterval(createHeart,350);
// ======================================================
// SCROLL ANIMATION
// ======================================================

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";

entry.target.style.transform="translateY(0)";

observer.unobserve(entry.target);

}

});

},{
threshold:.15
});

sections.forEach(section=>{

section.style.opacity="0";

section.style.transform="translateY(60px)";

section.style.transition=".8s";

// Section di dalam #hiddenContent belum punya ukuran (display:none),
// jadi jangan diamati dulu supaya tidak macet di opacity:0.
// Baru diamati saat hiddenContent benar-benar ditampilkan.
if(!section.closest("#hiddenContent")){

observer.observe(section);

}

});

function revealHiddenSections(){

document.querySelectorAll("#hiddenContent section").forEach(section=>{

observer.observe(section);

});

}

// ======================================================
// TYPING EFFECT
// ======================================================

const message = typing.textContent.trim();

typing.textContent = "";

let typingIndex = 0;
let typingStarted = false;

function typeWriter(){

if(typingIndex >= message.length) return;

typing.textContent += message.charAt(typingIndex);

typingIndex++;

setTimeout(typeWriter,35);

}

const typingObserver = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting && !typingStarted){

typingStarted = true;

typeWriter();

}

});

},{
threshold:.4
});

typingObserver.observe(typing);

// ======================================================
// TIME TOGETHER
// ======================================================

const startDate = new Date(2026,3,18,0,0,0);

function updateTime(){

const now = new Date();

let diff = now - startDate;

if(diff < 0) diff = 0;

const days = Math.floor(diff/86400000);

const hours = Math.floor(diff/3600000)%24;

const minutes = Math.floor(diff/60000)%60;

const seconds = Math.floor(diff/1000)%60;

document.getElementById("days").textContent = days;

document.getElementById("hours").textContent =
String(hours).padStart(2,"0");

document.getElementById("minutes").textContent =
String(minutes).padStart(2,"0");

document.getElementById("seconds").textContent =
String(seconds).padStart(2,"0");

}

updateTime();

setInterval(updateTime,1000);

// ======================================================
// POPUP
// ======================================================

function birthdayPopup(){

const popup = document.createElement("div");

popup.innerHTML = "🎉 Happy Birthday 🤍";

Object.assign(popup.style,{

position:"fixed",
left:"50%",
top:"50%",
transform:"translate(-50%,-50%) scale(.8)",
background:"#fff",
color:"#ff4f92",
padding:"20px 40px",
borderRadius:"20px",
fontSize:"30px",
fontWeight:"700",
zIndex:"999999",
opacity:"0",
transition:".35s",
boxShadow:"0 15px 40px rgba(0,0,0,.25)"

});

document.body.appendChild(popup);

requestAnimationFrame(()=>{

popup.style.opacity="1";
popup.style.transform="translate(-50%,-50%) scale(1)";

});

setTimeout(()=>{

popup.style.opacity="0";
popup.style.transform="translate(-50%,-50%) scale(.8)";

setTimeout(()=>{

popup.remove();

},400);

},2200);

}

// ======================================================
// SPARKLE EFFECT
// ======================================================

function sparkle(){

const star = document.createElement("div");

star.textContent = "✨";

Object.assign(star.style,{

position:"fixed",
left:Math.random()*window.innerWidth+"px",
top:Math.random()*window.innerHeight+"px",
fontSize:(16+Math.random()*18)+"px",
pointerEvents:"none",
transition:"1.5s",
zIndex:"99999"

});

document.body.appendChild(star);

requestAnimationFrame(()=>{

star.style.transform="translateY(-60px)";
star.style.opacity="0";

});

setTimeout(()=>{

star.remove();

},1500);

}

// ======================================================
// CONFETTI
// ======================================================

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize",()=>{

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

});

let particles = [];

function createConfetti(){

particles = [];

for(let i=0;i<180;i++){

particles.push({

x:Math.random()*canvas.width,

y:Math.random()*-canvas.height,

r:4+Math.random()*5,

dx:(Math.random()-.5)*2,

dy:2+Math.random()*3,

color:[
"#ff4f92",
"#ff85b3",
"#ffd166",
"#ffffff",
"#ffb6c1"
][Math.floor(Math.random()*5)]

});

}

if(confettiAnimation){

cancelAnimationFrame(confettiAnimation);

}

animateConfetti();

setTimeout(()=>{

cancelAnimationFrame(confettiAnimation);

ctx.clearRect(0,0,canvas.width,canvas.height);

},8000);

}

function animateConfetti(){

ctx.clearRect(0,0,canvas.width,canvas.height);

particles.forEach(p=>{

ctx.beginPath();

ctx.arc(p.x,p.y,p.r,0,Math.PI*2);

ctx.fillStyle=p.color;

ctx.fill();

p.x+=p.dx;
p.y+=p.dy;

if(p.y>canvas.height+20){

p.y=-20;
p.x=Math.random()*canvas.width;

}

});

confettiAnimation=requestAnimationFrame(animateConfetti);

}

// ======================================================
// GALLERY LIGHTBOX
// ======================================================

const images=document.querySelectorAll(".gallery-grid img");

const lightbox=document.createElement("div");

lightbox.id="lightbox";

lightbox.innerHTML=`
<span id="closeLightbox">&times;</span>
<img id="lightboxImage" alt="Preview">
`;

document.body.appendChild(lightbox);

const lightboxImage=document.getElementById("lightboxImage");
const closeLightbox=document.getElementById("closeLightbox");

images.forEach(img=>{

img.loading="lazy";

img.addEventListener("click",()=>{

lightbox.style.display="flex";

lightboxImage.src=img.src;

document.body.style.overflow="hidden";

});

});

function hideLightbox(){

lightbox.style.display="none";

document.body.style.overflow=
giftOpened ? "auto" : "hidden";

}

closeLightbox.addEventListener("click",hideLightbox);

lightbox.addEventListener("click",e=>{

if(e.target===lightbox){

hideLightbox();

}

});

document.addEventListener("keydown",e=>{

if(e.key==="Escape"){

hideLightbox();

}

});

// ======================================================
// BUTTON GLOW
// ======================================================

setInterval(()=>{

openBtn.animate([

{transform:"scale(1)"},

{transform:"scale(1.08)"},

{transform:"scale(1)"}

],{

duration:1800

});

},1800);

// ======================================================
// PARALLAX
// ======================================================

window.addEventListener("scroll",()=>{

document.body.style.backgroundPositionY =
-(window.scrollY*0.2)+"px";

},{
passive:true
});

// ======================================================
// IMAGE CHECK
// ======================================================

images.forEach(img=>{

img.onerror=()=>{

console.warn("Gambar tidak ditemukan :",img.src);

img.style.opacity=".4";

};

});

// ======================================================
// AUDIO CHECK
// ======================================================

music.addEventListener("error",()=>{

console.warn("Audio gagal dimuat.");

});

// ======================================================
// FINISH
// ======================================================

updateMusicButton();

console.log("❤️ Happy Birthday Website Loaded Successfully ❤️");
