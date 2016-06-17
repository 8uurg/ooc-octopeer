/// <reference path="Throttle.d.ts" />
/// <reference path="MinDelayThrottle.d.ts" />
/// <reference path="LastMessageThrottle.d.ts" />
/// <reference path="../../interfaces/Message.ts" />
/// <reference path="../../interfaces/TrackingCollector.ts" />

/**
 * Preserves the first and last message within a certain timespan by combining the other two throttles.
 * Keeps regular updates in between.
 */
export class StartEndThrottle extends Throttle {
    private minDelayThrottle: MinDelayThrottle;
    private lastMessageThrottle: LastMessageThrottle;

    /**
     * Initialize a Throttle.
     * @param collector The collector to send data to next.
     */
    constructor(collector: TrackingCollector) {
        super(collector);
        this.minDelayThrottle = new MinDelayThrottle(collector);
        this.lastMessageThrottle = new LastMessageThrottle(collector);
    }

    /**
     * Send a throttled message, dropping those sent in quick succession
     * but keeping the last message if possible.
     * @param message The message to send.
     * @param drop The callback to call in case of failure.
     */
    public sendThrottledMessage(message: Message, drop: () => void) {
        this.minDelayThrottle.sendThrottledMessage(message, () => {
            this.lastMessageThrottle.sendThrottledMessage(message, drop);
        });
    }

    /**
     * Get a factory for this throttle.
     */
    public static getFactory(): (collector: TrackingCollector) => StartEndThrottle {
        return (collector) => new StartEndThrottle(collector);
    }
}
