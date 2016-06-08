/*This script ensures scripts can be used from the popup*/

declare var OCTOPEER_CONSTANTS: any;

/**
 * Adds a listener for each checkbox which changes the setting in chrome.
 */

export function registerCheckbox(storageName: string, checkboxId: string) {
    let checkbox = <HTMLInputElement> document.getElementById(checkboxId);
    let syncedStorage = chrome.storage.sync;
    syncedStorage.get({[storageName]: true}, (items: { [key: string]: any }) => {
        checkbox.checked = items[storageName];
        checkbox.addEventListener("click", function() {
            syncedStorage.set({[storageName]: this.checked});
            console.log(storageName + ": " + this.checked);
            document.getElementById("refresh-pages-notification").style.setProperty("display", "block");
        });
    });
}

/**
 * Adds the functionality to the checkbox toggles.
 */
export function setupCheckboxes() {
    registerCheckbox(OCTOPEER_CONSTANTS.track_mouse_position,           "checkboxMousePosition");
    registerCheckbox(OCTOPEER_CONSTANTS.track_mouse_clicks,             "checkboxMouseClicks");
    registerCheckbox(OCTOPEER_CONSTANTS.track_page_resolution,          "checkboxPageRes");
    registerCheckbox(OCTOPEER_CONSTANTS.track_key_strokes,              "checkboxKeystrokes");
    registerCheckbox(OCTOPEER_CONSTANTS.track_scroll,                   "checkboxScroll");
    registerCheckbox(OCTOPEER_CONSTANTS.track_semantic_position,        "checkboxSemanticPosition");
    registerCheckbox(OCTOPEER_CONSTANTS.track_semantic_clicks,          "checkboxSemanticClicks");
    registerCheckbox(OCTOPEER_CONSTANTS.track_semantic_key_strokes,     "checkboxSemanticKeystrokes");
    registerCheckbox(OCTOPEER_CONSTANTS.track_semantic_scrolling,       "checkboxSemanticScrolling");
    registerCheckbox(OCTOPEER_CONSTANTS.track_semantic_visibility,      "checkboxSemanticPRPageVisibility");
}

/**
 * Adds the functionality to the refresh notification.
 */
export function setUpRefreshNotificationElements() {

    document.getElementById("refresh-bitbucket-pages").addEventListener("click", () => {
        chrome.tabs.query({
            "url" : [
                "http://bitbucket.org/*",
                "https://bitbucket.org/*"
            ]
        }, (tabs: chrome.tabs.Tab[]) => {
            tabs.forEach((tab) => {
                chrome.tabs.reload(tab.id);
            });
            document.getElementById("refresh-pages-notification").style.setProperty("display", "none");
        });
    });
}

/**
 * Creates the functionality for the database setting's textfield and apply button.
 */
export function setUpDatabaseLocationElements() {
    let databaseLocationField = <HTMLInputElement> document.getElementById("database_location");
    let apiRegex = new RegExp("(http|https)://.*/api/");
    chrome.storage.sync.get(
        { [OCTOPEER_CONSTANTS.database_location_key]: [OCTOPEER_CONSTANTS.standard_database_location] }, (items) => {
            databaseLocationField.value = items[OCTOPEER_CONSTANTS.database_location_key];
        });

    document.getElementById("change-database-location").addEventListener("click", () => {
        let location = databaseLocationField.value;

        if (location.match(apiRegex) !== null) {
            chrome.storage.sync.set({ [OCTOPEER_CONSTANTS.database_location_key] : location });
            console.log("set database location to: " + location);
            databaseLocationField.className =
                databaseLocationField.className.replace(" invalid", " valid");
        } else {
            databaseLocationField.className =
                databaseLocationField.className.replace(" valid", " invalid");
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    setupCheckboxes();
    setUpRefreshNotificationElements();
    setUpDatabaseLocationElements();
});


