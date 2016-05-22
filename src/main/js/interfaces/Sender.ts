/**
 * This interfaces enforces a strategy that allows for enabling and disabling of throttling.
 */
interface Sender {

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
    setMessageDelay(messageDelay: number);
}

enum SendStrategy {
    Throttle,
    Bulk
}