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
            _this.sendData(_this.createClickMessage());
            _this.sendData(_this.createPositionMessage(event));
        });
    }

    /**
     * Creates a message using the MouseClick interface.
     * @returns {MouseClickJSON}
     */
    private createClickMessage(): MouseClickJSON {
        return {
            created_at: Date.now() / 1000
        };
    }

    /**
     * Creates a message using the MouseClick interface.
     * @returns {MouseClickJSON}
     */
    private createPositionMessage(event): MousePosJSON {
        return {
            position_x: event.pageX,
            position_y: event.pageY,
            viewport_x: event.clientX,
            viewport_y: event.clientY,
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