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
        });
    });
}

document.addEventListener("DOMContentLoaded", function() {
    registerCheckbox(OCTOPEER_CONSTANTS.track_mouse_position,       "checkboxMousePosition");
    registerCheckbox(OCTOPEER_CONSTANTS.track_mouse_clicks,         "checkboxMouseClicks");
    registerCheckbox(OCTOPEER_CONSTANTS.track_page_resolution,      "checkboxPageRes");
    registerCheckbox(OCTOPEER_CONSTANTS.track_key_strokes,          "checkboxKeystrokes");
});
