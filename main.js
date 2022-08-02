previousResult=""
function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier=ml5.imageClassifier("MobileNet", modelLoaded);
}
function modelLoaded(){
  console.log("model loaded");
}
function draw(){
  image(video, 0, 0, 300, 300)
  classifier.classify(video, obtainedResult)
}
function obtainedResult(error, result){
  if(error){
    console.error(error)
  }
  else if((result[0].confidence>0.3)&&(previousResult!=result[0].label)){
    console.log(result)
    previousResult=result[0].label
    synth=window.speechSynthesis
    speak_data="Object identified is "+result[0].label
    var say_this= new SpeechSynthesisUtterance(speak_data)
    synth.speak(say_this)
    document.getElementById("object").innerHTML=result[0].label
    document.getElementById("accuracy").innerHTML=Math.floor(result[0].confidence*100)+"%"
  }
}