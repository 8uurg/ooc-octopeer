/// <reference path="../../../typings/index.d.ts" />

/// <reference path="./interfaces/SessionDataGatherer.ts" />
/// <reference path="./interfaces/SemanticMapping.ts" />
/// <reference path="./interfaces/TrackerDefinition.ts" />
/// <reference path="./interfaces/SemanticMapping.ts" />

/// <reference path="./trackers/throttles/Throttle.ts" />

/**
 * The class that prepares everything and connects dependencies.
 * Makes sure everything is good to go.
 */
export class Main {

    private collector: (sessionDataGatherer: SessionDataGatherer) => TrackingCollector;
    private trackerDefinitions: TrackerDefinition[] = [];
    private semanticMappings: SemanticMapping[];
    private sessionDataGatherer: SessionDataGatherer;

    /**
     * Declare a tracking collector.
     * @param collector The tracking collector to declare.
     * @throws Error upon registering two or more tracking collectors.
     */
    public declareTrackingCollector(collector: (sessionDataGatherer: SessionDataGatherer) => TrackingCollector): void {
        if (this.collector != null) {
            throw new Error("Don't register more than a single tracking collector.");
        }

        this.collector = collector;
    }

    /**
     * Declare a session data gatherer.
     * @param sessionDataGatherer The SessionDataGatherer to declare.
     * @throws Error upon registering two or more session data gatherers.
     */
    public declareSessionDataGatherer(sessionDataGatherer: () => SessionDataGatherer): void {
        if (this.sessionDataGatherer != null) {
            throw new Error("Don't register more than a single tracking collector.");
        }

        this.sessionDataGatherer = sessionDataGatherer();
    }

    /**
     * Declare a semantic mapping.
     * @param semanticMappings The semantic mappings to declare.
     * @throws Error upon registering two or more semantic mappings.
     */
    public declareSemanticMappings(semanticMappings: SemanticMapping[]): void {
        if (this.semanticMappings != null) {
            throw new Error("Don't register more than a single semantic mapping.");
        }

        this.semanticMappings = semanticMappings;
    }

    /**
     * Declare a tracker to be loaded upon load.
     * @param definition The definition to use for registering the tracker.
     */
    public declareTracker(definition: TrackerDefinition): void {
        this.trackerDefinitions.push(definition);
    }

    /**
     * Create the default settings object.
     */
    private getDefaultSettings(): { [key: string]: boolean; } {
        let settings: {[key: string]: boolean} = {};
        this.trackerDefinitions.forEach(function(trackerDefinition) {
            settings[trackerDefinition.setting.name] = trackerDefinition.setting.def;
        });
        return settings;
    }

    /**
     * Verify if we can start in the current state of things.
     */
    private verifiedCollector(): TrackingCollector {
        if (this.collector == null) {
            throw new Error("Before creating the trackers, a collector is required.");
        }
        const collector = this.collector(this.sessionDataGatherer);
        if (!collector.isReadyToSend()) {
            throw new Error("The collector was unable to obtain the session data required.");
        }
        return collector;
    }

    /**
     * Run to create and register all trackers.
     * @throws Error upon missing collector.
     */
    public done() {
        const collector: TrackingCollector = this.verifiedCollector();
        const requiredSettings = this.getDefaultSettings();

        chrome.storage.sync.get(requiredSettings, (preferences: { [key: string]: any }) => {
            const activated = this.trackerDefinitions
                .filter((trackerDefinition) => preferences[trackerDefinition.setting.name]);
            activated.forEach((trackerDefinition) => {
                trackerDefinition.tracker(collector, this.semanticMappings);
            });
        });
    }

}

// `var` is required in global scope.
var main = new Main(); // tslint:disable-line
