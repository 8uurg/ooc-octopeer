/**
 * Provides a tracker that tracks the mouse on the webpage.
 */
export class MousePositionTracker {
    private port: any;
    private cursorX: number = -1;
    private cursorY: number = -1;
    private viewportX: number = -1;
    private viewportY: number = -1;
    private lastCall: number = -1;

    /**
     * Register the mouse tracker to the document.
     */
    public register() {
        // Store `this` for usage in functions.
        const _this: MousePositionTracker = this;

        _this.port = chrome.runtime.connect({name: "requestSender"});

        /**
         * Update the mouse coordinates every time the cursor moves.
         * @param event Object that contains the required cursor information.
         */
        document.addEventListener("mousemove", function(event) {
            _this.cursorX = event.pageX;
            _this.cursorY = event.pageY;
            _this.viewportX = event.clientX;
            _this.viewportY = event.clientY;
            _this.sendData();
        });
    }

    /**
     * Send data to centralized collector.
     */
    private sendData() {
        let newCall: number = Date.now();

        // We don't want to flood the database with events, so we post a message once per second at most.
        if ( newCall - this.lastCall >= 1000 ) {
            this.lastCall = newCall;
            this.port.postMessage({
                table: "mouse-position-events/",
                data: {
                    position_x: this.cursorX,
                    position_y: this.cursorY,
                    viewport_x: this.viewportX,
                    viewport_y: this.viewportY,
                    session: "", // Empty for now.
                    created_at: Date.now()
                }
            });
        }
    }
}