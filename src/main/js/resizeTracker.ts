///<reference path="./interfaces/WindowSize.ts" />
export class ResizeTracker {
    private last: WindowSize = null;
    private timer: any = null;

    /**
     * Registers and hooks the instance into the environment.
     */
    public register() {
        const current: ResizeTracker = this;
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
                current.sendData(current.last);
                current.last = null;
            }, 400);
        });
    }

    /**
     * Sends data - somewhere.
     */
    sendData(window: WindowSize) {
        // TODO: Send last to collector
        // TODO: Implementations of URL and Session.
        chrome.runtime.connect({name: "requestSender"}).postMessage({table: "window_resolution/", data: {"url": "TODO",
            "created_at": Date.now(), "width": window.width, "height": window.height, "session": "TODO"}});
        console.log(window);
    }
}

(new ResizeTracker).register();