/*This script ensures scripts can be used from the popup*/

/**
 * This function handles the status of the checkboxes and stores changes made by users locally.
 */
declare var OCTOPEER_CONSTANTS: any;

function registerCheckbox(storageName: string, checkboxId: string) {
    let checkbox = <HTMLInputElement> document.getElementById(checkboxId);
    let syncedStorage = chrome.storage.sync;
    syncedStorage.get(storageName, (items: { [key: string]: any }) => {
        checkbox.checked = items[storageName] == null ? true : items[storageName];
        checkbox.addEventListener("click", function() {
            syncedStorage.set({[storageName]: this.checked});
            console.log(storageName + ": " + this.checked);
            syncedStorage.get(null, function (items) {
                console.log("Storage: ");
                console.log(items);
            });
        });
    });
}

document.addEventListener("DOMContentLoaded", function() {
    registerCheckbox(OCTOPEER_CONSTANTS.track_mouse_position, "checkboxMousPos");
    registerCheckbox(OCTOPEER_CONSTANTS.track_screen_resolution, "checkboxScreenRes");
    registerCheckbox(OCTOPEER_CONSTANTS.track_page_resolution, "checkboxPageRes");
    registerCheckbox(OCTOPEER_CONSTANTS.track_key_strokes, "checkboxKeystrokes");
    registerCheckbox(OCTOPEER_CONSTANTS.track_pr_metadata, "checkboxPrMetaDta");
    registerCheckbox(OCTOPEER_CONSTANTS.track_browser_data, "checkboxBrowserData");
    registerCheckbox(OCTOPEER_CONSTANTS.hash_username, "checkboxHashUsername");
    registerCheckbox(OCTOPEER_CONSTANTS.hash_pr_metadata, "checkboxHashPRData");
    registerCheckbox(OCTOPEER_CONSTANTS.hash_browser_data, "checkboxHashBrowserData");
});