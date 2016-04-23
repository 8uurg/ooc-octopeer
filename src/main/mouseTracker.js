var cursorX;
var cursorY;

//keep mouse location constantly updated.
document.onmousemove = function(e){
    cursorX = e.pageX;
    cursorY = e.pageY;
}

//call the log function every given timeframe in ms.
setInterval("logMousePosition()", 1000);

//log the current mouse location
function logMousePosition(){
    console.log("Mouse position at: " + cursorX + ", " + cursorY);
}