/// <reference path="Trottle.d.ts" />
/// <reference path="MinDelayTrottle.d.ts" />
/// <reference path="LastMessageTrottle.d.ts" />

/**
 * Keeps the first and last message. By using the other two trottles.
 */
export class StartEndTrottle extends Trottle {
    private minDelayTrottle: MinDelayTrottle;
    private lastMessageTrottle: LastMessageTrottle;

    /**
     * Initialize a Trottle.
     */
    constructor(collector: TrackingCollector) {
        super(collector);
        this.minDelayTrottle = new MinDelayTrottle(collector);
        this.lastMessageTrottle = new LastMessageTrottle(collector);
    }

    /**
     * Send a trottled message, dropping those sent in quick succession
     * but keeping the last message if possible.
     */
    public sendTrottledMessage(message: Message, drop: () => void) {
        this.minDelayTrottle.sendTrottledMessage(message, () => {
            this.lastMessageTrottle.sendTrottledMessage(message, drop);
        });
    }
}
