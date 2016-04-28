var cursorX: number;
var cursorY: number;

/**
 * Update the mouse coordinates every time the cursor moves.
 * @param e event object that contains the required cursor information.
 */
document.onmousemove = function(e){
    cursorX = e.pageX;
    cursorY = e.pageY;
}

//call the log function every given timeframe in ms.
setInterval("logMousePosition()", 1000);

/**
 * Log the cursor X and  Y position in the console.
 */
function logMousePosition() {
    console.log("Mouse position at: " + cursorX + ", " + cursorY);
}


