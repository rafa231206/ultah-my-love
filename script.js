//
// =========================
// ELEMENT
// =======================
const openBtn = document.getElementById("openGift");
const replayBtn = document.getElementById("replay");

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

const hiddenContent = document.getElementById("hiddenContent");

const loading = document.getElementById("loading");

const hearts = document.getElementById("hearts");

const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

const typing = document.getElementById("typing");

// =========================
// LOCK SCROLL
// =========================

document.body.classList.add("lock-scroll");

// sembunyikan isi hadiah

hiddenContent.style.display = "none";

// =========================
// LOADING
// =========================

window.addEventListener("load",()=>{

    setTimeout(()=>{

        loading.style.opacity="0";

        setTimeout(()=>{

            loading.style.display="none";

        },800);

    },1500);

});

// =========================
// MUSIC BUTTON
// =========================

musicBtn.innerHTML="🔇";

musicBtn.addEventListener("click",()=>{

    if(music.paused){

        music.play().catch(()=>{});

        musicBtn.innerHTML="🔊";

    }else{

        music.pause();

        musicBtn.innerHTML="🔇";

    }

});

// =========================
// OPEN GIFT
// =========================

openBtn.addEventListener("click",()=>{

    hiddenContent.style.display="block";

    setTimeout(()=>{

        hiddenContent.classList.add("show");

    },100);

    document.body.classList.remove("lock-scroll");

    music.play().catch(()=>{});

    musicBtn.innerHTML="🔊";

    createConfetti();

    birthdayPopup();

    for(let i=0;i<80;i++){

        setTimeout(sparkle,i*30);

    }

    setTimeout(()=>{

        document.querySelector(".video-section").scrollIntoView({

            behavior:"smooth"

        });

    },500);

});

// =========================
// REPLAY
// =========================

replayBtn.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

    if(music.paused){

        music.play();

        musicBtn.innerHTML="🔊";

    }

});

// =========================
// HEART EFFECT
// =========================

function createHeart(){

    const heart=document.createElement("div");

    heart.className="heart";

    heart.innerHTML=["❤","💖","💕","💗","💘"][Math.floor(Math.random()*5)];

    heart.style.left=Math.random()*100+"vw";

    heart.style.fontSize=(18+Math.random()*20)+"px";

    heart.style.animationDuration=(5+Math.random()*5)+"s";

    hearts.appendChild(heart);

    setTimeout(()=>{

        heart.remove();

    },10000);

}

setInterval(createHeart,300);
// =========================
// SCROLL ANIMATION
// =========================

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.style.opacity="1";
            entry.target.style.transform="translateY(0)";

        }

    });

},{
    threshold:0.15
});

sections.forEach(section=>{

    section.style.opacity="0";

    section.style.transform="translateY(70px)";

    section.style.transition="1s";

    observer.observe(section);

});

// =========================
// TYPING EFFECT
// =========================

const message = typing.innerHTML;

typing.innerHTML="";

let typingIndex=0;

function typeWriter(){

    if(typingIndex < message.length){

        typing.innerHTML += message.charAt(typingIndex);

        typingIndex++;

        setTimeout(typeWriter,35);

    }

}

const typingObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            if(typingIndex===0){

                typeWriter();

            }

        }

    });

});

typingObserver.observe(typing);

// =========================
// COUNTDOWN
// =========================

const startDate = new Date(2026,3,18);

function updateTime(){

    const now = new Date();

    const diff = now - startDate;

    const days = Math.floor(diff/(1000*60*60*24));

    const hours = Math.floor(diff/(1000*60*60))%24;

    const minutes = Math.floor(diff/(1000*60))%60;

    const seconds = Math.floor(diff/1000)%60;

    document.getElementById("days").textContent=days;

    document.getElementById("hours").textContent=
    hours.toString().padStart(2,"0");

    document.getElementById("minutes").textContent=
    minutes.toString().padStart(2,"0");

    document.getElementById("seconds").textContent=
    seconds.toString().padStart(2,"0");

}

updateTime();

setInterval(updateTime,1000);

// =========================
// POPUP
// =========================

function birthdayPopup(){

    const popup=document.createElement("div");

    popup.innerHTML="🎉 Happy Birthday 🤍";

    popup.style.position="fixed";
    popup.style.left="50%";
    popup.style.top="50%";
    popup.style.transform="translate(-50%,-50%)";

    popup.style.background="#ffffff";
    popup.style.color="#ff4f92";

    popup.style.padding="20px 40px";

    popup.style.borderRadius="20px";

    popup.style.fontSize="30px";

    popup.style.fontWeight="bold";

    popup.style.zIndex="999999";

    popup.style.boxShadow="0 15px 40px rgba(0,0,0,.25)";

    document.body.appendChild(popup);

    setTimeout(()=>{

        popup.remove();

    },2500);

}

// =========================
// SPARKLE EFFECT
// =========================

function sparkle(){

    const star=document.createElement("div");

    star.innerHTML="✨";

    star.style.position="fixed";

    star.style.left=Math.random()*window.innerWidth+"px";

    star.style.top=Math.random()*window.innerHeight+"px";

    star.style.fontSize=(15+Math.random()*20)+"px";

    star.style.pointerEvents="none";

    star.style.transition="1.5s";

    star.style.zIndex="99999";

    document.body.appendChild(star);

    setTimeout(()=>{

        star.style.opacity="0";

        star.style.transform="translateY(-60px)";

    },100);

    setTimeout(()=>{

        star.remove();

    },1600);

                 }
// =========================
// CONFETTI
// =========================

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

window.addEventListener("resize",()=>{

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

});

function createConfetti(){

    particles=[];

    for(let i=0;i<180;i++){

        particles.push({

            x:Math.random()*canvas.width,

            y:Math.random()*-canvas.height,

            r:Math.random()*6+4,

            dx:(Math.random()-0.5)*3,

            dy:Math.random()*3+2,

            color:[
                "#ff4f92",
                "#ff85b3",
                "#ffd166",
                "#ffffff",
                "#ffb6c1"
            ][Math.floor(Math.random()*5)]

        });

    }

    animateConfetti();

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

        if(p.y>canvas.height){

            p.y=-20;

            p.x=Math.random()*canvas.width;

        }

    });

    requestAnimationFrame(animateConfetti);

}

// =========================
// GALLERY LIGHTBOX
// =========================

const images=document.querySelectorAll(".gallery-grid img");

const lightbox=document.createElement("div");

lightbox.id="lightbox";

lightbox.innerHTML=`
<span id="closeLightbox">&times;</span>
<img id="lightboxImage">
`;

document.body.appendChild(lightbox);

const lightboxImage=document.getElementById("lightboxImage");

images.forEach(img=>{

    img.addEventListener("click",()=>{

        lightbox.style.display="flex";

        lightboxImage.src=img.src;

    });

});

lightbox.addEventListener("click",(e)=>{

    if(
        e.target===lightbox ||
        e.target.id==="closeLightbox"
    ){

        lightbox.style.display="none";

    }

});

// =========================
// BUTTON GLOW
// =========================

setInterval(()=>{

    openBtn.animate([

        {
            transform:"scale(1)"
        },

        {
            transform:"scale(1.08)"
        },

        {
            transform:"scale(1)"
        }

    ],{

        duration:1800

    });

},1800);

// =========================
// PARALLAX
// =========================

window.addEventListener("scroll",()=>{

    document.body.style.backgroundPositionY=

    -(window.scrollY*0.2)+"px";

});

// =========================
// END
// =========================

console.log("❤️ Happy Birthday ❤️");
console.log(=
