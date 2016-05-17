///<reference path="./keystrokeTracker.ts" />
///<reference path="./mouseTracker.ts" />
///<reference path="./resizeTracker.ts" />
///<reference path="./UserIdTracker.ts" />
declare var KeystrokeTracker: any;
declare var MouseTracker: any;
declare var ResizeTracker: any;
declare var UserIdTracker: any;

/**
 * Created by larsstegman on 16-05-16.
 * This file is the starting point for each BitBucket page tracking.
 */
let neededSettings: { [key: string]: boolean; } = {
    [OCTOPEER_CONSTANTS.track_key_strokes]: true,
    [OCTOPEER_CONSTANTS.track_mouse_position]: true,
    [OCTOPEER_CONSTANTS.track_page_resolution]: true
};

let syncedStorage = chrome.storage.sync;
syncedStorage.get(neededSettings, (items: { [key: string]: any }) => {
    // Log the current user name and repository id.
    (new UserIdTracker()).log();

    // Create an instance of the keystroke tracker.
    if (items[OCTOPEER_CONSTANTS.track_key_strokes]) {
        (new KeystrokeTracker()).register();
    }

    // Register the mousetracker to the current document.
    if (items[OCTOPEER_CONSTANTS.track_mouse_position]) {
        (new MouseTracker()).register();
    }

    // Register the resize tracker to the current document.
    if (items[OCTOPEER_CONSTANTS.track_page_resolution]) {
        (new ResizeTracker()).register();
    }
});

