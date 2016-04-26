/*This scripts ensures scripts can be used from the popup*/

/*Variables to keep track of user settings*/
var bTracking = true;

document.addEventListener("DOMContentLoaded", function() {
    var stopTrackingButtonPress = document.getElementById("stopTrackingButton");
    stopTrackingButtonPress.addEventListener("click", function() {
            bTracking = !bTracking;
            console.log("Tracking: " + bTracking);
    });
});