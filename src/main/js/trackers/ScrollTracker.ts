/// <reference path="../interfaces/Message.ts" />
/// <reference path="../interfaces/TrackingCollector.ts" />
/// <reference path="../interfaces/DatabaseSchemes/ScrollJSON.ts" />
/// <reference path="../interfaces/TrackingCollector.ts" />

/**
 * ScrollTracker, Tracks the current viewport position in comparison to the page origin.
 */
export class ScrollTracker {
    private collector: TrackingCollector;

    /**
     * Register the ScrollTracker to the current page.
     */
    public register() {
        const _this = this;

        function sendWindowPosition() {
            _this.sendMessage(_this.createMessage());
        }

        document.addEventListener("load", sendWindowPosition);
        window.addEventListener("scroll", sendWindowPosition);
    }

    /**
     * Make tracker use this collector.
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
     */
    public sendMessage(message: ScrollJSON) {
        this.collector.sendMessage({
            table: "mouse-scroll-events/",
            data: message
        });
    }
}