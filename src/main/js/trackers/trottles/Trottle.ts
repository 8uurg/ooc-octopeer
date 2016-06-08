/// <reference path="../../interfaces/TrackingCollector.ts" />

/**
 * A basic mainframe for creating a trottle.
 * Also does not trottle anything.
 */
export class Trottle implements TrackingCollector {
    private collector: TrackingCollector;

    /**
     * Initialize a Trottle.
     */
    constructor(collector: TrackingCollector) {
        this.collector = collector;
    }

    /**
     * Send message with a callback.
     * Callback is used to handle the message being dropped.
     */
    public sendTrottledMessage(message: Message, drop: () => void): void {
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
        this.sendTrottledMessage(message, () => {});
    }
}