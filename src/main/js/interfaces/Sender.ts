/**
 * This interfaces enforces a strategy that allows for enabling and disabling of throttling.
 */
export interface Sender {

    /**
     * The strategy that will be used.
     */
    sendStrategy: SendStrategy;

    /**
     * The time between messages, only used while throttled.
     */
    messageDelay: number;

    /**
     * Set the time between messages, when throttled.
     * @param messageDelay Give a number with the time between messages.
     */
    setMessageDelay(messageDelay: number): void;
}

export enum SendStrategy {
    Throttle,
    Bulk
}