var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var xpos =1;
var ypos =1;
var p2x = 13;
var p2y = 1;
const grit =[];
var duration =30;
//var counter = 184;

class Cell{
    constructor (x,y, xpos, ypos){
        this.x = x;
        this.y =y;
        this.wall = false;
        this.bombe = false;
        this.zerstoerbar = true;
        this.player1 = false;
        this.player2 = false;

        if (x ===1 && y === 1){
            this.player1 = true;
        }
        if(x === 13 && y ===1){
            this.player2 = true;
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

    /*ctx.beginPath();
    ctx.arc(xpos*40+20,ypos*40+20,20,0,2*Math.PI);
    ctx.stroke();*/
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
    ypos = window.player1.ypos;
    xpos = window.player1.xpos;
    p2x = window.player2.xpos;
    p2y = window.player2.ypos;

    if (keyName == "ArrowUp")
    {
        if(grit[xpos][ypos-1].wall === false){
            grit[xpos][ypos-1].player1 = true;
            grit[xpos][ypos].player1 = false;
            ypos= ypos-1;
        }
    }
    if (keyName == "ArrowDown")
    {   
        if(grit[xpos][ypos+1].wall === false){
        grit[xpos][ypos+1].player1 = true;
        grit[xpos][ypos].player1 = false;
        ypos= ypos+1;
        }
    }
    if (keyName == "ArrowLeft")
    {
        if(grit[xpos-1][ypos].wall === false){
        grit[xpos-1][ypos].player1 = true;
        grit[xpos][ypos].player1 = false;
        xpos= xpos-1;
        }
    }
    if (keyName == "ArrowRight")
    {
        if(grit[xpos+1][ypos].wall === false){
            grit[xpos+1][ypos].player1 = true;
            grit[xpos][ypos].player1 = false;
            xpos= xpos+1;
        }
    }
    if (keyName == "w")
    {
        if(grit[p2x][p2y-1].wall === false){
            grit[p2x][p2y-1].player2 = true;
            grit[p2x][p2y].player2 = false;
            p2y= p2y-1;   
        }
    }
    if (keyName == "s")
    {   
        if(grit[p2x][p2y+1].wall === false){
        grit[p2x][p2y+1].player2 = true;
        grit[p2x][p2y].player2 = false;
        p2y= p2y+1;
        }
    }
    if (keyName == "a")
    {
        if(grit[p2x-1][p2y].wall === false){
        grit[p2x-1][p2y].player2 = true;
        grit[p2x][p2y].player2 = false;
        p2x= p2x-1;
        }
    }
    if (keyName == "d")
    {
        if(grit[p2x+1][p2y].wall === false){
            grit[p2x+1][p2y].player2 = true;
            grit[p2x][p2y].player2 = false;
            p2x= p2x+1;
        }
    }
    if (keyName == "m"){
        grit[xpos][ypos].bombe = true;
        explosion(xpos,ypos);  
    }
    if (keyName == "x"){
        grit[p2x][p2y].bombe = true;
        explosion(p2x,p2y);  
    }
    window.player1.ypos=ypos;
    window.player1.xpos=xpos;
    window.player2.xpos=p2x;
    window.player2.ypos=p2y;
});

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
    var img = document.getElementById("Bomber");
    setInterval(function(){
    ctx.drawImage(img,window.player1.xpos*40,window.player1.ypos*40, 40,40);
    ctx.drawImage(img,window.player2.xpos*40,window.player2.ypos*40, 40,40);
    },10)

    var img2 = document.getElementById("Bomber3");
    setInterval(function(){
        ctx.drawImage(img2,window.player1.xpos*40,window.player1.ypos*40, 40,40);
        ctx.drawImage(img2,window.player2.xpos*40,window.player2.ypos*40, 40,40);
    },10)

    var img3 = document.getElementById("Bomber2");
    setInterval(function(){
    ctx.drawImage(img3,window.player1.xpos*40,window.player1.ypos*40, 40,40);
    ctx.drawImage(img3,window.player2.xpos*40,window.player2.ypos*40, 40,40);
    },10)
}

function zBloecke(){
    for (let i=1; i<14; i++){
        for (let j=1; j<14; j++){
                if ( grit[i][j].wall === false){
                    if (random()===0){
                        grit[i][j].wall = true;
                    } 
                }     
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
    var img = document.getElementById("Bomb");
    ctx.drawImage(img,grit[xpos][ypos].x*40, grit[xpos][ypos].y*40, 40,40);
}

function explosion(x,y,counter){
    var yrange = 0;
    var xrange = 0;
    var verlierer = document.querySelector("#GameOver");
    setTimeout(function(){
    ctx.fillStyle = "#FF0000";
    if(grit[x][y+1].zerstoerbar === true){
        yrange = 80;        
        grit[x][y+1].wall = false;
        ctx.fillRect(grit[x][y].x*40, grit[x][y].y*40, 40, yrange);
        if(grit[x][y].player1 === true || grit[x][y+1].player1 === true){
            verlierer.textContent = "Player 1 has lost";
            GameOver();
           
        }
        if(grit[x][y].player2 === true || grit[x][y+1].player2 === true){
            GameOver();
            verlierer.textContent = "Player 2 has lost";
         }
    }

    if(grit[x][y-1].zerstoerbar === true){
        yrange= 80;     
        grit[x][y-1].wall = false;
        ctx.fillRect(grit[x][y].x*40, grit[x][y].y*40+40, 40, -yrange);
        if(grit[x][y].player1 === true || grit[x][y-1].player1 === true){
           GameOver();
           verlierer.textContent = "Player 1 has lost";
        }
        if(grit[x][y].player2 === true || grit[x][y-1].player2 === true){
            GameOver();
            verlierer.textContent = "Player 2 has lost";
         }
    }
    
    if(grit[x-1][y].zerstoerbar === true){
        xrange= 80;     
        grit[x-1][y].wall = false;
        ctx.fillRect(grit[x][y].x*40+40, grit[x][y].y*40, -xrange, 40);
        if(grit[x][y].player1 === true || grit[x-1][y].player1 === true){
           GameOver();
           verlierer.textContent = "Player 1 has lost";
        }
        if(grit[x][y].player2 === true || grit[x-1][y].player2 === true){
            GameOver();
            verlierer.textContent = "Player 2 has lost";
         }
    }
    
    if(grit[x+1][y].zerstoerbar === true){
        xrange= 80;     
        grit[x+1][y].wall = false;
        ctx.fillRect(grit[x][y].x*40, grit[x][y].y*40, xrange, 40);
        if(grit[x][y].player1 === true || grit[x+1][y].player1 === true){
           GameOver();
           verlierer.textContent = "Player 1 has lost";
        }
        if(grit[x][y].player2 === true || grit[x-1][y].player2 === true){
            GameOver();
            verlierer.textContent = "Player 2 has lost";
         }
    }
    grit[x][y].bombe = false;
},1000)}

function loop(){
    ctx.clearRect(0,0,600,600);
    draw();
    for (let i =0; i<15; i++){
        for (let j=0; j<15; j++){
            if(grit[i][j].bombe === true){
                bombe(i, j);  
            }
        }
    }
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
        document.getElementById("Kasten").style.visibility="visible";
        document.getElementById("Bomberman").style.visibility="visible";
        document.getElementById("menue").style.visibility="visible";
        document.getElementById("Player1").style.visibility="hidden";
        document.getElementById("Player2").style.visibility="hidden";
        document.getElementById("Bombe").style.visibility="visible";
        document.getElementById("Bomb2").style.visibility="visible";
        setTimeout(function(){
            document.getElementById("Bombe").style.visibility="hidden";
        },6000)
        var verlierer = document.querySelector('#GameOver');

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

function start(){
    document.getElementById("myCanvas").style.visibility = "visible";
    document.getElementById("Start").style.visibility="hidden";
    document.getElementById("GameOver").style.visibility = "hidden";
    document.getElementById("Controls").style.visibility="hidden";
    document.getElementById("Kasten").style.visibility="hidden";
    document.getElementById("Bomberman").style.visibility="hidden";
    document.getElementById("menue").style.visibility="hidden";
    document.getElementById("Bombe").style.visibility="hidden";
    document.getElementById("Bomb2").style.visibility="hidden";
    zBloecke();
    window.player1 = new Bomber(xpos,ypos);
    window.player2= new Bomber(p2x,p2y);
    setInterval(loop,50);
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