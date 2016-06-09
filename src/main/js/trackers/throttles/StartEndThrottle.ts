/// <reference path="Throttle.d.ts" />
/// <reference path="MinDelayThrottle.d.ts" />
/// <reference path="LastMessageThrottle.d.ts" />

/**
 * Keeps the first and last message. By using the other two throttles.
 */
export class StartEndThrottle extends Throttle {
    private minDelayThrottle: MinDelayThrottle;
    private lastMessageThrottle: LastMessageThrottle;

    /**
     * Initialize a Throttle.
     */
    constructor(collector: TrackingCollector) {
        super(collector);
        this.minDelayThrottle = new MinDelayThrottle(collector);
        this.lastMessageThrottle = new LastMessageThrottle(collector);
    }

    /**
     * Send a throttled message, dropping those sent in quick succession
     * but keeping the last message if possible.
     */
    public sendThrottledMessage(message: Message, drop: () => void) {
        this.minDelayThrottle.sendThrottledMessage(message, () => {
            this.lastMessageThrottle.sendThrottledMessage(message, drop);
        });
    }
}
