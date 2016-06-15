/// <reference path="./interfaces/SessionDataGatherer.ts" />
/// <reference path="./interfaces/SemanticMapping.ts" />
/// <reference path="./interfaces/TrackerDefinition.ts" />
/// <reference path="./interfaces/SemanticMapping.ts" />

/// <reference path="./trackers/throttles/Throttle.d.ts" />

/**
 * The class that prepares everthing for readyness.
 */
declare class Main {

    /**
     * Declare a tracking collector.
     * @param collector The tracking collector to declare.
     * @throws Error upon registering two or more tracking collectors.
     */
    public declareTrackingCollector(collector: (sessionDataGatherer: SessionDataGatherer) => TrackingCollector): void;

    /**
     * Declare a session data gatherer.
     * @param sessionDataGatherer The SessionDataGatherer to declare.
     * @throws Error upon registering two or more session data gatherers.
     */
    public declareSessionDataGatherer(sessionDataGatherer: () => SessionDataGatherer): void;

    /**
     * Declare a semantic mapping.
     * @param semanticMappings The semantic mappings to declare.
     * @throws Error upon registering two or more semantic mappings.
     */
    public declareSemanticMappings(semanticMappings: SemanticMapping[]): void;

    /**
     * Declare a tracker to be loaded upon load.
     * @param definition The definition to use for registering the tracker.
     */
    public declareTracker(definition: TrackerDefinition): void;

    /**
     * Run to create and register all trackers.
     * @throws Error upon missing collector.
     */
    public done(): void;

}

declare var main: Main;