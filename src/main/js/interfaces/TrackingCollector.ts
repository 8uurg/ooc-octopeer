/// <reference path="./Message.ts" />

/**
 * An collector of tracking data that multiplexes it over a single Port.
 */
interface TrackingCollector {

    /**
     * Send a message through the collector.
     */
    sendMessage(m: Message);
}