/**
 * Provides a tracker that tracks the mouse on the webpage.
 */
export class MousePositionTracker {
    private port: any;
    private cursorX: number = 0;
    private cursorY: number = 0;
    private viewportX: number = 0;
    private viewportY: number = 0;

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
            _this.viewportX = event.clientX;
            _this.viewportY = event.clientY;
        });

        setInterval(function(){
            _this.sendData(_this.cursorX, _this.cursorY, _this.viewportX, _this.viewportY);
        }, 1000);
    }

    /**
     * Send data to centralized collector.
     * @param cursorX The recorded x position of the cursor.
     * @param cursorY The recorded y position of the cursor.
     * @param viewportX The viewport x location
     * @param viewportY The viewport y location
     */
    public sendData(cursorX: number, cursorY: number, viewportX: number, viewportY: number) {
        this.port.postMessage({
            table: "mouse-position-events/",
            data: {
                position_x: cursorX,
                position_y: cursorY,
                viewport_x: viewportX,
                viewport_y: viewportY,
                session: "", // Empty for now.
                created_at: Date.now()
            }
        });
    }
}