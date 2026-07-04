// ======================================================
// ELEMENT
// ======================================================

const openBtn = document.getElementById("openGift");
const replayBtn = document.getElementById("replay");

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

const loading = document.getElementById("loading");
const hiddenContent = document.getElementById("hiddenContent");

const envelopeScreen = document.getElementById("envelopeScreen");
const envelopeBtn = document.getElementById("envelopeBtn");
const heroSection = document.querySelector(".hero");

const lockScreen = document.getElementById("lockScreen");
const lockCard = document.querySelector(".lock-card");
const lockDots = document.querySelectorAll(".lock-dot");
const lockHint = document.getElementById("lockHint");
const lockKeys = document.querySelectorAll(".lock-key[data-key]");
const lockBackspace = document.getElementById("lockBackspace");

const hearts = document.getElementById("hearts");

const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

const typing = document.getElementById("typing");

const cakeContainer = document.getElementById("cakeContainer");
const blowBtn = document.getElementById("blowCandles");

// Halaman-halaman (page) yang muncul bergiliran, bukan discroll
const surpriseSection = document.getElementById("surprise");
const cakeSection = document.querySelector(".cake-section");
const videoSection = document.querySelector(".video-section");
const gallerySection = document.querySelector(".gallery");
const memorySection = document.querySelector(".memory-section");
const letterSection = document.querySelector(".letter");
const meterSection = document.querySelector(".love-meter-section");
const countdownSection = document.querySelector(".countdown");
const messageSection = document.querySelector(".message-section");
const endingSection = document.querySelector(".ending");

const nextSurpriseBtn = document.getElementById("nextSurprise");
const nextVideoBtn = document.getElementById("nextVideo");
const nextGalleryBtn = document.getElementById("nextGallery");
const nextMemoryBtn = document.getElementById("nextMemory");
const nextLetterBtn = document.getElementById("nextLetter");
const nextMeterBtn = document.getElementById("nextMeter");
const nextCountdownBtn = document.getElementById("nextCountdown");
const nextMessageBtn = document.getElementById("nextMessage");

// Chat WA (AI) sebelum kirim email
const waChatBody = document.getElementById("waChatBody");
const waInput = document.getElementById("waInput");
const waSendBtn = document.getElementById("waSendBtn");
const waStatus = document.getElementById("waStatus");
const waSendEmailStatus = document.getElementById("waSendEmailStatus");

// Daftar foto kenangan, dipakai bareng oleh galeri kamera & memory game
const photoList = [
"1.jpg",
"3.jpg",
"5.jpg",
"6.jpg",
"8.jpg",
"9.jpg",
"10.jpg",
"13.jpg",
"15.jpg"
];
const photo = [
"2.jpg",
"4.jpg",
"7.jpg",
"11.jpg",
"12.jpg",
"14.jpg"
];

let giftOpened = false;
let candleBlown = false;

let confettiAnimation = null;

// ======================================================
// PAGE NAVIGATION (ganti halaman, bukan scroll)
// ======================================================

function goToPage(fromSection, toSection){

if(fromSection){

fromSection.classList.remove("active");

}

toSection.classList.add("active");

toSection.scrollTop = 0;

}

// ======================================================
// LOCK SCROLL
// ======================================================

document.body.classList.add("lock-scroll");

// ======================================================
// LOADING
// ======================================================

function preloadImage(src){

return new Promise(resolve=>{

const img = new Image();

img.onload = resolve;

img.onerror = resolve;

img.src = src;

});

}

function preloadAudio(src){

return new Promise(resolve=>{

const audio = document.createElement("audio");

audio.oncanplaythrough = resolve;

audio.onerror = resolve;

audio.preload = "auto";

audio.src = src;

});

}

function preloadAllAssets(){

const tasks = [];

photoList.forEach(name=>{

tasks.push(preloadImage(name));

});

const musicSrc = music.querySelector("source")
? music.querySelector("source").src
: null;

if(musicSrc){

tasks.push(preloadAudio(musicSrc));

}

return Promise.all(tasks);

}

window.addEventListener("load",()=>{

const minWait = new Promise(resolve=>setTimeout(resolve,1500));

Promise.all([preloadAllAssets(), minWait]).then(()=>{

loading.style.opacity="0";

setTimeout(()=>{

loading.remove();

},800);

});

});

// ======================================================
// LOCK SCREEN
// ======================================================

const LOCK_CODE = "1804";

let lockInput = "";
let lockWrongCount = 0;
let lockBusy = false;

function updateLockDots(){

lockDots.forEach((dot,i)=>{

dot.classList.toggle("filled", i < lockInput.length);

});

}

function lockWrong(){

lockWrongCount++;

lockCard.classList.add("shake");

setTimeout(()=>{

lockCard.classList.remove("shake");

},450);

if(lockWrongCount >= 2){

lockHint.textContent =
"Petunjuk: kacian salah yaa, itu lo sayang.. tanggal jadian kitaa 🤍";

}else{

lockHint.textContent = "Kode salah, coba lagi yaa 🥺";

}

setTimeout(()=>{

lockInput = "";

updateLockDots();

lockBusy = false;

},550);

}

function lockCorrect(){

lockHint.textContent = "Yeay bener cintaa! 🎉";

setTimeout(()=>{

lockScreen.classList.add("hide");

setTimeout(()=>{

lockScreen.remove();

},650);

},600);

}

function handleLockKey(key){

if(lockBusy) return;

if(lockInput.length >= 4) return;

lockInput += key;

updateLockDots();

if(lockInput.length === 4){

lockBusy = true;

setTimeout(()=>{

if(lockInput === LOCK_CODE){

lockCorrect();

}else{

lockWrong();

}

},250);

}

}

lockKeys.forEach(key=>{

key.addEventListener("click",()=>{

handleLockKey(key.dataset.key);

});

});

lockBackspace.addEventListener("click",()=>{

if(lockBusy) return;

lockInput = lockInput.slice(0,-1);

updateLockDots();

});

// ======================================================
// ENVELOPE INTRO
// ======================================================

function spawnEnvelopeBurst(){

const rect = envelopeBtn.getBoundingClientRect();

const cx = rect.left + rect.width/2;
const cy = rect.top + rect.height/2;

const icons = ["❤","💕","💖","💗","✨"];

for(let i=0;i<18;i++){

const piece = document.createElement("div");

piece.className = "envelope-burst";

piece.textContent = icons[Math.floor(Math.random()*icons.length)];

const angle = Math.random()*Math.PI*2;
const distance = 60+Math.random()*90;

piece.style.setProperty("--tx",(Math.cos(angle)*distance)+"px");
piece.style.setProperty("--ty",(Math.sin(angle)*distance-40)+"px");

piece.style.left = cx+"px";
piece.style.top = cy+"px";
piece.style.fontSize = (16+Math.random()*16)+"px";

document.body.appendChild(piece);

setTimeout(()=>{

piece.remove();

},1100);

}

}

envelopeBtn.addEventListener("click",()=>{

if(envelopeBtn.classList.contains("opened")) return;

envelopeBtn.classList.add("opened");

spawnEnvelopeBurst();

music.play()
.then(updateMusicButton)
.catch(()=>{

updateMusicButton();

});

setTimeout(()=>{

envelopeScreen.classList.add("hide");

heroSection.classList.add("reveal");

setTimeout(()=>{

envelopeScreen.remove();

},650);

},900);

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

document.body.classList.remove("lock-scroll");

// Pindah dari halaman hero ke halaman "surprise"
goToPage(heroSection, surpriseSection);

// Kue disiapkan di background supaya sudah siap
// begitu user sampai di halamannya nanti
cakeContainer.classList.add("show");

// Putar musik di background TANPA menunggu (await) hasilnya,
// supaya kalau file musik gagal/lambat dimuat, tampilan
// (popup, confetti) tetap jalan normal.
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

});

// ======================================================
// NEXT PAGE BUTTONS
// ======================================================

nextSurpriseBtn.addEventListener("click",()=>{

goToPage(surpriseSection, cakeSection);

});

nextVideoBtn.addEventListener("click",()=>{

goToPage(videoSection, gallerySection);

});

nextGalleryBtn.addEventListener("click",()=>{

goToPage(gallerySection, memorySection);

});

nextMemoryBtn.addEventListener("click",()=>{

goToPage(memorySection, letterSection);

});

nextLetterBtn.addEventListener("click",()=>{

goToPage(letterSection, meterSection);

});

nextMeterBtn.addEventListener("click",()=>{

goToPage(meterSection, countdownSection);

});

nextCountdownBtn.addEventListener("click",()=>{

goToPage(countdownSection, messageSection);

waGreetIfNeeded();

});

nextMessageBtn.addEventListener("click", async ()=>{

await waSendTranscriptToEmail();

goToPage(messageSection, endingSection);

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

// Confetti
createConfetti();

// Sparkle
for(let i=0;i<120;i++){

setTimeout(sparkle,i*18);

}

// Tombol berubah
blowBtn.disabled=true;

blowBtn.innerHTML="🎉 Wish Terkabul";

// Ganti halaman ke video
setTimeout(()=>{

goToPage(cakeSection, videoSection);

},2500);

});

// ======================================================
// REPLAY
// ======================================================

replayBtn.addEventListener("click",()=>{

if(music.paused){

music.play().catch(()=>{});

}

updateMusicButton();

// Reset semua supaya "Buka Hadiah" & "Tiup Lilin"
// bisa diklik ulang dari awal
giftOpened = false;

candleBlown = false;

cakeContainer.classList.remove("show");

document.querySelector(".cake-wrapper")
.classList.remove("cakeBoom");

document.querySelectorAll(".cake-flame").forEach(f=>{

f.classList.remove("off");

});

blowBtn.disabled = false;

blowBtn.innerHTML = "💨 Tiup Lilin";

// Reset love meter
loveLevel = 0;

loveMaxed = false;

updateLoveMeter();

meterMessage.textContent = "Klik hatinya sayangkuu 🤍";

// Reset surat (typing effect)
typing.textContent = "";

typingIndex = 0;

typingStarted = false;

// Reset galeri kamera ke foto pertama
galleryIndex = 0;

renderGalleryPhoto();

// Reset memory game
buildMemoryBoard();

// Reset chat AI
resetWaChat();

document.body.classList.add("lock-scroll");

// Balik ke halaman awal (hero)
goToPage(endingSection, heroSection);

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

observer.observe(section);

});

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
// GALLERY (TAMPILAN KAMERA)
// ======================================================

const galleryPhoto = document.getElementById("galleryPhoto");
const galleryCounter = document.getElementById("galleryCounter");
const galleryPrevBtn = document.getElementById("galleryPrev");
const galleryNextBtn = document.getElementById("galleryNext");

let galleryIndex = 0;

function renderGalleryPhoto(){

const src = photoList[galleryIndex];

galleryPhoto.style.opacity = "0";

setTimeout(()=>{

galleryPhoto.src = src;

galleryPhoto.alt = "Kenangan "+(galleryIndex+1);

galleryPhoto.style.opacity = "1";

},150);

galleryCounter.textContent = (galleryIndex+1)+" / "+photoList.length;

}

galleryPhoto.onerror = ()=>{

console.warn("Gambar tidak ditemukan :",galleryPhoto.src);

galleryPhoto.style.opacity=".4";

};

galleryPrevBtn.addEventListener("click",()=>{

galleryIndex = (galleryIndex - 1 + photoList.length) % photoList.length;

renderGalleryPhoto();

});

galleryNextBtn.addEventListener("click",()=>{

galleryIndex = (galleryIndex + 1) % photoList.length;

renderGalleryPhoto();

});

// Navigasi juga bisa pakai tombol panah keyboard, saat halaman galeri aktif
document.addEventListener("keydown",e=>{

if(!gallerySection.classList.contains("active")) return;

if(e.key === "ArrowLeft"){

galleryPrevBtn.click();

}else if(e.key === "ArrowRight"){

galleryNextBtn.click();

}

});

renderGalleryPhoto();

// ======================================================
// LIGHTBOX (klik foto kamera buat lihat lebih besar)
// ======================================================

const lightbox=document.getElementById("lightbox");
const lightboxImage=document.getElementById("lightboxImage");
const closeLightbox=document.getElementById("closeLightbox");

galleryPhoto.style.cursor="zoom-in";

galleryPhoto.addEventListener("click",()=>{

lightbox.style.display="flex";

lightboxImage.src=galleryPhoto.src;

document.body.style.overflow="hidden";

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
// AUDIO CHECK
// ======================================================

music.addEventListener("error",()=>{

console.warn("Audio gagal dimuat.");

});

// ======================================================
// MEMORY GAME
// ======================================================

const memoryGrid = document.getElementById("memoryGrid");
const memMovesEl = document.getElementById("memMoves");
const memTimerEl = document.getElementById("memTimer");
const memoryRestartBtn = document.getElementById("memoryRestart");
const memoryWinMsg = document.getElementById("memoryWinMsg");

const memoryPhotos = photo;

let memFlipped = [];
let memMatchedCount = 0;
let memMoves = 0;
let memBusy = false;
let memTimerInterval = null;
let memSeconds = 0;
let memStarted = false;

function shuffleArray(arr){

const a = arr.slice();

for(let i=a.length-1;i>0;i--){

const j = Math.floor(Math.random()*(i+1));

[a[i],a[j]] = [a[j],a[i]];

}

return a;

}

function formatTime(sec){

const m = String(Math.floor(sec/60)).padStart(2,"0");

const s = String(sec%60).padStart(2,"0");

return m+":"+s;

}

function startMemTimer(){

if(memStarted) return;

memStarted = true;

memTimerInterval = setInterval(()=>{

memSeconds++;

memTimerEl.textContent = formatTime(memSeconds);

},1000);

}

function stopMemTimer(){

clearInterval(memTimerInterval);

}

function buildMemoryBoard(){

memoryGrid.innerHTML = "";

memFlipped = [];

memMatchedCount = 0;

memMoves = 0;

memBusy = false;

memStarted = false;

memSeconds = 0;

stopMemTimer();

memMovesEl.textContent = "0";

memTimerEl.textContent = "00:00";

memoryWinMsg.textContent = "";

const deck = shuffleArray([...memoryPhotos,...memoryPhotos]);

deck.forEach(src=>{

const card = document.createElement("div");

card.className = "memory-card";

card.dataset.src = src;

card.innerHTML =
'<div class="memory-card-inner">'+
'<div class="memory-card-front">🤍</div>'+
'<div class="memory-card-back"><img src="'+src+'" alt="Kenangan"></div>'+
'</div>';

card.addEventListener("click", onMemoryCardClick);

memoryGrid.appendChild(card);

});

}

function onMemoryCardClick(e){

const card = e.currentTarget;

if(memBusy) return;

if(card.classList.contains("flipped") || card.classList.contains("matched")) return;

if(memFlipped.length >= 2) return;

startMemTimer();

card.classList.add("flipped");

memFlipped.push(card);

if(memFlipped.length === 2){

memMoves++;

memMovesEl.textContent = memMoves;

const first = memFlipped[0];
const second = memFlipped[1];

if(first.dataset.src === second.dataset.src){

first.classList.add("matched");

second.classList.add("matched");

memFlipped = [];

memMatchedCount++;

if(memMatchedCount === memoryPhotos.length){

stopMemTimer();

memoryWinMsg.textContent =
"🎉 Selesai dalam "+memMoves+" langkah, "+formatTime(memSeconds)+"! Makasih udah main sayangg 🤍";

createConfetti();

for(let i=0;i<40;i++){

setTimeout(sparkle,i*30);

}

}

}else{

memBusy = true;

setTimeout(()=>{

first.classList.remove("flipped");

second.classList.remove("flipped");

memFlipped = [];

memBusy = false;

},900);

}

}

}

memoryRestartBtn.addEventListener("click", buildMemoryBoard);

if(memoryPhotos.length > 0){

buildMemoryBoard();

}

// ======================================================
// LOVE METER
// ======================================================

const loveTapBtn = document.getElementById("loveTapBtn");
const meterFill = document.getElementById("meterFill");
const meterLabel = document.getElementById("meterLabel");
const meterMessage = document.getElementById("meterMessage");

let loveLevel = 0;
let loveMaxed = false;

const loveMessages = [

{ min:0, max:19, text:"Baru mulai nih... ayo sayang terus ditekan 🤍" },
{ min:20, max:39, text:"Cieee mulai naik nih cintanya~ 💓" },
{ min:40, max:59, text:"Wah makin gemes aja liatnya 💕" },
{ min:60, max:79, text:"Dikit lagi penuh sayangkuu 💗" },
{ min:80, max:99, text:"Hampir penuh! Semangat dikit lagi 💖" }

];

function updateLoveMeter(){

meterFill.style.width = loveLevel+"%";

meterLabel.textContent = loveLevel+"%";

if(loveLevel >= 100){

if(!loveMaxed){

loveMaxed = true;

meterMessage.textContent =
"Ini sebagai bukti sayangg kalo cintaku ke ayang dari 1 ke 100... ehh bukann yang, ini udahh ke unlimited malah hehe 🤍♾️";

createConfetti();

}

return;

}

const current = loveMessages.find(m=>loveLevel>=m.min && loveLevel<=m.max);

if(current){

meterMessage.textContent = current.text;

}

}

function spawnMeterPop(){

const rect = loveTapBtn.getBoundingClientRect();

const pop = document.createElement("div");

pop.className = "meter-pop";

pop.textContent = ["+💕","+💗","+💖","+❤️"][Math.floor(Math.random()*4)];

pop.style.left = (rect.left + rect.width/2 - 14 + (Math.random()*30-15)) + "px";

pop.style.top = rect.top + "px";

document.body.appendChild(pop);

setTimeout(()=>{

pop.remove();

},1000);

}

loveTapBtn.addEventListener("click",()=>{

if(loveMaxed) return;

loveLevel = Math.min(100, loveLevel + 4);

updateLoveMeter();

spawnMeterPop();

loveTapBtn.animate([

{transform:"scale(1)"},

{transform:"scale(1.3)"},

{transform:"scale(1)"}

],{

duration:250

});

loveTapBtn.blur();

});

// ======================================================
// WA CHAT (AI) SEBELUM KIRIM EMAIL
// ======================================================

const REPLY_ENDPOINT = "https://formspree.io/f/xwpqpddr";

let waConversation = [];
let waGreeted = false;

function waNowTime(){

const d = new Date();

const h = String(d.getHours()).padStart(2,"0");

const m = String(d.getMinutes()).padStart(2,"0");

return h+":"+m;

}

function waScrollToBottom(){

waChatBody.scrollTop = waChatBody.scrollHeight;

}

function waAppendMessage(sender, text){

const time = waNowTime();

waConversation.push({ sender, text, time });

const bubble = document.createElement("div");

bubble.className = "wa-msg " + (sender === "user" ? "wa-msg-out" : "wa-msg-in");

const safeText = document.createElement("span");

safeText.textContent = text;

bubble.appendChild(safeText);

const timeEl = document.createElement("span");

timeEl.className = "wa-msg-time";

timeEl.textContent = time;

bubble.appendChild(timeEl);

waChatBody.appendChild(bubble);

waScrollToBottom();

}

function waShowTyping(){

waStatus.textContent = "mengetik...";

waStatus.classList.add("typing");

const typing = document.createElement("div");

typing.className = "wa-typing";

typing.id = "waTypingIndicator";

typing.innerHTML = "<span></span><span></span><span></span>";

waChatBody.appendChild(typing);

waScrollToBottom();

}

function waHideTyping(){

const typing = document.getElementById("waTypingIndicator");

if(typing) typing.remove();

waStatus.textContent = "online";

waStatus.classList.remove("typing");

}

// Kamus kata kunci sederhana biar balesan "AI"-nya kerasa nyambung
const waReplyBank = {

"sayang": ["Aku juga sayang banget sama kamu 🤍","Duh baca gitu jadi salting sendiri, sayang jugaa 💗"],
"cinta": ["Cinta aku ke kamu gak akan pernah habis 🤍♾️"],
"kangen": ["Aku juga kangen banget sama kamu 🥺🤍","Kangen ini obatnya cuma satu, ketemu kamu langsung 💕"],
"rindu": ["Rindu juga sama kamuu, semoga cepet ketemu yaa 🤍"],
"makasih": ["Samasama sayangkuu, makasih juga udah mau baca semua ini sampai sini 🤍"],
"terima kasih": ["Samasama sayangkuu, makasih juga udah mau baca semua ini sampai sini 🤍"],
"seneng": ["Yeay seneng banget denger kamu bahagia 🥳🤍"],
"senang": ["Yeay seneng banget denger kamu bahagia 🥳🤍"],
"bahagia": ["Kebahagiaan kamu itu kebahagiaan aku juga 💗"],
"sedih": ["Kalau sedih cerita ke aku yaa, aku selalu ada buat dengerin kamu 🤍"],
"capek": ["Istirahat dulu yaa sayangkuu, jangan terlalu dipaksain 🤍"],
"lelah": ["Istirahat dulu yaa sayangkuu, jangan terlalu dipaksain 🤍"],
"cantik": ["Kamu emang selalu cantik kok, dari dulu sampe sekarang 🤍"],
"ulang tahun": ["Sekali lagi, happy birthday yaa sayangkuu 🎂🤍"],
"ultah": ["Sekali lagi, happy birthday yaa sayangkuu 🎂🤍"],
"halo": ["Haii sayangkuu 👋🤍"],
"hai": ["Haii sayangkuu 👋🤍"],
"hi": ["Hii jugaa 🤍"]

};

const waFallbackReplies = [

"Aku baca semua pesan kamu kok, makasih udah cerita yaa 🤍",
"Hehe gemesin banget deh kamu ini 💗",
"Terus cerita aja sayangkuu, aku dengerin kok 🤍",
"Wahh iya bener banget tuh 😆",
"Kamu tuh selalu berhasil bikin aku senyum sendiri 🤍",
"Duh jadi pengen meluk kamu langsung deh 🥹💕"

];

const waContinueReplies = [

"Lanjutkan sayangg 🤍",
"Terusin lagi ceritanya sayangg 💗",
"Iyaa lanjutkan sayangg~",
"Lanjut terus sayangg, aku bacain kok 🤍",
"Terusin dong sayangg 🥹"

];

function waGenerateReply(userText){

return waContinueReplies[Math.floor(Math.random()*waContinueReplies.length)];

}

function waSendUserMessage(){

const text = waInput.value.trim();

if(!text) return;

waAppendMessage("user", text);

waInput.value = "";

waShowTyping();

const delay = 900 + Math.random()*900;

setTimeout(()=>{

waHideTyping();

waAppendMessage("ai", waGenerateReply(text));

}, delay);

}

if(waSendBtn){

waSendBtn.addEventListener("click", waSendUserMessage);

}

if(waInput){

waInput.addEventListener("keydown", e=>{

if(e.key === "Enter"){

e.preventDefault();

waSendUserMessage();

}

});

}

function waGreetIfNeeded(){

if(waGreeted) return;

waGreeted = true;

waShowTyping();

setTimeout(()=>{

waHideTyping();

waAppendMessage("ai","Haii sayangkuu 🤍 kasih aku balasan atas web ini yaa sayang ");

}, 1100);

}

// Kirim seluruh obrolan ke email pas user klik "Lanjut"
async function waSendTranscriptToEmail(){

if(waConversation.length === 0) return;

nextMessageBtn.disabled = true;

waSendEmailStatus.textContent = "Mengirim obrolan ke email...";

waSendEmailStatus.classList.remove("reply-status-ok","reply-status-error");

try{

const transcript = waConversation

.filter(m=>m.sender === "user")

.map(m=>{

return "["+m.time+"] Ayangg: "+m.text;

}).join("\n");

const formData = new FormData();

formData.append("message", transcript);

const res = await fetch(REPLY_ENDPOINT,{

method:"POST",

body:formData,

headers:{

"Accept":"application/json"

}

});

if(res.ok){

waSendEmailStatus.textContent = "Obrolannya udah kekirim ke emailku, makasih yaa 🤍";

waSendEmailStatus.classList.add("reply-status-ok");

}else{

throw new Error("Gagal mengirim");

}

}catch(err){

waSendEmailStatus.textContent = "Yah gagal kekirim, tapi tetep lanjut yaa 🥺";

waSendEmailStatus.classList.add("reply-status-error");

}

nextMessageBtn.disabled = false;

}

function resetWaChat(){

waConversation = [];

waGreeted = false;

waChatBody.innerHTML = '<div class="wa-date-chip">Hari ini</div>';

waInput.value = "";

waSendEmailStatus.textContent = "";

waSendEmailStatus.classList.remove("reply-status-ok","reply-status-error");

waStatus.textContent = "online";

waStatus.classList.remove("typing");

}

// ======================================================
// FINISH
// ======================================================

updateMusicButton();

console.log("❤️ Happy Birthday Website Loaded Successfully ❤️");
