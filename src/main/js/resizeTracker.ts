///<reference path="./interfaces/WindowSize.ts" />
export class ResizeTracker {
    private last: WindowSize = null;
    private timer: any = null;
    private port: any = null;

    /**
     * Registers and hooks the instance into the environment.
     */
    public register() {
        const current: ResizeTracker = this;

        current.port = chrome.runtime.connect({name: "requestSender"});

        // Registers all resize events (even during resize)
        window.addEventListener("resize", function (e) {
            current.last = {
                    width: window.innerWidth,
                    height: window.innerHeight,
                    timestamp: Date.now()
                };

            // Stop the previous resize event from being sent.
            clearTimeout(current.timer);

            current.timer = setTimeout(function() {
                current.sendData();
                current.last = null;
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
                created_at: Date.now(),
                width: this.last.width,
                height: this.last.height,
                session: "" // Empty for now
            }
        });
    }
}