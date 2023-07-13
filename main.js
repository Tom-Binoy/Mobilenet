function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier("MobileNet",modelLoaded)
}

previousresult="";


function modelLoaded(){
  console.log("modelLoaded")
}

function draw(){
     image(video,0,0,300,300)
     classifier.classify(video , gotResult)
}

function gotResult(error,result){
  if(error){
    console.error(error)
  }
  else{ if((result[0].confidence > 0.5) && (result[0].label != previousresult )){
    previousresult = result[0].label
    synth = window.speechSynthesis
    data = result[0].label
    utter = new SpeechSynthesisUtterance(data)
    synth.speak(utter)

    document.getElementById("accuracy").innerHTML = result[0].confidence.toFixed(3);
    document.getElementById("object").innerHTML = result[0].label;
  }
      
  }
}