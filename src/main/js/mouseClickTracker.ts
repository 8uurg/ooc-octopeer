///<reference path="./interfaces/message.ts" />

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

        _this.port = chrome.runtime.connect({name: "requestSender"});

        /**
         * Call the log function whenever a mouse click occurs.
         * @param event object that contains the required cursor information.
         */
        document.addEventListener("click", function (event) {
            _this.sendData();
        });
    }

    /**
     * Send mouse click data to centralized collector.
     */
    sendData() {
        this.port.postMessage({
            table: "mouse-click-events/",
            data: {
                url: "",
                session: "",
                created_at: Date.now()
            }
        });
        console.log("Posted Mouse Click JSON Message");
    }
}
