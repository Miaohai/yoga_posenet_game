let video;
let poseNet;
let pose;
let skeleton;
var score = 0;
var screen = 0;
let fir_object;
let sec_object;
let third_object;
let circles = [];
var timerValue = 60;


function between(min, max) {  
    return Math.floor(
      Math.random() * (max - min + 1) + min
    )
  }

function setup() {
  var cnv = createCanvas(630, 400);
  noStroke();
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
  background(255, 0, 200);
  textAlign(CENTER);
  setInterval(timeIt, 1000);

  video = createCapture(VIDEO);
  console.log(video)
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
  soundFormats('mp3', 'ogg');

  hihat = loadSound('assets/hihat.mp3');

  fir_object = new First(width / 2, height / 2, 80);

  sec_object = new Second(width / 2, height / 2, 80);

  third_object = new Third(width / 2, height / 2, 80);
  
  fir_count = 0;
  sec_count  = 0;
  third_count = 0;
}

// leftWrist class
class First {
    constructor(x_, y_, r_) {
    // Location and size
    //   TO-DO
    // Need to change the coordinate 
      this.x = 100;
      this.y = 200;
      this.r = 50;
    }
    // Is a point inside the lw_object? (used for mouse rollover, etc.)
    contains(mx, my) {
      return dist(mx, my, this.x, this.y) < this.r;
    }

    changecolor(){
      let c = color(255, 204, 0); // Define color 'c'
      fill(c); // Use color variable 'c' as fill color
      ellipse(this.x, this.y, this.r, this.r);
    }
  
    // Show the lw_object (hardcoded colors, could be improved)
    display(mx,my,x) {
      if (this.contains(mx, my)) {
        fill(50);
      } else {
        fill(50);
      }
      stroke(0);
      strokeWeight(4);
      if (x==0){
        ellipse(this.x, this.y, this.r, this.r);
        // second poses
      }else if (x==1){
        this.x = mx;
        this.y = my;
        fill(255,0,150,100);
        noStroke();
        ellipse(this.x, this.y, this.r*2, this.r*2);
        // third poses
      }
    }
  }


  class Second {
    constructor(x_, y_, r_) {
      // Location and size
    //   TO-DO
     // Need to change the coordinate 
      this.x = 400;
      this.y = 200;
      this.r = 50;
    }
    contains(mx, my) {
      return dist(mx, my, this.x, this.y) < this.r;
    }

    changecolor(){
      let c = color(255, 204, 0); // Define color 'c'
      fill(c); // Use color variable 'c' as fill color
      ellipse(this.x, this.y, this.r, this.r);
    }
  
    display(mx, my, x) {
      if (this.contains(mx, my)) {
        fill(50);
      } else {
        fill(50);
      }
      stroke(0);
      strokeWeight(4);
      if (x==0){
        ellipse(this.x, this.y, this.r, this.r);
      }else if(x==1){
        this.x = mx;
        this.y = my;
        fill(255,0,150,100);
        noStroke();
        ellipse(this.x, this.y, this.r*2, this.r*2);
      }
    }

  }


class Third {
    constructor(x_, y_, r_) {
      // Location and size
    //   TO-DO
     // Need to change the coordinate 
      this.x = 300;
      this.y = 200;
      this.r = 50;
    }
    contains(mx, my) {
      return dist(mx, my, this.x, this.y) < this.r;
    }

    changecolor(){
      let c = color(255, 204, 0); // Define color 'c'
      fill(c); // Use color variable 'c' as fill color
      ellipse(this.x, this.y, this.r, this.r);
    }
  
    display(mx, my,x) {
      if (this.contains(mx, my)) {
        fill(50);
      } else {
        fill(50);
      }
      stroke(0);
      strokeWeight(4);
      if (x==0){
        ellipse(this.x, this.y, this.r, this.r);
      }else if(x==1){
        this.x = mx;
        this.y = my;
        console.log(this.y)
        fill(255,0,150,100);
        noStroke();
        ellipse(this.x, this.y, this.r*2, this.r*2);
      }
    }

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
    timerValue=60
  }	
}


function startScreen(){
  background(96, 157, 255)
  fill(255)
  textAlign(CENTER);
  text('WELCOME TO MY Warm up Game', width / 2, height / 2)
  text('click to start', width / 2, height / 2 + 20);
  reset();
}


function timeIt() {
  if (timerValue > 0) {
    timerValue--;
  }
}


function gameOn() {
    image(video, 0, 0, video.width, video.height);
    background(255, 255, 255); 
    text("score = " + score, 30,20)
    text('0:' + timerValue,  600,20);
    translate(video.width, 0);
    scale(-1, 1); 
    if (timerValue == 0) {
      screen=2;
    }

    if (pose) {
        fill(255, 0, 0);
        ellipse(pose.nose.x, pose.nose.y, 20);

        strokeWeight(4);
        stroke(0);
        fill(255, 255, 255)
        rect(pose.nose.x-50, pose.nose.y-30, 100, 60);


        fill(0, 0, 255);
        noStroke(); 
        fill(255,0,0);
        ellipse(pose.rightWrist.x, pose.rightWrist.y, 16);
        fill(255,0,0);
        ellipse(pose.leftWrist.x, pose.leftWrist.y, 16);


        ellipse(pose.leftShoulder.x, pose.leftShoulder.y, 16);
        ellipse(pose.rightShoulder.x, pose.rightShoulder.y, 16);
        ellipse(pose.leftElbow.x, pose.leftElbow.y, 16);
        ellipse(pose.rightElbow.x, pose.rightElbow.y, 16);
        ellipse(pose.rightHip.x, pose.rightHip.y, 16);
        ellipse(pose.leftHip.x, pose.leftHip.y, 16);
        ellipse(pose.leftKnee.x, pose.leftKnee.y, 16);
        ellipse(pose.rightKnee.x, pose.rightKnee.y, 16);
  
    
        for (let i = 0; i < skeleton.length; i++) {
          let a = skeleton[i][0];
          let b = skeleton[i][1];
          strokeWeight(2);
          stroke(0);
          fill(255, 204, 0)
          line(a.position.x, a.position.y, b.position.x, b.position.y);
        }


        fir_object.display(mouseX, mouseY,0);
        sec_object.display(mouseX, mouseY,0);
        third_object.display(mouseX, mouseY,0);
        fir_count1=check(fir_object,fir_count)
        sec_count1=check2(sec_object,sec_count)
        third_count1=check3(third_object,third_count)
        let total=fir_count1+sec_count1+third_count1;

        

          
        if (total==3){
            score+=1
            let randomcircles=random_circle();
            hihat.play();
            console.log('bingo')
  
            fir_object.display(randomcircles[0].x, randomcircles[0].y,1)
            sec_object.display(randomcircles[1].x, randomcircles[1].y,1)
            third_object.display(randomcircles[2].x, randomcircles[2].y,1)
        //     // console.log(pose_number)

        //     // setTimeout(endgame,10000)
        }

        fill(255, 0, 0);
        ellipse(pose.nose.x, pose.nose.y, 32);
        fill(0, 0, 255);
        ellipse(pose.rightWrist.x, pose.rightWrist.y, 32);
        ellipse(pose.leftWrist.x, pose.leftWrist.y, 32);
        ellipse(pose.leftAnkle.x, pose.leftAnkle.y, 32);
        ellipse(pose.rightAnkle.x, pose.rightAnkle.y, 32);
    }
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
}
function check(object,count){
  if (object.contains(pose.leftWrist.x, pose.leftWrist.y) && count==0) {
      count=1;
      object.changecolor()
  }else if(object.contains(pose.rightWrist.x, pose.rightWrist.y) && count==0){
      count=1;
      object.changecolor()
  }else if (object.contains(pose.nose.x, pose.nose.y) && count==0){
      count=1;
      object.changecolor()
  }else if(object.contains(pose.leftShoulder.x, pose.leftShoulder.y) && count==0){
      count=1;
      object.changecolor()
  }else if (object.contains(pose.rightShoulder.x, pose.rightShoulder.y) && count==0){
      count=1;
      object.changecolor()
  }else if(object.contains(pose.leftElbow.x, pose.leftElbow.y) && count==0){
      count=1;
      object.changecolor()
  }else if (object.contains(pose.rightElbow.x, pose.rightElbow.y) && count==0){
      count=1;
      object.changecolor()
  }else if(object.contains(pose.leftHip.x, pose.leftHip.y) && count==0){
      count=1;
      object.changecolor()
  }else if (object.contains(pose.rightHip.x, pose.rightHip.y) && count==0){
      count=1;
      object.changecolor()
  }else if(object.contains(pose.leftKnee.x, pose.leftKnee.y) && count==0){
      count=1;
      object.changecolor()
  }else if (object.contains(pose.rightKnee.x, pose.rightKnee.y) && count==0){
      count=1
      object.changecolor()
  }else if(object.contains(pose.leftAnkle.x, pose.leftAnkle.y) && count==0){
      count=1;
      object.changecolor()
  }else if (object.contains(pose.rightAnkle.x, pose.rightAnkle.y) && count==0){
      count=1;
      object.changecolor()
  }else{
      count=0;
  }

  return count
}

function check2(object,count){
  if (object.contains(pose.leftWrist.x, pose.leftWrist.y) && count==0) {
      count=1;
      object.changecolor()
  }else if(object.contains(pose.rightWrist.x, pose.rightWrist.y) && count==0){
      count=1;
      object.changecolor()
  }else if (object.contains(pose.nose.x, pose.nose.y) && count==0){
      count=1;
      object.changecolor()
  }else if(object.contains(pose.leftShoulder.x, pose.leftShoulder.y) && count==0){
      count=1;
      object.changecolor()
  }else if (object.contains(pose.rightShoulder.x, pose.rightShoulder.y) && count==0){
      count=1;
      object.changecolor()
  }else if(object.contains(pose.leftElbow.x, pose.leftElbow.y) && count==0){
      count=1;
      object.changecolor()
  }else if (object.contains(pose.rightElbow.x, pose.rightElbow.y) && count==0){
      count=1;
      object.changecolor()
  }else if(object.contains(pose.leftHip.x, pose.leftHip.y) && count==0){
      count=1;
      object.changecolor()
  }else if (object.contains(pose.rightHip.x, pose.rightHip.y) && count==0){
      count=1;
      object.changecolor()
  }else if(object.contains(pose.leftKnee.x, pose.leftKnee.y) && count==0){
      count=1;
      object.changecolor()
  }else if (object.contains(pose.rightKnee.x, pose.rightKnee.y) && count==0){
      count=1
      object.changecolor()
  }else if(object.contains(pose.leftAnkle.x, pose.leftAnkle.y) && count==0){
      count=1;
      object.changecolor()
  }else if (object.contains(pose.rightAnkle.x, pose.rightAnkle.y) && count==0){
      count=1;
      object.changecolor()
  }else{
      count=0;
  }

  return count
}

function check3(object,count){
    if (object.contains(pose.leftWrist.x, pose.leftWrist.y) && count==0) {
        count=1;
        object.changecolor()
    }else if(object.contains(pose.rightWrist.x, pose.rightWrist.y) && count==0){
        count=1;
        object.changecolor()
    }else if (object.contains(pose.nose.x, pose.nose.y) && count==0){
        count=1;
        object.changecolor()
    }else if(object.contains(pose.leftShoulder.x, pose.leftShoulder.y) && count==0){
        count=1;
        object.changecolor()
    }else if (object.contains(pose.rightShoulder.x, pose.rightShoulder.y) && count==0){
        count=1;
        object.changecolor()
    }else if(object.contains(pose.leftElbow.x, pose.leftElbow.y) && count==0){
        count=1;
        object.changecolor()
    }else if (object.contains(pose.rightElbow.x, pose.rightElbow.y) && count==0){
        count=1;
        object.changecolor()
    }else if(object.contains(pose.leftHip.x, pose.leftHip.y) && count==0){
        count=1;
        object.changecolor()
    }else if (object.contains(pose.rightHip.x, pose.rightHip.y) && count==0){
        count=1;
        object.changecolor()
    }else if(object.contains(pose.leftKnee.x, pose.leftKnee.y) && count==0){
        count=1;
        object.changecolor()
    }else if (object.contains(pose.rightKnee.x, pose.rightKnee.y) && count==0){
        count=1
        object.changecolor()
    }else if(object.contains(pose.leftAnkle.x, pose.leftAnkle.y) && count==0){
        count=1;
        object.changecolor()
    }else if (object.contains(pose.rightAnkle.x, pose.rightAnkle.y) && count==0){
        count=1;
        object.changecolor()
    }else{
        count=0;
    }

    return count
}


function random_circle(){
    var circles=[];
    var overlapping = false;
    while (circles.length<3){
      var circle = {
        x: between(168,504),
        y: between(70, 400),
        r: 36
      }
  
      var overlapping = false;
      
      for (var j =0; j <circles.length; j++){
        var other = circles[j];
        var d = dist(circle.x,circle.y,other.x,other.y)
        if(d < circle.r + other.r){
          overlapping=true;
          break;
        }
      }
      if (!overlapping) {
        circles.push(circle)
      }
  
    }

    return circles

  }


function mousePressed(){
	if(screen==0){
  	screen=1
  }else if(screen==2){
  	screen=0
  }
}
