///<reference path="../interfaces/Message.ts" />
///<reference path="../interfaces/WindowResolutionJSON.ts" />
/// <reference path="../interfaces/TrackingCollector.ts" />
/// <reference path="../OctopeerConstants.ts" />

export class ResizeTracker {
    private width: number = -1;
    private height: number = -1;
    private timestamp: number = -1;
    private timer: any = null;
    private collector: TrackingCollector;

    /**
     * Registers and hooks the instance into the environment.
     */
    public register() {
        const _this: ResizeTracker = this;

        let prepareDatapoint = function () {
            _this.width = window.innerWidth;
            _this.height = window.innerHeight;
            _this.timestamp = Date.now();

            // Stop the previous resize event from being sent.
            clearTimeout(_this.timer);

            _this.timer = setTimeout(function () {
                _this.sendData(_this.createMessage());
            }, 400);
        };
        // Send initial window size on page load.
        window.addEventListener("load", prepareDatapoint);
        // Registers all resize events (even during resize)
        window.addEventListener("resize", prepareDatapoint);
    }

    /**
     * Set the collector for this tracker.
     * @param collector The collector to send the tracking data to.
     * @return Itself for daisy chaining.
     */
    public withCollector(collector: TrackingCollector): ResizeTracker {
        this.collector = collector;
        return this;
    }

    /**
     * Creates a message of type WindowResolutionJSON.
     * @returns {WindowResolutionJSON}
     */
    private createMessage(): WindowResolutionJSON {
        return {
            width: this.width,
            height: this.height,
            created_at: this.timestamp
        };
    }

    /**
     * Sends data to the centralized collector.
     */
    private sendData(wsData: WindowResolutionJSON) {
        this.collector.sendMessage({
            table: "window-resolution-events/",
            data: wsData
        });
    }
}
