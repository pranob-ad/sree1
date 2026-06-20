function startStory(){

const music = document.getElementById("bgMusic");

document.body.addEventListener(
"click",
()=>{
music.play();
},
{once:true}
);

window.scrollTo({
top: window.innerHeight,
behavior: "smooth"
});

}

function celebrate(){

document.getElementById("result").innerHTML =
"❤️ You are mine ~ I am Your ❤️<br><br>And Our so a beautiful story begins...";

for(let i=0;i<120;i++){

setTimeout(()=>{

createHeart();

},i*40);

}

}

function createHeart(){

const heart=document.createElement("div");

heart.classList.add("heart");

heart.innerHTML=["❤️","💖","💕","💘"][Math.floor(Math.random()*4)];

heart.style.left=Math.random()*100+"vw";

heart.style.fontSize=
(Math.random()*25+15)+"px";

document.body.appendChild(heart);

setTimeout(()=>{

heart.remove();

},5000);

}

setInterval(()=>{

const heart=document.createElement("div");

heart.classList.add("heart");

heart.innerHTML="✨";

heart.style.left=Math.random()*100+"vw";

heart.style.fontSize=
(Math.random()*15+10)+"px";

document.body.appendChild(heart);

setTimeout(()=>{

heart.remove();

},5000);

},600);

const btn = document.getElementById("musicBtn");

btn.addEventListener("click", () => {

    if(music.paused){
        music.play();
        btn.innerHTML = "🎵 Playing";
    }else{
        music.pause();
        btn.innerHTML = "🔇 Paused";
    }

});
