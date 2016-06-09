/// <reference path="../../interfaces/TrackingCollector.ts" />

/**
 * A basic mainframe for creating a throttle.
 */
declare abstract class Throttle implements TrackingCollector {

    /**
     * Initialize a Throttle.
     */
    constructor(collector: TrackingCollector);

    /**
     * Send message with a callback.
     * Callback is used to handle the message being dropped.
     */
    public sendThrottledMessage(message: Message, drop: () => void): void;

    /**
     * Pass ready to send to actual collector.
     */
    public isReadyToSend(): boolean;

    /**
     * Send a message. Ignore the callback.
     */
    public sendMessage(message: Message): void;

}