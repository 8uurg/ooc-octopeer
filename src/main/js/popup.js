/*This scripts ensures scripts can be used from the popup*/

/*Variables to keep track of user settings*/
var bTrackingMousePos       = false;
var bTrackingScreenRes      = false;
var bTrackingPageRes        = false;
var bTrackingKeystrokes     = false;
var bTrackingPRMetaData     = false;
var bTrackingBrowserData    = false;
var bHashUsername           = true;
var bHashKeystrokes         = true;
var bHashPRMetaData         = true;
var bHashBrowserData        = true;


/*TODO: Initialize variables by loading user settings*/

document.addEventListener("DOMContentLoaded", function() {

    /*TRACKING*/
    /* Tracking Mouse Position Listener */
    var trackMousePos = document.getElementById("checkboxMousPos");
    trackMousePos.addEventListener("click", function() {
        bTrackingMousePos = !bTrackingMousePos;
            console.log("Tracking Mouse Position: " + bTrackingMousePos);
    });

    /* Tracking Screen Resolution Listener */
    var trackScreenRes = document.getElementById("checkboxScreenRes");
    trackScreenRes.addEventListener("click", function() {
        bTrackingScreenRes = !bTrackingScreenRes;
            console.log("Tracking Screen Resolution: " + bTrackingScreenRes);
    });

    /* Tracking Page Resolution Listener */
    var trackPageRes = document.getElementById("checkboxPageRes");
    trackPageRes.addEventListener("click", function() {
        bTrackingPageRes =  !bTrackingPageRes;
            console.log("Tracking Page Resolution: " + bTrackingPageRes);
    });

    /* Tracking Keystrokes Listener */
    var trackKeyStrokes = document.getElementById("checkboxKeystrokes");
    trackKeyStrokes.addEventListener("click", function() {
        bTrackingKeystrokes = !bTrackingKeystrokes;
            console.log("Tracking Keystrokes: " + bTrackingKeystrokes);
    });

    /* Tracking PR Metadata Listener */
    var trackPRMeta = document.getElementById("checkboxPrMetaDta");
    trackPRMeta.addEventListener("click", function() {
        bTrackingPRMetaData = !bTrackingPRMetaData;
            console.log("Tracking Pull Request Data: " + bTrackingPRMetaData);
    });

    /* Tracking Browser Data Listener */
    var trackBrowserdata = document.getElementById("checkboxBrowserData");
    trackBrowserdata.addEventListener("click", function() {
        bTrackingBrowserData = !bTrackingBrowserData;
            console.log("Tracking Browser Data: " + bTrackingBrowserData);
    });

    /*HASHING*/
    /* Hashing Username Listener */
    var hashMousePos = document.getElementById("checkboxHashUsername");
    hashMousePos.addEventListener("click", function() {
        bHashUsername = !bHashUsername;
        console.log("Hash Mouse Position: " + bTrackingMousePos);
    });

    /* Hashing Keystrokes Listener */
    var hashKeyStrokes = document.getElementById("checkboxHashKeystrokes");
    hashKeyStrokes.addEventListener("click", function() {
        bHashKeystrokes = !bHashKeystrokes;
        console.log("Hash Keystrokes: " + bTrackingKeystrokes);
    });

    /* Hashing PR Metadata Listener */
    var hashPRMeta = document.getElementById("checkboxHashPRData");
    hashPRMeta.addEventListener("click", function() {
        bHashPRMetaData = !bHashPRMetaData;
        console.log("Hash Pull Request Data: " + bTrackingPRMetaData);
    });

    /* Hashing Browser Data Listener */
    var hashBrowserdata = document.getElementById("checkboxHashBrowserData");
    hashBrowserdata.addEventListener("click", function() {
        bHashBrowserData = !bHashBrowserData;
        console.log("Hash Browser Data: " + bTrackingBrowserData);
    });
});