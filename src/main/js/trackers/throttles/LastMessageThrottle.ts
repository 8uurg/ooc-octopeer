/// <reference path="Throttle.d.ts" />

/**
 * Drops all messages except the last one in a certain time span.
 */
export class LastMessageThrottle extends Throttle {
    private lastTimer: any = -1;
    private lastDrop: () => void;
    private maxDelay: number = 1000;

    /**
     * Send a throttled message, dropping those sent before if sent too quickly.
     * @param message The message to send.
     * @param drop The callback to call in case of failure.
     */
    public sendThrottledMessage(message: Message, drop: () => void) {
        if (this.lastDrop) {
            clearTimeout(this.lastTimer);
            this.lastDrop();
        }

        this.lastDrop = drop;
        this.lastTimer = setTimeout(() => {
            this.lastDrop = null;
            super.sendThrottledMessage(message, drop);
        }, this.maxDelay);
    }
}
