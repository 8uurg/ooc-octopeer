///<reference path="./trackers/RawDataTrackers/KeystrokeTracker.ts" />
///<reference path="./trackers/RawDataTrackers/MouseClickTracker.ts" />
///<reference path="./trackers/RawDataTrackers/MousePositionTracker.ts" />
///<reference path="./trackers/RawDataTrackers/ResizeTracker.ts" />
///<reference path="./trackers/RawDataTrackers/VisibilityTracker.ts" />
///<reference path="./trackers/RawDataTrackers/DomTracker.ts" />

///<reference path="./ChromeTrackingCollector.ts" />
///<reference path="./BitBucketSessionDataGatherer.ts" />

declare var VisibilityTracker: any;
declare var KeystrokeTracker: any;
declare var MouseClickTracker: any;
declare var MousePositionTracker: any;
declare var ResizeTracker: any;
declare var ScrollTracker: any;
declare var DomTracker: any;
declare var DataGatherer: any;
declare var ChromeTrackingCollector: any;
declare var StartEndThrottle: any;

declare var KeystrokeSemanticTracker: any;
declare var ClickSemanticTracker: any;
declare var MouseSemanticTracker: any;

// The needed settings. True is the default value if storage does not contain the key.
let neededSettings: { [key: string]: boolean; } = {
    [OCTOPEER_CONSTANTS.track_key_strokes]: true,
    [OCTOPEER_CONSTANTS.track_mouse_position]: true,
    [OCTOPEER_CONSTANTS.track_page_resolution]: true,
    [OCTOPEER_CONSTANTS.track_mouse_clicks]: true,
    [OCTOPEER_CONSTANTS.track_scroll]: true,
    [OCTOPEER_CONSTANTS.track_semantic_clicks]: true,
    [OCTOPEER_CONSTANTS.track_visibility]: true,
    [OCTOPEER_CONSTANTS.track_semantic_key_strokes]: true,
    [OCTOPEER_CONSTANTS.track_semantic_position]: true,
    [OCTOPEER_CONSTANTS.track_dom]: true
};

let semanticElementsToTrack: {eventType: string, selector: string, trackKeyStroke: boolean,
    trackClick: boolean, trackHover: boolean, trackScroll: boolean}[] = [
    {eventType: "Merge Pull Request", selector: "#fullfill-pullrequest", trackKeyStroke: true,
        trackClick: true, trackHover: true, trackScroll: true},
    {eventType: "Close Pull Request", selector: "#reject-pullrequest", trackKeyStroke: true,
        trackClick: true, trackHover: true, trackScroll: true},
    {eventType: "Cancel inline comment", selector: ".new-comment .aui-button-primary", trackKeyStroke: true,
        trackClick: true, trackHover: true, trackScroll: true},
    {eventType: "Comment inline comment", selector: ".new-comment .buttons a", trackKeyStroke: true,
        trackClick: true, trackHover: true, trackScroll: true},
    {eventType: "Inline Comment", selector: ".aui-iconfont-add-comment", trackKeyStroke: true,
        trackClick: true, trackHover: true, trackScroll: true},
    {eventType: "Edit comment", selector: ".comment-actions .edit-link", trackKeyStroke: true,
        trackClick: true, trackHover: true, trackScroll: true},
    {eventType: "Add reaction", selector: ".new-comment .buttons .aui-button-primary", trackKeyStroke: true,
        trackClick: true, trackHover: true, trackScroll: true},
    {eventType: "Inline comment textfield", selector: ".comment-thread-container #id_new_comment", trackKeyStroke: true,
        trackClick: true, trackHover: true, trackScroll: true},
    {eventType: "Comment textfield", selector: "#general-comments #id_new_comment", trackKeyStroke: true,
        trackClick: true, trackHover: true, trackScroll: true}
];

chrome.storage.sync.get(neededSettings, (preferences: { [key: string]: any }) => {

    // Create a collector.
    let collector: TrackingCollector = new ChromeTrackingCollector(new DataGatherer());

    if (!collector.isReadyToSend()) {
        return;
    }

    // Register the visibility tracker to the current document.
    if (preferences[OCTOPEER_CONSTANTS.track_dom]) {
        (new DomTracker()).withCollector(collector).register();
    }

    // Register the resize tracker to the current document.
    if (preferences[OCTOPEER_CONSTANTS.track_page_resolution]) {
        (new ResizeTracker()).withCollector(collector).withThrottle(StartEndThrottle).register();
    }

    // Create an instance of the keystroke tracker.
    if (preferences[OCTOPEER_CONSTANTS.track_key_strokes]) {
        (new KeystrokeTracker()).withCollector(collector).register();
    }

    // Register the mousetracker to the current document.
    if (preferences[OCTOPEER_CONSTANTS.track_mouse_position]) {
        (new MousePositionTracker()).withCollector(collector).withThrottle(StartEndThrottle).register();
    }

    // Register the scroll tracker to the current document.
    if (preferences[OCTOPEER_CONSTANTS.track_scroll]) {
        (new ScrollTracker()).withCollector(collector).register();
    }

    // Register the mouse click tracker to the current document.
    if (preferences[OCTOPEER_CONSTANTS.track_mouse_clicks]) {
        (new MouseClickTracker()).withCollector(collector).register();
    }

    // Register the visibility tracker to the current document.
    if (preferences[OCTOPEER_CONSTANTS.track_visibility]) {
        (new VisibilityTracker()).withCollector(collector).register();
    }

    let keyStrokeTracker = new KeystrokeSemanticTracker().withCollector(collector);
    let mouseClickTracker = new ClickSemanticTracker().withCollector(collector);
    let mouseHoverTracker = new MouseSemanticTracker().withCollector(collector);

    for (let i = 0; i < semanticElementsToTrack.length; i++) {
        let element = semanticElementsToTrack[i];
        if (element.trackKeyStroke && preferences[OCTOPEER_CONSTANTS.track_semantic_key_strokes]) {
            keyStrokeTracker.registerElementWithSelector(element.selector, element.eventType);
        }
        if (element.trackClick && preferences[OCTOPEER_CONSTANTS.track_semantic_clicks]) {
            mouseClickTracker.registerElementWithSelector(element.selector, element.eventType);
        }
        if (element.trackHover && preferences[OCTOPEER_CONSTANTS.track_semantic_position]) {
            mouseHoverTracker.registerElementWithSelector(element.selector, element.eventType);
        }
    }
});