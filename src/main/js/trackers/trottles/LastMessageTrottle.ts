/// <reference path="Trottle.d.ts" />

/**
 * Drops all messages coming in before a certain timespan of the current message.
 */
export class LastMessageTrottle extends Trottle {
    private lastTimer: any = -1;
    private lastDrop: () => void;
    private maxDelay: number = 1000;

    /**
     * Send a trottled message, dropping those sent before if sent too quickly.
     */
    public sendTrottledMessage(message: Message, drop: () => void) {
        if (this.lastDrop) {
            clearTimeout(this.lastTimer);
            this.lastDrop();
        }

        this.lastDrop = drop;
        this.lastTimer = setTimeout(() => {
            this.lastDrop = null;
            super.sendTrottledMessage(message, drop);
        }, this.maxDelay);
    }
}
