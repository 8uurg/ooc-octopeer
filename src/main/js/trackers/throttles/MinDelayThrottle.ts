/// <reference path="Throttle.d.ts" />

/**
 * Drops all messages coming in within a certain timespan of the last accepted message.
 */
export class MinDelayThrottle extends Throttle {
    private lastTimeSent: number = -1;
    private minDelay: number = 1000;

    /**
     * Send a throttled message, dropping those sent in quick succession.
     * @param message The message to send.
     * @param drop The callback to call in case of failure.
     */
    public sendThrottledMessage(message: Message, drop: () => void) {
        const currDate: number = Date.now();

        if (this.lastTimeSent + this.minDelay < currDate) {
            this.lastTimeSent = currDate;
            super.sendThrottledMessage(message, drop);
        } else {
            drop();
        }
    }
}
