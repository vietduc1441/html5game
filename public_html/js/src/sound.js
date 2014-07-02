window.addEventListener('load', 
function(){
    laserSound = document.createElement("audio");
    document.body.appendChild(laserSound);
    laserSound.setAttribute("src", "sound/laser.mp3");
},false);