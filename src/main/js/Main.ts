///<reference path="./trackers/KeystrokeTracker.ts" />
///<reference path="./trackers/MouseClickTracker.ts" />
///<reference path="./trackers/MousePositionTracker.ts" />
///<reference path="./trackers/ResizeTracker.ts" />
///<reference path="./trackers/semanticTracker.ts" />
///<reference path="./ChromeTrackingCollector.ts" />
///<reference path="./BitBucketSessionDataGatherer.ts" />

declare var KeystrokeTracker: any;
declare var MouseClickTracker: any;
declare var MousePositionTracker: any;
declare var ResizeTracker: any;
declare var DataGatherer: any;
declare var ChromeTrackingCollector: any;

/**
 * Created by larsstegman on 16-05-16.
 * This file is the starting point for each BitBucket page tracking.
 */

// The needed settings. True is the default value if storage does not contain the key.
let neededSettings: { [key: string]: boolean; } = {
    [OCTOPEER_CONSTANTS.track_key_strokes]: true,
    [OCTOPEER_CONSTANTS.track_mouse_position]: true,
    [OCTOPEER_CONSTANTS.track_page_resolution]: true,
    [OCTOPEER_CONSTANTS.track_mouse_clicks]: true,
    [OCTOPEER_CONSTANTS.track_semantic_events]: true
};

chrome.storage.sync.get(neededSettings, (items: { [key: string]: any }) => {
    // Create a collector.
    let collector: TrackingCollector = new ChromeTrackingCollector(new DataGatherer());
    // Register the resize tracker to the current document.
    if (items[OCTOPEER_CONSTANTS.track_page_resolution]) {
        (new ResizeTracker()).withCollector(collector).register();
    }

    // Create an instance of the keystroke tracker.
    if (items[OCTOPEER_CONSTANTS.track_key_strokes]) {
        (new KeystrokeTracker()).withCollector(collector).register();
    }

    // Register the mousetracker to the current document.
    if (items[OCTOPEER_CONSTANTS.track_mouse_position]) {
        (new MousePositionTracker()).withCollector(collector).register();
    }

    // Register the mouse click tracker to the current document.
    if (items[OCTOPEER_CONSTANTS.track_mouse_clicks]) {
        (new MouseClickTracker()).withCollector(collector).register();
    }

    // Register the semantic event tracker to the current document.
    if (items[OCTOPEER_CONSTANTS.track_semantic_events]) {
        (new SemanticTracker()).withCollector(collector).register();
    }
});






