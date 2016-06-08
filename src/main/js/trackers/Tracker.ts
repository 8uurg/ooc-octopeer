/// <reference path="../interfaces/Message.ts" />
/// <reference path="../interfaces/TrackingCollector.ts" />
/// <reference path="./trottles/Trottle.d.ts" />


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
     * Place a trottle in between.
     * @param Trottle The trottle class to place in between.
     */
    public withTrottle(trottle: any): Tracker {
        this.collector = new trottle(this.collector);
        return this;
    }

    /**
     * Send a message over the collector.
     */
    public sendMessage(message: Message): void {
        this.collector.sendMessage(message);
    }
} 