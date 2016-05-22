///<reference path="../interfaces/WindowSize.ts" />
export class ResizeTracker {
    private width: number = -1;
    private height: number = -1;
    private timestamp: number = -1;
    private timer: any = null;
    private port: any = null;

    /**
     * Registers and hooks the instance into the environment.
     */
    public register() {
        const _this: ResizeTracker = this;

        _this.port = chrome.runtime.connect({name: "requestSender"});

        let prepareDatapoint = function () {
            _this.width = window.innerWidth;
            _this.height = window.innerHeight;
            _this.timestamp = Date.now();

            // Stop the previous resize event from being sent.
            clearTimeout(_this.timer);

            _this.timer = setTimeout(function() {
                _this.sendData();
            }, 400);
        };
        // Send initial window size on page load.
        window.addEventListener("load", prepareDatapoint);
        // Registers all resize events (even during resize)
        window.addEventListener("resize", prepareDatapoint);
    }

    /**
     * Sends data to the centralized collector.
     */
    public sendData() {
        this.port.postMessage({
            table: "window_resolution/",
            data: {
                width: this.width,
                height: this.height,
                created_at: this.timestamp,
                session: "" // Empty for now
            }
        });
    }
}