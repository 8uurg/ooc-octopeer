/*This scripts ensures scripts can be used from the popup*/

/*Variables to keep track of user settings*/
var bTracking = true;
var bHashUsername;
var bEncrypt;
var bMouseData;
var bKeyboardData;
var bPrMetaData;
var bBrowserData;

/*TODO: Initialize variables by loading user settings*/

document.addEventListener("DOMContentLoaded", function() {
    /* Tracking Button Listener */
    var stopTrackingButtonPress = document.getElementById("stopTrackingButton");
    stopTrackingButtonPress.addEventListener("click", function() {
            bTracking = !bTracking;
            console.log("Tracking: " + bTracking);
    });

    /* Encrypt Username Checkbox Listener */
    var hashUserNameCheckbox = document.getElementById("checkboxHashUsername");
    hashUserNameCheckbox.addEventListener("click", function() {
            bHashUsername = hashUserNameCheckbox.checked;
            console.log("Hash Username: " + bHashUsername);
    });

    /* Encrypt User Data Checkbox Listener */
    var encryptCheckbox = document.getElementById("checkboxEncrypt");
    encryptCheckbox.addEventListener("click", function() {
            bEncrypt =  encryptCheckbox.checked;
            console.log("Encrypt Tracking Data: " + bEncrypt);
    });

    /* Track Mouse Data Checkbox Listener */
    var mouseDataCheckbox = document.getElementById("checkboxMouseData");
    mouseDataCheckbox.addEventListener("click", function() {
            bMouseData = mouseDataCheckbox.checked;
            console.log("Track Mouse Data: " + bMouseData);
    });

    /* Track Keyboard Data Checkbox Listener */
    var keyboardDataCheckbox = document.getElementById("checkboxKeyboardData");
    keyboardDataCheckbox.addEventListener("click", function() {
            bKeyboardData = keyboardDataCheckbox.checked;
            console.log("Track Keyboard Data: " + bKeyboardData);
    });

    /* Track PR Meta Data Checkbox Listener */
    var prMetaDataCheckbox = document.getElementById("checkboxPrMetaData");
    prMetaDataCheckbox.addEventListener("click", function() {
            bPrMetaData = prMetaDataCheckbox.checked;
            console.log("Track PR Meta Data: " + bPrMetaData);
    });

    /* Track Browser Data Checkbox Listener */
    var browserDataCheckbox = document.getElementById("checkboxBrowserData");
    browserDataCheckbox.addEventListener("click", function () {
            bBrowserData = browserDataCheckbox.checked;
            console.log("Track Browser Data: " + bBrowserData);
    });
});