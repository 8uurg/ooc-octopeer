"use strict";
/// <reference path="../interfaces/Message.ts" />
/// <reference path="../interfaces/TrackingCollector.ts" />
/// <reference path="../interfaces/ScrollJSON.ts" />
/// <reference path="../TrackingCollector.ts" />

/**
 * ScrollTracker
 */
export class ScrollTracker {
    private collector: TrackingCollector;

    public register() {
        const _this = this;

        function sendWindowPosition() {
            _this.sendMessage(_this.createMessage());
        }

        document.addEventListener("load", sendWindowPosition);
        window.addEventListener("scroll", sendWindowPosition);
    }

    public withCollector(collector: TrackingCollector): ScrollTracker {
        this.collector = collector;
        return this;
    }

    public createMessage(): ScrollJSON {
        return {
            viewport_x: window.scrollX,
            viewport_y: window.scrollY,
            created_at: Date.now() / 1000
        };
    }

    public sendMessage(message: ScrollJSON) {
        this.collector.sendMessage({
            table: "mouse-scroll-events/",
            data: message
        });
    }
}