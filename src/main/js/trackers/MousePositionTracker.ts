import {SendStrategy, Sender} from "../interfaces/Sender";
/**
 * Provides a tracker that tracks the mouse on the webpage.
 */
export class MousePositionTracker implements Sender {
    sendStrategy: SendStrategy;
    messageDelay: number = 1000;
    private port: any;
    private cursorX: number = -1;
    private cursorY: number = -1;
    private viewportX: number = -1;
    private viewportY: number = -1;
    private lastCall: number = -1;

    /**
     * Register the mouse tracker to the document.
     * @param sendStrategy Set a sendStrategy for the tracker to use.
     */
    public register(sendStrategy: SendStrategy) {
        // Store `this` for usage in functions.
        const _this: MousePositionTracker = this;
        _this.sendStrategy = sendStrategy;
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

            if (_this.sendStrategy === SendStrategy.Bulk) {
                _this.sendData();
            } else {
                _this.sendThrottledData();
            }
        });
    }

    /**
     * Send data to centralized collector.
     */
    private sendData() {
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

    /**
     * Send data once every messageDelay to centralized collector.
     */
    private sendThrottledData() {
        let newCall: number = Date.now();

        if ( newCall - this.lastCall >= this.messageDelay ) {
            this.lastCall = newCall;
            this.sendData();
        }
    }

    /**
     * Set the time between messages, when throttled.
     * @param messageDelay Give a number with the time between messages.
     */
    setMessageDelay(messageDelay: number) {
        this.messageDelay = messageDelay;
    }
    
}