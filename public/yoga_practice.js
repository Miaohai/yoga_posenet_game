let video;
let poseNet;
let pose;
let skeleton;
var screen = 0;
let rw_object;
let lw_object;
let nose_object;
let leftAnkle_object;
let rightAnkle_object;
let pose_number=0
var timerValue = 10;
function setup() {
    var cnv = createCanvas(640, 480);
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    cnv.position(x, y);
    background(255, 0, 200);


    video = createCapture(VIDEO);
    console.log(video)
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
    soundFormats('mp3', 'ogg');
    //   Need to change to countdown 10 second sound effect
    hihat = loadSound('assets/hihat.mp3');

        // // Create leftWrist circles
    lw_object = new Left(width / 2, height / 2, 64);

    // // Create leftWrist circles
    rw_object = new Right(width / 2, height / 2, 64);


    // // Create leftWrist circles
    nose_object = new Nose(width / 2, height / 2, 64);

        // // Create leftWrist circles
    lankle_object = new LeftAngkle(width / 2, height / 2, 64);

    // // Create leftWrist circles
    rankle_object = new RightAngkle(width / 2, height / 2, 64);
  
    lw_count = 0;
    rw_count  = 0;
    nose_count = 0;

    lankle_count  = 0;
    rankle_count = 0;
}

// leftWrist class
class Left {
    constructor(x_, y_, r_) {
    // Location and size
    //   TO-DO
    // Need to change the coordinate 
      this.x = 430;
      this.y = 126;
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
    display(mx, my,x) {
      if (this.contains(mx, my)) {
        fill(50,205,50);
      } else {
        fill(50,205,50);
      }
      stroke(0);
      strokeWeight(4);
      if (x==0){
        fill(50,205,50);
        ellipse(this.x, this.y, this.r, this.r);
        // second poses
      }else if (x==1){
        this.x = 290;
        this.y = 70;
        fill(50,205,50);
        ellipse(this.x, this.y, this.r, this.r);
        // third poses
      }else if (x==2){
        this.x = 180;
        this.y = 102;
        fill(50,205,50);
        ellipse(this.x, this.y, this.r, this.r);
        // third poses
      }
    }
  }


  class Right {
    constructor(x_, y_, r_) {
      // Location and size
    //   TO-DO
     // Need to change the coordinate 
      this.x = 150;
      this.y = 126;
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
        fill(50,205,50);
      } else {
        fill(50,205,50);
      }
      stroke(0);
      strokeWeight(4);
      if (x==0){
        fill(50,205,50);
        ellipse(this.x, this.y, this.r, this.r);
      }else if(x==1){
        this.x = 290;
        this.y = 70;
        fill(50,205,50);
        ellipse(this.x, this.y, this.r, this.r);
      }else if (x==2){
        this.x = 180;
        this.y = 102;
        fill(50,205,50);
        ellipse(this.x, this.y, this.r, this.r);
        // third poses
      }
    }

  }



class Nose {
    constructor(x_, y_, r_) {
      // Location and size
    //   TO-DO
     // Need to change the coordinate 
      this.x = 290;
      this.y = 70;
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
        this.x = 290;
        this.y = 197;
        ellipse(this.x, this.y, this.r, this.r);
      }else if(x==2){
        this.x = 225;
        this.y = 179;
        ellipse(this.x, this.y, this.r, this.r);
      }
    }

  }

class LeftAngkle {
    constructor(x_, y_, r_) {
      // Location and size
    //   TO-DO
     // Need to change the coordinate 
      this.x = 350;
      this.y = 430;
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
        fill(148,0,211);
      } else {
        fill(148,0,211);
      }
      stroke(0);
      strokeWeight(4);
      if (x==0){
        fill(148,0,211);
        ellipse(this.x, this.y, this.r, this.r);
      }else if(x==1){
        this.x = 450;
        this.y = 430;
        fill(148,0,211);
        ellipse(this.x, this.y, this.r, this.r);
      }else if(x==2){
        this.x = 450;
        this.y = 430;
        fill(148,0,211);
        ellipse(this.x, this.y, this.r, this.r);
      }
    }

  }


  class RightAngkle {
    constructor(x_, y_, r_) {
      // Location and size
    //   TO-DO
     // Need to change the coordinate 
      this.x = 230;
      this.y = 430;
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
        fill(148,0,211);
      } else {
        fill(148,0,211);
      }
      stroke(0);
      strokeWeight(4);
      if (x==0){
        fill(148,0,211);
        ellipse(this.x, this.y, this.r, this.r);
      }else if(x==1){
        this.x = 100;
        this.y = 430;
        fill(148,0,211);
        ellipse(this.x, this.y, this.r, this.r);
      }else if(x==2){
        this.x = 100;
        this.y = 430;
        fill(148,0,211);
        ellipse(this.x, this.y, this.r, this.r);
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
  }	
}


function startScreen(){
  background(96, 157, 255)
  fill(255)
  textAlign(CENTER);
  text('WELCOME TO MY Yoga Practice', width / 2, height / 2)
  text('click to start', width / 2, height / 2 + 20);
  reset();
}

function timeIt() {
  if (timerValue > 0) {
    timerValue--;
  }
}


function gameOn() {
    image(video, 0, 0);
    background(255, 255, 255); 
    translate(width,0); // move to far corner
    scale(-1.0,1.0);
    line(53, 457, 487, 457);    
    if (pose) {
        fill(255, 0, 0);
        ellipse(pose.nose.x, pose.nose.y, 20);

        strokeWeight(4);
        stroke(0);
        fill(255, 255, 255)
        rect(pose.nose.x-50, pose.nose.y-30, 100, 60);

        noStroke(); 
        ellipse(pose.rightWrist.x, pose.rightWrist.y, 32);
        ellipse(pose.leftWrist.x, pose.leftWrist.y, 32);


        for (let i = 0; i < skeleton.length; i++) {
          let a = skeleton[i][0];
          let b = skeleton[i][1];
          strokeWeight(2);
          stroke(0);
          fill(255, 204, 0)
          line(a.position.x, a.position.y, b.position.x, b.position.y);
        }

        lw_object.display(mouseX, mouseY,0);
        rw_object.display(mouseX, mouseY,0);
        nose_object.display(mouseX, mouseY,0);   // console.log(pose.keypoints[0].position.x)
        lankle_object.display(mouseX, mouseY,0);
        rankle_object.display(mouseX, mouseY,0); 

        nose_count1=check(nose_object,nose_count)
        lw_count1=check2(lw_object,lw_count)
        rw_count1=check3(rw_object,rw_count)
        lankle_count1=check4(lankle_object,lankle_count)
        rankle_count1=check5(rankle_object,rankle_count)

          
        if (nose_count1+lw_count1+rw_count1+rankle_count1+lankle_count1==5){
            hihat.play();
            console.log('bingo')
            pose_number+=1
        // TO-D0
        //   suppose the player needs to hold the pose with 10 seconds (change to countdown (10s))
        // TO-D0
        // run below after the sound effect finish
        // Change to next pose

          if (timerValue >= 10) {
            text("0:" + timerValue, width / 2, height / 2);
          }
          if (timerValue < 10) {
            text('0:0' + timerValue, width / 2, height / 2);
          }
          if (timerValue == 0) {
            text('game over', width / 2, height / 2 + 15);
          }
            lw_object.display(random(width),random(height),pose_number)
            rw_object.display(random(width), random(height),pose_number)
            nose_object.display(random(width),random(height),pose_number)
            lankle_object.display(random(width), random(height),pose_number)
            rankle_object.display(random(width),random(height),pose_number)
            // console.log(pose_number)

            // setTimeout(endgame,10000)
        }

        // for (let i = 0; i < skeleton.length; i++) {
        // let a = skeleton[i][0];
        // let b = skeleton[i][1];
        // strokeWeight(2);
        // stroke(255);
        // line(a.position.x, a.position.y, b.position.x, b.position.y);
        // }

        fill(255, 0, 0);
        ellipse(pose.nose.x, pose.nose.y, 16);
        fill(0, 0, 255);
        ellipse(pose.rightWrist.x, pose.rightWrist.y, 10);
        ellipse(pose.leftWrist.x, pose.leftWrist.y, 10);
        ellipse(pose.leftAnkle.x, pose.leftAnkle.y, 10);
        ellipse(pose.rightAnkle.x, pose.rightAnkle.y, 10);
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
  if (object.contains(pose.nose.x, pose.nose.y) && count==0) {
    count=1;
    object.changecolor()
    console.log('nose')
  }else{
    count=0;
  }
  return count
}

function check3(object,count){
  if (object.contains(pose.rightWrist.x, pose.rightWrist.y) && count==0) {
    // bass_sound.play();
      count=1;
      object.changecolor()
      console.log('right_hand')
    } else{
      count=0;
    }
  return count
}


function check2(object,count){
  if (object.contains(pose.leftWrist.x, pose.leftWrist.y) && count==0) {
    count=1;
    object.changecolor()
    console.log('lefthand')
  }else{
    count=0;
  }
  return count
  }


function check4(object,count){
  if (object.contains(pose.leftAnkle.x, pose.leftAnkle.y) && count==0) {
    count=1;
    object.changecolor()
    console.log('lefthand')
  }else{
    count=0;
  }
  return count
  }

function check5(object,count){
  if (object.contains(pose.rightAnkle.x, pose.rightAnkle.y) && count==0) {
    count=1;
    object.changecolor()
    console.log('lefthand')
  }else{
    count=0;
  }
  return count
  }

