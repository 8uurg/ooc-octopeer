
export class MouseTracker {
    public cursorX: number = 0;
    public cursorY: number = 0;
    
    /**
     * Register the mouse tracker to the document.
     */
    public register() {
        // Store `this` for usage in functions.
        var current: MouseTracker = this;
        /**
         * Update the mouse coordinates every time the cursor moves.
         * @param event object that contains the required cursor information.
         */
        document.addEventListener('mousemove', function(event) {
            current.cursorX = event.pageX;
            current.cursorY = event.pageY;
        });
        setInterval(function(){current.logMousePosition()}, 1000);
    }
    
    /**
     * Logs the current mouse position and sends it to the right data source.
     */
    logMousePosition() {
        this.sendData(this.cursorX, this.cursorY);
        console.log("Mouse position at: " + this.cursorX + ", " + this.cursorY);
    }
    
    /**
     * Send data to centralized collector.
     */
    sendData(cursorX: number, cursorY: number) {
        // TODO: Implement this.
    }

}

// Register the mousetracker to the current document.
(new MouseTracker).register();
