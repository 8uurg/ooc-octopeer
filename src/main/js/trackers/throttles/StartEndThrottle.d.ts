/// <reference path="Throttle.d.ts" />
/// <reference path="MinDelayThrottle.d.ts" />
/// <reference path="LastMessageThrottle.d.ts" />
/// <reference path="../../interfaces/Message.ts" />
/// <reference path="../../interfaces/TrackingCollector.ts" />

/**
 * Preserves the first and last message within a certain timespan by combining the other two throttles.
 * Keeps regular updates in between.
 */
declare class StartEndThrottle extends Throttle {

    /**
     * Initialize a Throttle.
     * @param collector The collector to send data to next.
     */
    constructor(collector: TrackingCollector);

    /**
     * Send a throttled message, dropping those sent in quick succession
     * but keeping the last message if possible.
     * @param message The message to send.
     * @param drop The callback to call in case of failure.
     */
    public sendThrottledMessage(message: Message, drop: () => void): void;

    /**
     * Get a factory for this throttle.
     */
    public static getFactory(): (collector: TrackingCollector) => StartEndThrottle;
}
