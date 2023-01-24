function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects"; 
}

img = "";
status = "";
objects = [];


function preload() {
    alarm = loadSound("emergency.mp3");
}

function draw() {
    image(video, 0, 0, 380, 380);

    if(status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            
    if(objects[i].label == "person") {
        document.getElementById("number_of_objects").innerHTML = "Baby is detected";
        alarm.stop();
    }
    else {
        document.getElementById("number_of_objects").innerHTML = "Baby is not detected!";
        alarm.play();
    }

    if(objects[i].length < 0) {
        document.getElementById("number_of_objects").innerHTML = "Baby is not detected!";
        alarm.play();
    }
        }
    }
}

function modelLoaded() {
    console.log("Model has been loaded!");
    status = true;
}

function gotResult(error, results) {
    if(error) {
        console.error(error);
    }
    console.log(results); 
    objects = results;
}