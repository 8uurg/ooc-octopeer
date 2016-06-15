/// <reference path="../../interfaces/DatabaseSchemes/ScrollJSON.ts" />
/// <reference path="./Tracker.d.ts" />
/// <reference path="../../Main.d.ts" />
/// <reference path="../throttles/StartEndThrottle.d.ts" />

declare var OCTOPEER_CONSTANTS: any;

/**
 * ScrollTracker, Tracks the current viewport position in comparison to the page origin.
 */
export class ScrollTracker extends Tracker {

    private lastCall: number = -1;

    /**
     * Register the ScrollTracker to the current page.
     */
    public register() {
        const _this = this;

        function sendWindowPosition() {
            _this.sendData(_this.createMessage());
        }

        // Send window position on load.
        sendWindowPosition();
        window.addEventListener("scroll", sendWindowPosition);
    }

    /**
     * Create scroll message.
     */
    public createMessage(): ScrollJSON {
        return {
            viewport_x: window.scrollX,
            viewport_y: window.scrollY,
            created_at: Date.now() / 1000
        };
    }

    /**
     * Send the scroll message.
     * @param scrollData The message to send.
     */
    public sendData(scrollData: ScrollJSON) {
        let newCall: number = Date.now();

        if ( newCall - this.lastCall >= 1000 ) {
            this.lastCall = newCall;
            this.sendMessage({
                table: "mouse-scroll-events/",
                data: scrollData
            });
        }
    }
}

main.declareTracker({
    tracker: (collector) => {
        return (new ScrollTracker())
            .withCollector(collector)
            .withThrottle(StartEndThrottle.getFactory());
    },
    setting: {
        name: OCTOPEER_CONSTANTS.track_scroll,
        def: true
    }
});