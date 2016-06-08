/// <reference path="../../interfaces/TrackingCollector.ts" />

/**
 * A basic mainframe for creating a trottle.
 */
declare abstract class Trottle implements TrackingCollector {

    /**
     * Initialize a Trottle.
     */
    constructor(collector: TrackingCollector);

    /**
     * Send message with a callback.
     * Callback is used to handle the message being dropped.
     */
    public sendTrottledMessage(message: Message, drop: () => void): void;

    /**
     * Pass ready to send to actual collector.
     */
    public isReadyToSend(): boolean;

    /**
     * Send a message. Ignore the callback.
     */
    public sendMessage(message: Message): void;

}