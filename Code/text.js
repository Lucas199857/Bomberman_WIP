var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var xpos =1;
var ypos =1;
var p2x = 13;
var p2y = 1;
const grit =[];
var duration =30;
//var counter = 0;

class Cell{
    constructor (x,y, xpos, ypos){
        this.x = x;
        this.y =y;
        this.wall = false;
        this.bombe = false;
        this.zerstoerbar = true;
        this.player = false;
        if (x ===1 && y === 1 || x === 13 && y ===1){
            this.player = true;
        }
        if (x === 0 || y ===0 || x=== 14 || y=== 14){
            this.wall= true;
            this.zerstoerbar = false;
        }
        for(let j=2; j<14; j+=2){
            for (let i=2; i<14;i=i+2){
                if(x=== i && y=== j){
                    this.wall = true;
                    this.zerstoerbar = false;
                }    
            }
        }
    }
}

class Bomber{
    constructor (xpos,ypos){
        this.xpos =xpos;
        this.ypos =ypos;

    ctx.beginPath();
    ctx.arc(xpos*40+20,ypos*40+20,20,0,2*Math.PI);
    ctx.stroke();
    }
}
for (let i=0; i<15; i++)
{
    var reihe=[];
    for (let j=0; j<15; j++){
        reihe.push(new Cell(i,j)); 
    }
    grit.push(reihe);
}
window.grid = grit;

document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    if (keyName == "ArrowUp")
    {
        if(grit[xpos][ypos-1].wall === false){
            grit[xpos][ypos-1].player = true;
            grit[xpos][ypos].player = false;
            ypos= ypos-1;
            
        }
    }
    if (keyName == "ArrowDown")
    {   
        if(grit[xpos][ypos+1].wall === false){
        grit[xpos][ypos+1].player = true;
        grit[xpos][ypos].player = false;
        ypos= ypos+1;
        }
    }
    if (keyName == "ArrowLeft")
    {
        if(grit[xpos-1][ypos].wall === false){
        grit[xpos-1][ypos].player = true;
        grit[xpos][ypos].player = false;
        xpos= xpos-1;
        }
    }
    if (keyName == "ArrowRight")
    {
        if(grit[xpos+1][ypos].wall === false){
            grit[xpos+1][ypos].player = true;
            grit[xpos][ypos].player = false;
            xpos= xpos+1;
        }
    }
    if (keyName == "w")
    {
        if(grit[p2x][p2y-1].wall === false){
            grit[p2x][p2y-1].player = true;
            grit[p2x][p2y].player = false;
            p2y= p2y-1;   
        }
    }
    if (keyName == "s")
    {   
        if(grit[p2x][p2y+1].wall === false){
        grit[p2x][p2y+1].player = true;
        grit[p2x][p2y].player = false;
        p2y= p2y+1;
        }
    }
    if (keyName == "a")
    {
        if(grit[p2x-1][p2y].wall === false){
        grit[p2x-1][p2y].player = true;
        grit[p2x][p2y].player = false;
        p2x= p2x-1;
        }
    }
    if (keyName == "d")
    {
        if(grit[p2x+1][p2y].wall === false){
            grit[p2x+1][p2y].player = true;
            grit[p2x][p2y].player = false;
            p2x= p2x+1;
        }
    }
    if (keyName == "Enter"){
        grit[xpos][ypos].bombe = true;
    }
    if (keyName == "x"){
        grit[p2x][p2y].bombe = true;
    }
    Main();
});

window.onload = function () {
    var display = document.querySelector('#time');
    startTimer(display, duration);
}

function draw(){
    ctx.fillStyle = "#00a500";
    ctx.fillRect(0, 0, 600, 600);
    for (let i =0; i<15; i++){
        for (let j=0; j<15; j++){
            if (grit[i][j].wall=== true){
                ctx.strokeStyle = "black";
                ctx.fillStyle = "#D3D3D3";
                if(grit[i][j].zerstoerbar=== true){
                    ctx.fillStyle = "#528B8B";   
                }
                ctx.fillRect(i*40,j*40,40,40);
                ctx.strokeRect(i*40,j*40,40,40);
           }
       }
   }
}

function zBloecke(){
    for (let i=1; i<14; i++){
        for (let j=1; j<14; j++){
            //if(grit[i][j].x != 1 && grit[i][j].y != 1){
                if ( grit[i][j].wall === false){
                    if (random()===0){
                        grit[i][j].wall = true;
                    } 
                }  
            //}     
        }
    }
    grit[1][1].wall = false;
    grit[1][2].wall = false;
    grit[2][1].wall = false;
    grit[13][1].wall = false;
    grit[13][2].wall = false;
    grit[12][1].wall = false;
}
function bombe(xpos,ypos){
    ctx.beginPath();
    ctx.arc(grit[xpos][ypos].x*40+20,grit[xpos][ypos].y*40+20,10,0,2*Math.PI);
    ctx.stroke();
}

function explosion(x,y,counter){
    var yrange = 0;
    var xrange = 0;
    setTimeout(function(){
    ctx.fillStyle = "#FF0000";
    //if (counter == 3){
    if(grit[x][y+1].zerstoerbar === true){
        yrange = 80;        
        grit[x][y+1].wall = false;
        ctx.fillRect(grit[x][y].x*40, grit[x][y].y*40, 40, yrange);
        if(grit[x][y].player === true || grit[x][y+1].player === true){
           GameOver();
        }
    }

    if(grit[x][y-1].zerstoerbar === true){
        yrange= 80;     
        grit[x][y-1].wall = false;
        ctx.fillRect(grit[x][y].x*40, grit[x][y].y*40+40, 40, -yrange);
        if(grit[x][y].player === true || grit[x][y-1].player === true){
           GameOver();
        }
    }
    
    if(grit[x-1][y].zerstoerbar === true){
        xrange= 80;     
        grit[x-1][y].wall = false;
        ctx.fillRect(grit[x][y].x*40+40, grit[x][y].y*40, -xrange, 40);
        if(grit[x][y].player === true || grit[x-1][y].player === true){
           GameOver();
        }
    }
    
    if(grit[x+1][y].zerstoerbar === true){
        xrange= 80;     
        grit[x+1][y].wall = false;
        ctx.fillRect(grit[x][y].x*40, grit[x][y].y*40, xrange, 40);
        if(grit[x][y].player === true || grit[x+1][y].player === true){
           GameOver();
        }
    }
    
    grit[x][y].bombe = false;

    //}
    //counter = counter+1;
},1000)}

function loop(){
    ctx.clearRect(0,0,600,600);
    draw();
    new Bomber(xpos,ypos);
    new Bomber(p2x,p2y);
    for (let i =0; i<15; i++){
        for (let j=0; j<15; j++){
            if(grit[i][j].bombe === true){
                bombe(i, j);
                explosion(i,j);   
            }
        }
    }
    //counter = counter+1;
}

function random(){
    var z= Math.round(Math.random() * (1-0));
    return z;
}

function GameOver(){
    setTimeout(function(){
        document.getElementById("GameOver").style.visibility = "visible";
        document.getElementById("myCanvas").style.visibility = "hidden";
        document.getElementById("Start").style.visibility="visible";
        document.getElementById("time").style.visibility="hidden";
        document.getElementById("Kasten").style.visibility="visible";
        document.getElementById("Bomberman").style.visibility="visible";
        document.getElementById("menue").style.visibility="visible";
        document.getElementById("Player1").style.visibility="hidden";
        document.getElementById("Player2").style.visibility="hidden";
        document.getElementById("Bombe").style.visibility="visible";
        setTimeout(function(){
            document.getElementById("Bombe").style.visibility="hidden";
        },6000)
    xpos= 1;
    ypos= 1;
    p2x = 13;
    p2y = 1;

    for (let i=1; i<14; i++){
        for (let j=1; j<14; j++){
            if(grit[i][j].zerstoerbar === true){
                grit[i][j].wall = false;
            }
        }
    }
},1000)
}

function endgame(){
    /*for(let j=13; j>=0; j--){
        setInterval(function () {
        for(let i=1; i<14; i++){
            grit[i][j].wall= true;
        }
        }, 5000);
    }*/
}

function startTimer(display, duration) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if(timer === 0){
            endgame();
        }
        if (--timer < 0) {
            timer = duration;
        }

     
    }, 1000);
}
function start(){
    document.getElementById("myCanvas").style.visibility = "visible";
    document.getElementById("Start").style.visibility="hidden";
    document.getElementById("GameOver").style.visibility = "hidden";
    document.getElementById("time").style.visibility="visible";
    document.getElementById("Controls").style.visibility="hidden";
    document.getElementById("Kasten").style.visibility="hidden";
    document.getElementById("Bomberman").style.visibility="hidden";
    document.getElementById("menue").style.visibility="hidden";
    document.getElementById("Bombe").style.visibility="hidden";
    zBloecke();
    Main();
}
function Main(){
    setInterval(loop(),3000);
}
function menue(){
    document.getElementById("Start").style.visibility="visible";
    document.getElementById("Controls").style.visibility="visible";
    document.getElementById("Kasten").style.visibility="visible";
    document.getElementById("Bomberman").style.visibility="visible";
    document.getElementById("menue").style.visibility="hidden";
    document.getElementById("GameOver").style.visibility = "hidden";
    document.getElementById("Player1").style.visibility="hidden";
    document.getElementById("Player2").style.visibility="hidden";
    document.getElementById("Bombe").style.visibility="hidden";
}
function controls(){
    document.getElementById("Start").style.visibility="hidden";
    document.getElementById("Controls").style.visibility="hidden";
    document.getElementById("Player1").style.visibility="visible";
    document.getElementById("Player2").style.visibility="visible";
    document.getElementById("menue").style.visibility="visible";
}