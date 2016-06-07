/// <reference path="Trottle.d.ts" />

/**
 * Drops all messages coming in within a certain timespan of the last accepted message.
 */
export class MinDelayTrottle extends Trottle {
    private lastDate: number = -1;
    private minDelay: number = 1000;

    /**
     * Send a trottled message, dropping those sent in quick succession.
     */
    public sendTrottledMessage(message: Message, drop: () => void) {
        const currDate: number = Date.now();

        if (this.lastDate + this.minDelay < currDate) {
            this.lastDate = currDate;
            super.sendTrottledMessage(message, drop);
        } else {
            drop();
        }
    }
}
