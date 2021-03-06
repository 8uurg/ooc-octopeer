/// <reference path="../../interfaces/Message.ts" />
/// <reference path="../../interfaces/TrackingCollector.ts" />
/// <reference path="../throttles/Throttle.d.ts" />

/**
 * An abstract class that represents a tracker.
 * A base for building a tracker upon.
 */
export abstract class Tracker {
    private collector: TrackingCollector;

    /**
     * Register a tracker into the current environment.
     */
    public abstract register(): void;

    /**
     * Define the collector to use with this class.
     * @param collector Collector to send data to.
     */
    public withCollector(collector: TrackingCollector): Tracker {
        this.collector = collector;
        return this;
    }

    /**
     * Place a throttle in between.
     * @param throttle The throttle class to place in between.
     */
    public withThrottle(throttle: (collector: TrackingCollector) => Throttle): Tracker {
        this.collector = throttle(this.collector);
        return this;
    }

    /**
     * Send a message over the collector.
     */
    public sendMessage(message: Message): void {
        this.collector.sendMessage(message);
    }
}