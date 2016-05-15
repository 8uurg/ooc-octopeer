/*This script ensures scripts can be used from the popup*/

/*
 * This function handles the status of the checkboxes and stores changes made by users locally.
 */
export function registerCheckbox(storagename: string, checkboxId: string) {
    let checkbox = <HTMLInputElement> document.getElementById(checkboxId);
    checkbox.checked = JSON.parse(localStorage.getItem(storagename)) || false;

    checkbox.addEventListener("click", function() {
        localStorage.setItem(storagename, this.checked);
        console.log(storagename + ": " + this.checked);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    registerCheckbox("trackMousePos", "checkboxMousPos");
    registerCheckbox("trackScreenRes", "checkboxScreenRes");
    registerCheckbox("trackPageRes", "checkboxPageRes");
    registerCheckbox("trackKeystrokes", "checkboxKeystrokes");
    registerCheckbox("trackPRMetaData", "checkboxPrMetaDta");
    registerCheckbox("trackBrowserData", "checkboxBrowserData");
    registerCheckbox("hashUsername", "checkboxHashUsername");
    registerCheckbox("hashPRMetaData", "checkboxHashPRData");
    registerCheckbox("hashBrowserData", "checkboxHashBrowserData");
});