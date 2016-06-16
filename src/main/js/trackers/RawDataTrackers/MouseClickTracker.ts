/// <reference path="../../interfaces/DatabaseSchemes/MouseClickJSON.ts" />
/// <reference path="./Tracker.d.ts" />
/// <reference path="../../Main.d.ts" />
declare var OCTOPEER_CONSTANTS: any;

/**
 * Provides a tracker that tracks the mouse on the page.
 */
export class MouseClickTracker extends Tracker {

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
        this.sendMessage({
            table: "mouse-click-events/",
            data: mcData
        });
    }
}

main.declareTracker({
    tracker: (collector) => {
        return (new MouseClickTracker())
            .withCollector(collector)
            .register();
    },
    setting: {
        name: OCTOPEER_CONSTANTS.track_mouse_clicks,
        def: true
    }
});