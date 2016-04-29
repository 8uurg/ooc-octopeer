var cursorX: number;
var cursorY: number;

/**
 * Update the mouse coordinates every time the cursor moves.
 * @param event object that contains the required cursor information.
 */
document.addEventListener('mousemove', function(event) {
    cursorX = event.pageX;
    cursorY = event.pageY;
})

setInterval("logMousePosition()", 1000);

/**
 * Log the cursor X and  Y position in the console.
 */
function logMousePosition() {
    console.log("Mouse position at: " + cursorX + ", " + cursorY);
}


