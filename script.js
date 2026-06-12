const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let level = 1;
let lives = 3;

let player = {
    x: 50,
    y: 300,
    w: 30,
    h: 30,
    vx: 0,
    vy: 0,
    onGround: false
};

const gravity = 0.8;

let keys = {};

let goal = {
    x: 720,
    y: 300,
    w: 40,
    h: 40
};

let platforms = [
    {x:0,y:350,w:800,h:50},
    {x:150,y:280,w:100,h:10},
    {x:300,y:230,w:100,h:10},
    {x:450,y:180,w:100,h:10},
    {x:600,y:250,w:100,h:10}
];

function collision(a,b){
    return (
        a.x < b.x + b.w &&
        a.x + a.w > b.x &&
        a.y < b.y + b.h &&
        a.y + a.h > b.y
    );
}

function update(){

    player.vy += gravity;

    player.x += player.vx;
    player.y += player.vy;

    player.onGround = false;

    for(let p of platforms){

        if(collision(player,p)){

            if(player.vy > 0){
                player.y = p.y - player.h;
                player.vy = 0;
                player.onGround = true;
            }
        }
    }

    if(keys.left){
        player.vx = -4;
    }
    else if(keys.right){
        player.vx = 4;
    }
    else{
        player.vx = 0;
    }

    if(collision(player,goal)){

        level++;

        document.getElementById("level").innerText = level;

        player.x = 50;
        player.y = 300;

        goal.x = 720;

        platforms = [
            {x:0,y:350,w:800,h:50},
            {x:100 + Math.random()*200,y:280,w:120,h:10},
            {x:300 + Math.random()*150,y:220,w:120,h:10},
            {x:500 + Math.random()*150,y:170,w:120,h:10}
        ];

        if(level > 5){
            alert("🎉 Mehmet İrem'i Kurtardı!");
            location.reload();
        }
    }
}

function draw(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = "cyan";
    ctx.fillRect(player.x,player.y,player.w,player.h);

    ctx.fillStyle = "white";

    for(let p of platforms){
        ctx.fillRect(p.x,p.y,p.w,p.h);
    }

    ctx.fillStyle = "gold";
    ctx.fillRect(goal.x,goal.y,goal.w,goal.h);
}

function gameLoop(){

    update();
    draw();

    requestAnimationFrame(gameLoop);
}

gameLoop();

document.getElementById("left").ontouchstart = () => {
    keys.left = true;
};

document.getElementById("left").ontouchend = () => {
    keys.left = false;
};

document.getElementById("right").ontouchstart = () => {
    keys.right = true;
};

document.getElementById("right").ontouchend = () => {
    keys.right = false;
};

document.getElementById("jump").ontouchstart = () => {
    if(player.onGround){
        player.vy = -12;
    }
};
