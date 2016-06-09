/// <reference path="../../interfaces/TrackingCollector.ts" />

/**
 * A basic mainframe for creating a throttle.
 * Also does not throttle anything.
 */
export class Throttle implements TrackingCollector {
    private collector: TrackingCollector;

    /**
     * Initialize a Throttle.
     */
    constructor(collector: TrackingCollector) {
        this.collector = collector;
    }

    /**
     * Send message with a callback.
     * Callback is used to handle the message being dropped.
     */
    public sendThrottledMessage(message: Message, drop: () => void): void {
        this.collector.sendMessage(message);
    }

    /**
     * Pass ready to send to actual collector.
     */
    public isReadyToSend(): boolean {
        return this.collector.isReadyToSend();
    }

    /**
     * Send a message. Ignore the callback.
     */
    public sendMessage(message: Message) {
        this.sendThrottledMessage(message, () => {});
    }
}