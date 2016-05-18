///<reference path="./interfaces/WindowSize.ts" />
export class ResizeTracker {
    private last: WindowSize = null;
    private timer: any = null;
    private port: any = null;

    /**
     * Registers and hooks the instance into the environment.
     */
    public register() {
        const _this: ResizeTracker = this;

        _this.port = chrome.runtime.connect({name: "requestSender"});

        // Registers all resize events (even during resize)
        window.addEventListener("resize", function (e) {
            _this.last = {
                    width: window.innerWidth,
                    height: window.innerHeight,
                    timestamp: Date.now()
                };

            // Stop the previous resize event from being sent.
            clearTimeout(_this.timer);

            _this.timer = setTimeout(function() {
                _this.sendData();
                _this.last = null;
            }, 400);
        });
    }

    /**
     * Sends data to the centralized collector.
     */
    public sendData() {
        this.port.postMessage({
            table: "window_resolution/",
            data: {
                width: this.last.width,
                height: this.last.height,
                created_at: Date.now(),
                session: "" // Empty for now
            }
        });
    }
}