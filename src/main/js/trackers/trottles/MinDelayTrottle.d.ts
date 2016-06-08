/// <reference path="Trottle.d.ts" />

/**
 * Drops all messages coming in within a certain timespan of the last accepted message.
 */
declare class MinDelayTrottle extends Trottle {}
