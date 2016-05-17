/**
 * Provides a tracker that tracks the mouse on the webpage.
 */
export class MouseTracker {
    private cursorX: number = 0;
    private cursorY: number = 0;

    /**
     * Register the mouse tracker to the document.
     */
    public register() {
        // Store `this` for usage in functions.
        const _this: MouseTracker = this;

        /**
         * Update the mouse coordinates every time the cursor moves.
         * @param event object that contains the required cursor information.
         */
        document.addEventListener("mousemove", function(event) {
            _this.cursorX = event.pageX;
            _this.cursorY = event.pageY;
        });

        setInterval(function(){ _this.logMousePosition(); }, 1000);
    }

    /**
     * Logs the current mouse position and sends it to the right data source.
     */
    public logMousePosition() {
        this.sendData(this.cursorX, this.cursorY);
        console.log("Mouse position at: " + this.cursorX + ", " + this.cursorY);
    }

    /**
     * Send data to centralized collector.
     * @param cursorX The recorded x position of the cursor.
     * @param cursorY The recorded y position of the cursor.
     */
    public sendData(cursorX: number, cursorY: number) {
        // TODO: Implement this.
        console.log("Called");
    }
}

// Register the mousetracker to the current document.
(new MouseTracker).register();
