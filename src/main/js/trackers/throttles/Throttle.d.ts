/// <reference path="../../interfaces/TrackingCollector.ts" />

/**
 * A basic mainframe for creating a throttle.
 */
declare abstract class Throttle implements TrackingCollector {

    /**
     * Initialize a Throttle.
     * @param collector The collector to send data to next.
     */
    constructor(collector: TrackingCollector);

    /**
     * Send message with a callback.
     * Callback is used to handle the message being dropped.
     * @param message The message to send.
     * @param drop The callback to call in case of failure.
     */
    public sendThrottledMessage(message: Message, drop: () => void): void;

    /**
     * Pass ready to send to actual collector.
     */
    public isReadyToSend(): boolean;

    /**
     * Send a message. Ignore the callback.
     * @param message The message to send.
     */
    public sendMessage(message: Message): void;

}