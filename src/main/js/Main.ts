///<reference path="./trackers/RawDataTrackers/KeystrokeTracker.ts" />
///<reference path="./trackers/RawDataTrackers/MouseClickTracker.ts" />
///<reference path="./trackers/RawDataTrackers/MousePositionTracker.ts" />
///<reference path="./trackers/RawDataTrackers/ResizeTracker.ts" />
///<reference path="./trackers/semanticTrackerMerged.ts" />
///<reference path="./trackers/RawDataTrackers/VisibilityTracker.ts" />
///<reference path="./trackers/RawDataTrackers/DomTracker.ts" />

///<reference path="./ChromeTrackingCollector.ts" />
///<reference path="./BitBucketSessionDataGatherer.ts" />

declare var VisibilityTracker: any;
declare var KeystrokeTracker: any;
declare var MouseClickTracker: any;
declare var MousePositionTracker: any;
declare var SemanticTrackerMerged: any;
declare var ResizeTracker: any;
declare var ScrollTracker: any;
declare var DomTracker: any;
declare var DataGatherer: any;
declare var ChromeTrackingCollector: any;

// The needed settings. True is the default value if storage does not contain the key.
let neededSettings: { [key: string]: boolean; } = {
    [OCTOPEER_CONSTANTS.track_key_strokes]: true,
    [OCTOPEER_CONSTANTS.track_mouse_position]: true,
    [OCTOPEER_CONSTANTS.track_page_resolution]: true,
    [OCTOPEER_CONSTANTS.track_mouse_clicks]: true,
    [OCTOPEER_CONSTANTS.track_scroll]: true,
    [OCTOPEER_CONSTANTS.track_semantic_events]: true,
    [OCTOPEER_CONSTANTS.track_visibility]: true,
    [OCTOPEER_CONSTANTS.track_dom]: true
};

chrome.storage.sync.get(neededSettings, (items: { [key: string]: any }) => {

    // Create a collector.
    let collector: TrackingCollector = new ChromeTrackingCollector(new DataGatherer());

    if (!collector.isReadyToSend()) {
        return;
    }

    // Register the visibility tracker to the current document.
    if (items[OCTOPEER_CONSTANTS.track_dom]) {
        (new DomTracker()).withCollector(collector).register();
    }

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

    // Register the scroll tracker to the current document.
    if (items[OCTOPEER_CONSTANTS.track_scroll]) {
        (new ScrollTracker()).withCollector(collector).register();
    }

    // Register the mouse click tracker to the current document.
    if (items[OCTOPEER_CONSTANTS.track_mouse_clicks]) {
        (new MouseClickTracker()).withCollector(collector).register();
    }

    // Register the semantic event tracker to the current document.
    if (items[OCTOPEER_CONSTANTS.track_semantic_events]) {
        (new SemanticTrackerMerged()).withCollector(collector).register();
    }

    // Register the visibility tracker to the current document.
    if (items[OCTOPEER_CONSTANTS.track_visibility]) {
        (new VisibilityTracker()).withCollector(collector).register();
    }
});






