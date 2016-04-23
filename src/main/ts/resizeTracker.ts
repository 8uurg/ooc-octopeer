interface WindowSize {
    width: number;
    height: number;
    timestamp: number;
}

var last: WindowSize = null;
var timer: number = null

function pass() {
    // TODO: Send last to collector
    console.log(last);
    last = null;
}

// Registers all resize events (even during resize)
window.addEventListener('resize', function (e) {
    last =
        {
            width: window.innerWidth,
            height: window.innerHeight,
            timestamp: e.timeStamp
        };
    window.clearTimeout(timer); // Stop the previous resize event from being sent.
    timer = window.setTimeout(pass, 400); // Wait 400ms before sending size.
});
