///<reference path="./interfaces/Message.ts" />
///<reference path="./interfaces/MouseClickJSON.ts" />

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
         * @param event Object that contains the required cursor information.
         */
        document.addEventListener("click", function (event) {
            _this.sendData(_this.createMessage());
        });
    }

    /**
     * Creates a message using the MouseClick interface.
     * @returns {MouseClickJSON}
     */
    private createMessage(): MouseClickJSON {
        let data: MouseClickJSON = {
            session: "", // Empty for now.
            created_at: Date.now()
        };
        return data;
    }

    /**
     * Send mouse click data to centralized collector.
     */
    private sendData(mcData: MouseClickJSON) {
        this.port.postMessage({
            table: "mouse-click-events/",
            data: mcData
        });
    }
}
