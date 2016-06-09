/// <reference path="Throttle.d.ts" />

/**
 * Drops all messages coming in within a certain timespan of the last accepted message.
 */
declare class MinDelayThrottle extends Throttle {}
