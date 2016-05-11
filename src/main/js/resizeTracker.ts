interface WindowSize {
    width: number;
    height: number;
    timestamp: number;
}

export class ResizeTracker {
    private last: WindowSize = null;
    private timer: number = null;

    public register() {
        const current = this;
        // Registers all resize events (even during resize)
        window.addEventListener("resize", function (e) {
            current.last = {
                    width: window.innerWidth,
                    height: window.innerHeight,
                    timestamp: e.timeStamp
                };
            clearTimeout(current.timer); // Stop the previous resize event from being sent.
            current.timer = setTimeout(function() {
                current.sendData(current.last);
                current.last = null;
            }, 400);
        });
    }

    sendData(window: WindowSize) {
        // TODO: Send last to collector
        console.log(window);
    }
}


(new ResizeTracker).register();