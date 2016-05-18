/**
 * Provides a tracker that tracks the mouse on the webpage.
 */
export class MousePositionTracker {
    private port: any;
    private cursorX: number = 0;
    private cursorY: number = 0;

    /**
     * Register the mouse tracker to the document.
     */
    public register() {
        // Store `this` for usage in functions.
        const _this: MousePositionTracker = this;

        _this.port = chrome.runtime.connect({name: "requestSender"});

        /**
         * Update the mouse coordinates every time the cursor moves.
         * @param event object that contains the required cursor information.
         */
        document.addEventListener("mousemove", function(event) {
            _this.cursorX = event.pageX;
            _this.cursorY = event.pageY;
        });

        setInterval(function(){ _this.sendData(_this.cursorX, _this.cursorY); }, 1000);
        console.log("Registered Mouse Tracker.");
    }

    /**
     * Send data to centralized collector.
     * @param cursorX The recorded x position of the cursor.
     * @param cursorY The recorded y position of the cursor.
     */
    public sendData(cursorX: number, cursorY: number) {
        this.port.postMessage({
            table: "mouse-position-events/",
            data: {
                url: "",
                position_x: this.cursorX,
                position_y: this.cursorY,
                viewport_x: 0,
                viewport_y: 0,
                session: "",
                created_at: Date.now()
            }
        });
        console.log("Posted Mouse Position JSON Message");
    }
}