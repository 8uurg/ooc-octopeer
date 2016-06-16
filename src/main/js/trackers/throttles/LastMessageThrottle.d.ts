/// <reference path="Throttle.d.ts" />

/**
 * Drops all messages except the last one in a certain time span.
 */
declare class LastMessageThrottle extends Throttle {

    /**
     * Send a throttled message, dropping those sent before if sent too quickly.
     * @param message The message to send.
     * @param drop The callback to call in case of failure.
     */
    public sendThrottledMessage(message: Message, drop: () => void): void;
    
    /**
     * Get a factory for this throttle.
     */
    public static getFactory(): (collector: TrackingCollector) => LastMessageThrottle;
}
