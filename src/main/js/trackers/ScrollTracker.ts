/// <reference path="../interfaces/Message.ts" />
/// <reference path="../interfaces/TrackingCollector.ts" />
/// <reference path="../interfaces/DatabaseSchemes/ScrollJSON.ts" />
/// <reference path="../interfaces/TrackingCollector.ts" />

/**
 * ScrollTracker, Tracks the current viewport position in comparison to the page origin.
 */
export class ScrollTracker {
    private collector: TrackingCollector;

    private lastCall: number = -1;

    /**
     * Register the ScrollTracker to the current page.
     */
    public register() {
        const _this = this;

        function sendWindowPosition() {
            _this.sendMessage(_this.createMessage());
        }

        // Send window position on load.
        sendWindowPosition();
        window.addEventListener("scroll", sendWindowPosition);
    }

    /**
     * Make tracker use this collector.
     * @param collector The collector to use.
     */
    public withCollector(collector: TrackingCollector): ScrollTracker {
        this.collector = collector;
        return this;
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
     * @param message The message to send.
     */
    public sendMessage(message: ScrollJSON) {
        let newCall: number = Date.now();

        if ( newCall - this.lastCall >= 1000 ) {
            this.lastCall = newCall;
            this.collector.sendMessage({
                table: "mouse-scroll-events/",
                data: message
            });
        }
    }
}