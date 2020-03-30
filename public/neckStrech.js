var screen = 0;
var y=-20;
var x=200;
var speed = 1;
var score= 0;
let video;
let poseNet;
let pose;
let skeleton;

function setup() {
  var cnv = createCanvas(600, 400);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
  background(255, 0, 200);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
  img=loadImage('prof.jpg')
  shark=loadImage('shark.jpg')
}
function gotPoses(poses) {
	//console.log(poses);
	if (poses.length > 0) {
	  pose = poses[0].pose;
	  skeleton = poses[0].skeleton;
	}
}

function modelLoaded() {
	console.log('poseNet ready');
}

function draw() {
	if(screen == 0){
    startScreen()
  }else if(screen == 1){
  	gameOn()
  }else if(screen==2){
  	endScreen()
  }	
}

function startScreen(){
		background(96, 157, 255)
		fill(255)
		textAlign(CENTER);
    text('WELCOME TO MY Neck Streching GAME', width / 2, height / 2)
    text('Try to use your nose to direct the box', width / 2, height / 2)
		text('click to start', width / 2, height / 2 + 20);
		reset();
}

function gameOn(){
  image(video, 0, 0);
  text("score = " + score, 30,20)
  image(img,x,y,20,20)
  // ellipse(x,y,20,20)
  rectMode(CENTER)

  if (pose){

    let nose = pose.nose;
    ellipse(pose.nose.x, pose.nose.y, 16);
    img
    image(shark,nose.x,height-50,70,50)
      y+= speed;
    if(y>height){
        screen =2
       }
    if(y>height-50 && x>nose.x-30 && x<nose.x+30){
        y=-20
      speed+=.02
      score+= 1
    }
      if(y==-20){
        pickRandom();
    }
  }
}

function pickRandom(){
	x= random(200,410)
}

function endScreen(){
		background(150)
		textAlign(CENTER);
		text('GAME OVER', width / 2, height / 2)
  	text("SCORE = " + score, width / 2, height / 2 + 20)
		text('click to play again', width / 2, height / 2 + 40);
}

function mousePressed(){
	if(screen==0){
  	screen=1
  }else if(screen==2){
  	screen=0
  }
}

function reset(){
	  score=0;
  	speed=2;
  	y=-20;
}
