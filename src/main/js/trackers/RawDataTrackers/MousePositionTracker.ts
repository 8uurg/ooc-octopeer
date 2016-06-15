/// <reference path="../../interfaces/DatabaseSchemes/MousePosJSON.ts" />
/// <reference path="./Tracker.d.ts" />
/// <reference path="../../Main.d.ts" />
/// <reference path="../throttles/StartEndThrottle.d.ts" />

declare var OCTOPEER_CONSTANTS: any;

/**
 * Provides a tracker that tracks the mouse on the page.
 */
export class MousePositionTracker extends Tracker {
    private cursorX: number = -1;
    private cursorY: number = -1;
    private viewportX: number = -1;
    private viewportY: number = -1;

    /**
     * Register the mouse tracker to the document.
     */
    public register() {
        // Store `this` for usage in functions.
        const _this: MousePositionTracker = this;

        /**
         * Update the mouse coordinates every time the cursor moves.
         * @param event Object that contains the required cursor information.
         */
        document.addEventListener("mousemove", function(event) {
            _this.cursorX = event.pageX;
            _this.cursorY = event.pageY;
            _this.viewportX = event.clientX;
            _this.viewportY = event.clientY;
            _this.sendData(_this.createMessage());
        });
    }

    /**
     * Creates an object of type MousePosJSON.
     * @returns {MousePosJSON}
     */
    private createMessage(): MousePosJSON {
        return {
            position_x: this.cursorX,
            position_y: this.cursorY,
            viewport_x: this.viewportX,
            viewport_y: this.viewportY,
            created_at: Date.now() / 1000
        };
    }

    /**
     * Send data to centralized collector.
     */
    private sendData(mpData: MousePosJSON) {
        this.sendMessage({
            table: "mouse-position-events/",
            data: mpData
        });
    }
}

main.declareTracker({
    tracker: (collector) => {
        return (new MousePositionTracker())
            .withCollector(collector)
            .withThrottle(StartEndThrottle.getFactory());
    },
    setting: {
        name: OCTOPEER_CONSTANTS.track_mouse_position,
        def: true
    }
});