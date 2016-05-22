///<reference path="../interfaces/message.ts" />

/**
 * Provides a tracker that tracks the mouse on the webpage.
 */
export class MouseClickTracker {
    private port: any;

    /**
     * Register the mouse tracker to the document.
     */
    public register() {
        // Store `this` for usage in functions.
        const _this: MouseClickTracker = this;

        _this.port = chrome.runtime.connect({name: OCTOPEER_CONSTANTS.chrome_message_sender_id});

        /**
         * Call the log function whenever a mouse click occurs.
         * @param event Object that contains the required cursor information.
         */
        document.addEventListener("click", function (event) {
            _this.sendData();
        });
    }

    /**
     * Send mouse click data to centralized collector.
     */
    public sendData() {
        this.port.postMessage({
            table: "mouse-click-events/",
            data: {
                session: "", // Empty for now.
                created_at: Date.now()
            }
        });
    }
}
