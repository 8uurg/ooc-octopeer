/// <reference path="../interfaces/TrackingCollector.ts" />
/// <reference path="../trackers/RawDataTrackers/Tracker.d.ts" />
/// <reference path="../trackers/SemanticTrackers/SemanticTracker.d.ts" />
/// <reference path="../trackers/throttles/Throttle.d.ts" />

/**
 * A descriptor for Tracker.
 */
interface TrackerDefinition {

    /**
     * The factory of this instance.
     * @param collector The tracking collector to use.
     * @param semanticMappings The semantic mappings to use.
     */
    tracker: (collector: TrackingCollector, semanticMappings?: SemanticMapping[]) => void;

    /**
     * The setting for this tracker.
     */
    setting: {
        name: string;
        def: boolean;
    };
}