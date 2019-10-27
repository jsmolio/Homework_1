function hideModal(){
  document.location.reload(true);
}

function ranGradient(){
  var x = Math.floor(Math.random() * 365);
  var bg = document.getElementById('background1').style;
  // bg.backgroundImage = `linear-gradient(${x}deg, rgba(14, 224, 215, 0.2), rgba(255, 255, 255, 0.7)), url(Vietnam2.jpg)`;
}

// function loop(){
//   setTimeout(loop, 1000);
//   ranGradient();
// }
//
document.getElementById('background1').style.backgroundImage = "linear-gradient(180deg, rgba(14, 224, 215, 0.2), rgba(255, 255, 255, 0.7)), url(Vietnam2.jpg)";
// loop();
