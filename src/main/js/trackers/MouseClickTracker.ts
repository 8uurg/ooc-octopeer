///<reference path="../interfaces/Message.ts" />
///<reference path="../interfaces/MouseClickJSON.ts" />
///<reference path="../interfaces/TrackingCollector.ts" />
/**
 * Provides a tracker that tracks the mouse on the webpage.
 */
export class MouseClickTracker {
    private collector: TrackingCollector;

    /**
     * Register the mouse tracker to the document.
     */
    public register() {
        // Store `this` for usage in functions.
        const _this: MouseClickTracker = this;

        /**
         * Call the log function whenever a mouse click occurs.
         * @param event Object that contains the required cursor information.
         */
        document.addEventListener("click", function (event) {
            _this.sendData(_this.createMessage());
        });
    }

    /**
     * Add the collector to send the data to.
     * @param collector The collector
     * @returns {MouseClickTracker}
     */
    public withCollector(collector: TrackingCollector): MouseClickTracker {
        this.collector = collector;
        return this;
    }

    /**
     * Creates a message using the MouseClick interface.
     * @returns {MouseClickJSON}
     */
    private createMessage(): MouseClickJSON {
        return {
            created_at: Date.now() / 1000
        };
    }

    /**
     * Send mouse click data to centralized collector.
     */
    private sendData(mcData: MouseClickJSON) {
        this.collector.sendMessage({
            table: "mouse-click-events/",
            data: mcData
        });
    }
}
