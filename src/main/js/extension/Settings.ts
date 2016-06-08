/*This script ensures scripts can be used from the popup*/

/**
 * This function handles the status of the checkboxes and stores changes made by users locally.
 */
declare var OCTOPEER_CONSTANTS: any;

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

export function makeRefreshButtonFunctional() {
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

export function databaseLocationField() {
    let databaseLocationField = <HTMLInputElement> document.getElementById("database_location");
    let apiRegex = new RegExp("http://.*/api/");
    chrome.storage.sync.get(
        { [OCTOPEER_CONSTANTS.database_location_key]: [OCTOPEER_CONSTANTS.standard_database_location] }, (items) => {
            databaseLocationField.value = items[OCTOPEER_CONSTANTS.database_location_key];
        });

    databaseLocationField.addEventListener("keyup", () => {
        let val = databaseLocationField.value;
        if (val.match(apiRegex) !== null) {
            databaseLocationField.className = databaseLocationField.className.replace(" invalid", " valid ");
        } else {
            databaseLocationField.className = databaseLocationField.className.replace(" valid", " invalid ");
        }
    });

    document.getElementById("change-database-location").addEventListener("click", () => {
        let location = databaseLocationField.value;

        if (location.match(apiRegex) !== null) {
            chrome.storage.sync.set({ [OCTOPEER_CONSTANTS.database_location_key] : location });
            console.log("set database location to: " + location);
            databaseLocationField.className =
                databaseLocationField.className.replace(new RegExp(" invalid"), " valid");
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    registerCheckbox(OCTOPEER_CONSTANTS.track_mouse_position,       "checkboxMousePosition");
    registerCheckbox(OCTOPEER_CONSTANTS.track_mouse_clicks,         "checkboxMouseClicks");
    registerCheckbox(OCTOPEER_CONSTANTS.track_page_resolution,      "checkboxPageRes");
    registerCheckbox(OCTOPEER_CONSTANTS.track_key_strokes,          "checkboxKeystrokes");
    registerCheckbox(OCTOPEER_CONSTANTS.track_semantic_events,      "checkboxSemanticEvents");
    registerCheckbox(OCTOPEER_CONSTANTS.track_visibility,           "checkboxVisibility");

    makeRefreshButtonFunctional();

    databaseLocationField();
});


