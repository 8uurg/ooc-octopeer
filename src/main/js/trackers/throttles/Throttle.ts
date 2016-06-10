/// <reference path="../../interfaces/Message.ts" />
/// <reference path="../../interfaces/TrackingCollector.ts" />

/**
 * A basic mainframe for creating a throttle.
 * Also does not throttle anything.
 */
export class Throttle implements TrackingCollector {
    private collector: TrackingCollector;

    /**
     * Initialize a Throttle.
     * @param collector The collector to send data to next.
     */
    constructor(collector: TrackingCollector) {
        this.collector = collector;
    }

    /**
     * Send message with a callback.
     * Callback is used to handle the message being dropped.
     * @param message The message to send.
     * @param drop The callback to call in case of failure.
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
     * @param message The message to send.
     */
    public sendMessage(message: Message) {
        this.sendThrottledMessage(message, () => {});
    }
}