let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const height=canvas.height
const width=canvas.width
const r=10;
/*
ctx.fillStyle = "#00A308";
ctx.beginPath();
ctx.arc(220, 220, 50, 0, Math.PI*2, true);
ctx.closePath();
ctx.fill();
ctx.fillStyle = "#FF1C0A";
ctx.beginPath();
ctx.arc(100, 100, 100, 0, Math.PI*2, true);
ctx.closePath();
ctx.fill();
//the rectangle is half transparent
ctx.fillStyle = "rgba(255, 255, 0, .5)"
ctx.beginPath();
ctx.rect(15, 150, 120, 120);
ctx.closePath();
ctx.fill();
*/
var paddlex;
var paddleh;
var paddlew;

var rowheight;
var colwidth;
var row ;
var col;



function init_paddle() {
    paddlew = 100;
    //paddlex = da ga narise v sredini
    paddlex = (width / 2) - (paddlew/2);  //(500/2) - (100/2) = 200
    paddleh = 10; 
}

 var dx = 0;   																	/*hitrost zoge*/11111111111
 var dy = 0;

function drawIt() {
    /*var x = 180; */
	var x=Math.floor(Math.random() * 570) + 30;
    var y = 280;
   
    
    
    function init() { 
      canvas=document.getElementById('canvas');
      ctx = canvas.getContext('2d');
      return setInterval(draw, 0.01); //klic funkcije draw vsakih 10 ms; http://www.w3schools.com/jsref/met_win_setinterval.asp
    }



   function draw() {
      //vse zbrise
      clear();
      //narisce krog
      cicle(x,y,10);
      //narise ploscek (prvi dve sta poziciji kje se nahaja)
      rect(paddlex, height-paddleh /*500-10==490*/, paddlew, paddleh);
      
      
      //collision with borders!!   //zidi hehe
      if (x + dx > width - r || x + dx < r) {  //prva desno, druga levo
        dx = -dx;
		location.reload();
		alert("YOU LOST");
	  }
		
		
		
     if (y + dy > height - r /*|| y + dy < r*/) { //prva spodaj, druga zgoraj
        dy = -dy;
		location.reload();
		alert("You LOST");
	 }
      x += dx;
      y += dy; 
	  
	  
	 if(y + dy < r)
	 {
		 dy = -dy; 

	 }
	  
      //----------------------------


    if (x + dx > width-r || x + dx < 0+r)  // gleda sirino ploscka
      dx = -dx;
    else if (y + dy > height - r - paddleh) {  //gleda visino ploscka
      console.log("WE HIT A BRIKK")
      if (x > paddlex && x < paddlex + paddlew) {
        dx = 3 * ((x-(paddlex+paddlew/2))/paddlew);
        dy = -dy;
      }
      else
        0+0//clearInterval(intervalId);
    }
    
    




    //premikanje ploscka levo - denso
    if (rightDown) paddlex += 3;
    else if (leftDown) paddlex -= 3;
    //omejevanje ploscka oz da plosecek ne gre iz canvasa
    if(rightDown){
      if((paddlex+paddlew) < width){
        paddlex += 0.5;
      }else{
        paddlex = width-paddlew;
      }
      }
        else if(leftDown){
      if(paddlex>0){
        paddlex -=0.5;
      }else{
        paddlex=0;
      }
    }




    //riši opeke
  for (i=0; i < NROWS; i++) {
    for (j=0; j < NCOLS; j++) {
      if (bricks[i][j] > 0) {
        rect((j * (BRICKWIDTH + PADDING)) + PADDING,
            (i * (BRICKHEIGHT+ PADDING)) + PADDING,
            BRICKWIDTH, BRICKHEIGHT);
      }
    }
  }
  /**/
 
//podiranje
  
  rowheight = (BRICKHEIGHT + PADDING); //Smo zadeli opeko?
  colwidth = (BRICKWIDTH + PADDING) ;
  row = Math.floor(y/rowheight);
  col = Math.floor(x/colwidth);
//Če smo zadeli opeko, vrni povratno kroglo in označi v tabeli, da opeke ni več
  if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] > 0) {
      dy=-dy;

    bricks[row][col] -= 1;
  } 
  prev_row= row;
  prev_col= col;
    }
    init();
  }
  
  
  

    //zbrise vse
    function clear(){
        ctx.clearRect(0,0,height,width);
    }
    //narise krog
    function cicle(x, y, c){
        ctx.beginPath();
        ctx.arc(x, y, c, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fillStyle = "black";
        ctx.fill();
    }
    // narise ploscek
    function rect(x, y, width, height){
        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.fillStyle = "#000033";
        ctx.fill();
        ctx.closePath();
        
    }
    init_paddle();



    var bricks;
    var NROWS;
    var NCOLS;
    var BRICKWIDTH;
    var BRICKHEIGHT;
    var PADDING;
	
	//NROWS = 10;
    //NCOLS = 10;
	BRICKHEIGHT = 40;
	PADDING = 10;
 
    function initbricks() { //inicializacija opek - polnjenje v tabelo
      
      
      BRICKWIDTH = (width/NCOLS) - PADDING - PADDING/NCOLS ;
     
      
      bricks = new Array(NROWS);
      for (i=0; i < NROWS; i++) {
        bricks[i] = new Array(NCOLS);
        for (j=0; j < NCOLS; j++) {
          bricks[i][j] = 1;
        }
      }
    }
    initbricks();




//nastavljanje premikanja ploscka spodaj
var rightDown = false;
var leftDown = false;
var canvasMinX;
var canvasMaxX;

//nastavljanje leve in desne tipke

function onKeyDown(evt) {
  if (evt.keyCode == 39)
rightDown = true;
  else if (evt.keyCode == 37) leftDown = true;
}

function onKeyUp(evt) {
  if (evt.keyCode == 39)
rightDown = false;
  else if (evt.keyCode == 37) leftDown = false;
}
$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp); 


function init_mouse() {
  //canvasMinX = $("#canvas").offset().left;
  canvasMinX = $("canvas").offset().left + paddlew / 2;
  canvasMaxX = canvasMinX + width - paddlew;
}

function onMouseMove(evt) {
  if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
    paddlex = evt.pageX - canvasMinX;
  }
}
$(document).mousemove(onMouseMove); 

init_mouse();



//koda maks




function myFunction1(){
	
	
	
	
	dx=(Math.random() * 3)-1;
	dy=(Math.random() * 1)+1;
	alert("THE GAME IS ABOUT TO START");
	NROWS=5;
	NCOLS=5;
	PADDING=10;
	BRICKHEIGHT=40;
	const myTimeout = setTimeout(drawIt, 1000);
	const myTimeout2 = setTimeout(initbricks, 1000);
	
}

function myFunction2(){
	
	
	dx=(Math.random() * 4)-2;
	dy=(Math.random() * 2)+1;
	alert("THE GAME IS ABOUT TO START");
	NROWS=7;
	NCOLS=10;
	PADDING=3;
	BRICKHEIGHT=30;
	const myTimeout = setTimeout(drawIt, 1000);
	const myTimeout2 = setTimeout(initbricks, 1000);
	
}

function myFunction3(){
	
	
	dx=(Math.random() * 6) -3;
	dy=(Math.random() * 2)+2;
	alert("THE GAME IS ABOUT TO START");
	NROWS=12;
	NCOLS=10;
	PADDING=2;
	BRICKHEIGHT=20;
	const myTimeout = setTimeout(drawIt, 1000);
	const myTimeout2 = setTimeout(initbricks, 1000);
	
}




