/*This scripts ensures scripts can be used from the popup*/

/*Variables to keep track of user settings*/
var bTrackingMousePos       = JSON.parse(localStorage.getItem("trackMousePos")) || false;
var bTrackingScreenRes      = JSON.parse(localStorage.getItem("trackScreenRes")) || false;
var bTrackingPageRes        = JSON.parse(localStorage.getItem("trackPageRes"))    || false;
var bTrackingKeystrokes     = JSON.parse(localStorage.getItem("trackKeystrokes"))  || false;
var bTrackingPRMetaData     = JSON.parse(localStorage.getItem("trackPRMetaData"))  || false;
var bTrackingBrowserData    = JSON.parse(localStorage.getItem("trackBrowserData")) || false;
var bHashUsername           = JSON.parse(localStorage.getItem("hashUsername"))     || false;
var bHashPRMetaData         = JSON.parse(localStorage.getItem("hashPRMetaData"))  || false;
var bHashBrowserData        = JSON.parse(localStorage.getItem("hashBrowserData")) || false;

document.addEventListener("DOMContentLoaded", function() {
    /*TRACKING*/
    /* Tracking Mouse Position Listener */
    var trackMousePos = document.getElementById("checkboxMousPos");
    trackMousePos.checked = bTrackingMousePos;
    trackMousePos.addEventListener("click", function() {
        bTrackingMousePos = !bTrackingMousePos;
        localStorage.setItem("trackMousePos", bTrackingMousePos);
        console.log("Tracking Mouse Position: " + bTrackingMousePos);
    });

    /* Tracking Screen Resolution Listener */
    var trackScreenRes = document.getElementById("checkboxScreenRes");
    trackScreenRes.checked = bTrackingScreenRes;
    trackScreenRes.addEventListener("click", function() {
        bTrackingScreenRes = !bTrackingScreenRes;
        localStorage.setItem("trackScreenRes", bTrackingScreenRes);
        console.log("Tracking Screen Resolution: " + bTrackingScreenRes);
    });

    /* Tracking Page Resolution Listener */
    var trackPageRes = document.getElementById("checkboxPageRes");
    trackPageRes.checked = bTrackingPageRes;
    trackPageRes.addEventListener("click", function() {
        bTrackingPageRes =  !bTrackingPageRes;
        localStorage.setItem("trackPageRes", bTrackingPageRes);
        console.log("Tracking Page Resolution: " + bTrackingPageRes);
    });

    /* Tracking Keystrokes Listener */
    var trackKeyStrokes = document.getElementById("checkboxKeystrokes");
    trackKeyStrokes.checked = bTrackingKeystrokes;
    trackKeyStrokes.addEventListener("click", function() {
        bTrackingKeystrokes = !bTrackingKeystrokes;
        localStorage.setItem("trackKeystrokes", bTrackingKeystrokes);
        console.log("Tracking Keystrokes: " + bTrackingKeystrokes);
    });

    /* Tracking PR Metadata Listener */
    var trackPRMeta = document.getElementById("checkboxPrMetaDta");
    trackPRMeta.checked = bTrackingPRMetaData;
    trackPRMeta.addEventListener("click", function() {
        bTrackingPRMetaData = !bTrackingPRMetaData;
        localStorage.setItem("trackPRMetaData", bTrackingPRMetaData);
        console.log("Tracking Pull Request Data: " + bTrackingPRMetaData);
    });

    /* Tracking Browser Data Listener */
    var trackBrowserdata = document.getElementById("checkboxBrowserData");
    trackBrowserdata.checked = bTrackingBrowserData;
    trackBrowserdata.addEventListener("click", function() {
        bTrackingBrowserData = !bTrackingBrowserData;
        localStorage.setItem("trackBrowserData", bTrackingBrowserData);
        console.log("Tracking Browser Data: " + bTrackingBrowserData);
    });

    /*HASHING*/
    /* Hashing Username Listener */
    var hashUsername = document.getElementById("checkboxHashUsername");
    hashUsername.checked = bHashUsername;
    hashUsername.addEventListener("click", function() {
        bHashUsername = !bHashUsername;
        localStorage.setItem("hashUsername", bHashUsername);
        console.log("Hash Mouse Position: " + bTrackingMousePos);
    });

    /* Hashing PR Metadata Listener */
    var hashPRMeta = document.getElementById("checkboxHashPRData");
    hashPRMeta.checked = bHashPRMetaData;
    hashPRMeta.addEventListener("click", function() {
        bHashPRMetaData = !bHashPRMetaData;
        localStorage.setItem("hashPRMetaData", bHashPRMetaData);
        console.log("Hash Pull Request Data: " + bTrackingPRMetaData);
    });

    /* Hashing Browser Data Listener */
    var hashBrowserdata = document.getElementById("checkboxHashBrowserData");
    hashBrowserdata.checked = bHashBrowserData;
    hashBrowserdata.addEventListener("click", function() {
        bHashBrowserData = !bHashBrowserData;
        localStorage.setItem("hashBrowserData", bHashBrowserData);
        console.log("Hash Browser Data: " + bTrackingBrowserData);
    });
});