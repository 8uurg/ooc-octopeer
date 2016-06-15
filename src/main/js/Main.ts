/// <reference path="../../../typings/index.d.ts" />

/// <reference path="./interfaces/SessionDataGatherer.ts" />
/// <reference path="./interfaces/SemanticMapping.ts" />
/// <reference path="./interfaces/TrackerDefinition.ts" />
/// <reference path="./interfaces/SemanticMapping.ts" />

/// <reference path="./trackers/throttles/Throttle.ts" />

/**
 * The class that prepares everthing for readyness.
 */
export class Main {

    private collector: TrackingCollector;
    private trackers: TrackerDefinition[];
    private semanticMappings: SemanticMapping[];
    private sessionDataGatherer: SessionDataGatherer;

    /**
     * Declare a tracking collector.
     * @throws Error upon registering two or more tracking collectors.
     */
    public declareTrackingCollector(collector: (sessionDataGatherer: SessionDataGatherer) => TrackingCollector): void {
        if(this.collector != null) {
            throw new Error("Don't register more than a single tracking collector.");
        }

        this.collector = collector(this.sessionDataGatherer);
    }

    /**
     * Declare a session data getherer.
     * @throws Error upon registering two or more session data gatherers.
     */
    public declareSessionDataGatherer(sessionDataGatherer: () => SessionDataGatherer): void {
        if(this.sessionDataGatherer != null) {
            throw new Error("Don't register more than a single tracking collector.");
        }

        this.sessionDataGatherer = sessionDataGatherer();
    }
    
    /**
     * Declare a semantic mapping.
     * @throws Error upon registering two or more semantic mappings.
     */
    public declareSemanticMappings(semanticMappings: SemanticMapping[]): void {
        if(this.semanticMappings != null) {
            throw new Error("Don't register more than a single semantic mapping.");
        }

        this.semanticMappings = semanticMappings;
    }
    /**
     * Declare a tracker to be loaded upon load.
     * @param definition The definition to use for registering the tracker.
     */
    public declareTracker(definition: TrackerDefinition): void {
        this.trackers.push(definition);
    }

    /**
     * Create the default settings object.
     */
    private getDefaultSettings() {
        let settings:{[key: string]: boolean} = {};
        this.trackers.forEach(function(tracker) {
            settings[tracker.setting.name] = tracker.setting.def;
        });
        return settings;
    }

    /**
     * Verify if we can start in the current state of things.
     */
    private verifyState() {
        if(this.collector == null) {
            throw new Error("Before creating the trackers, a collector is required.");
        }

        if(!this.collector.isReadyToSend()) {
            throw new Error("The collector was unable to obtain the data required.");
        }
    }

    /**
     * Run to create and register all trackers.
     * @throws Error upon missing collector.
     */
    public done() {
        this.verifyState();

        const requiredSettings = this.getDefaultSettings(); 

        chrome.storage.sync.get(requiredSettings, (preferences: { [key: string]: any }) => {
            const activated = this.trackers.filter((tracker) => preferences[tracker.setting.name]);
            activated.forEach(function(tracker) {
                tracker.tracker(this.collector, this.semanticMappings);
            });
        });
    }

}

// var is required in global scope.
var main = new Main(); // tslint:disable-line

// Keep this for reference, don't want to look through git to find this again.
// // The needed settings. True is the default value if storage does not contain the key.
// let neededSettings: { [key: string]: boolean; } = {
//     [OCTOPEER_CONSTANTS.track_key_strokes]: true,
//     [OCTOPEER_CONSTANTS.track_mouse_position]: true,
//     [OCTOPEER_CONSTANTS.track_page_resolution]: true,
//     [OCTOPEER_CONSTANTS.track_mouse_clicks]: true,
//     [OCTOPEER_CONSTANTS.track_scroll]: true,
//     [OCTOPEER_CONSTANTS.track_semantic_clicks]: true,
//     [OCTOPEER_CONSTANTS.track_semantic_visibility]: true,
//     [OCTOPEER_CONSTANTS.track_semantic_key_strokes]: true,
//     [OCTOPEER_CONSTANTS.track_semantic_position]: true,
//     [OCTOPEER_CONSTANTS.track_dom]: true
// };
