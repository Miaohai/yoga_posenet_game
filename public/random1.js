let video;
let poseNet;
let pose;
let skeleton;
var score = 0;
var screen = 0;
var counter = 0;
var timeleft = 60;
var time=0;
let rw_object;
let lw_object;
let nose_object;
let leftAnkle_object;
let rightAnkle_object;
let pose_number=0
function setup() {
    createCanvas(640, 480);

    video = createCapture(VIDEO);
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

    lw_count = 0;
    rw_count  = 0;
    nose_count = 0;
}

// leftWrist class
class Left {
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

    // Show the lw_object (hardcoded colors, could be improved)
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
            // second poses
        }else if (x==1){
            this.x = random(width);
            this.y = random(height);
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
        this.x = 400;
        this.y = 200;
        this.r = 50;
    }
    contains(mx, my) {
        return dist(mx, my, this.x, this.y) < this.r;
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
            this.x = random(width);
            this.y = random(height);
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



function gameOn() {
    // translate(width,0); // move to far corner
    // scale(-1.0,1.0);    // flip x-axis backwards
    image(video, 0, 0);

    if (pose) {
        // let eyeR = pose.rightEye;
        // let eyeL = pose.leftEye;
        // let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
        // fill(255, 0, 0);
        // ellipse(pose.nose.x, pose.nose.y, d);
        // fill(0, 0, 255);
        // ellipse(pose.rightWrist.x, pose.rightWrist.y, 32);
        // ellipse(pose.leftWrist.x, pose.leftWrist.y, 32);
        lw_object.display(mouseX, mouseY,0);
        // console.log(pose.keypoints[0].position.x)
        if (rw_object.contains(pose.rightWrist.x, pose.rightWrist.y) && lw_count==0) {
            lw_count=1;
            console.log('yes')
        }else if(rw_object.contains(pose.leftWrist.x, pose.leftWrist.y) && lw_count==0) {
            lw_count=1;
        }else{
            lw_count=0;
        }
        rw_object.display(mouseX, mouseY,0);
        if (rw_object.contains(pose.leftWrist.x, pose.leftWrist.y) && rw_count==0) {
            // bass_sound.play();
            rw_count=1;
            console.log('no')
        } else if ( lw_object.contains(pose.rightWrist.x, pose.rightWrist.y) && rw_count==0) {
            rw_count=1;
        }else{
            rw_count=0;
        }



        if (rw_count+lw_count==2){
            hihat.play();
            console.log('bingo')
            // TO-D0
            //   suppose the player needs to hold the pose with 10 seconds (change to countdown (10s))
            // TO-D0
            // run below after the sound effect finish
            // Change to next pose
            lw_object.display(random(width),random(height),1)
            rw_object.display(random(width), random(height),1)
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
