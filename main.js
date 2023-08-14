value = [];
status = '';
song = '';
function preload(){
    song = loadSound('emergency_alert.mp3');
}
function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    
}
function modelLoaded(){
    status = true;
    console.log('Model Loaded');
    objectDetector.detect(video, gotResult);
}
function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    value = results;
}
function draw(){
    if(status != ''){
        for(i = 0; i<value.length; i++){
            
            fill('#FF0000')
            percent = floor(value[i].confidence * 100);
            text(value[i].label + " " + percent + '%', value[i].x + 15, value[i].y + 15);
            noFill();
            stroke('#FF0000');
            rect(value[i].x, value[i].y, value[i].width, value[i].height);
            if(value[i].label == 'person'){
                document.getElementById('status').innerHTML = 'Baby detected';
                song.pause();
            }  
            else{
                document.getElementById('status').innerHTML = 'Baby not detected';
                song.play();
            }
        }
        if(value.length<0){
            document.getElementById('status').innerHTML = 'Baby not detected';
            song.play();
        }
    }
}