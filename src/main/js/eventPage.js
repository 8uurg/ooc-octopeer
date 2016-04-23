/**
 * Created by Thomas on 23-4-2016.
 */

//This file runs in the background and can be used to add events.
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript({
        file: 'js/mouseTracker.js'
    });
    chrome.tabs.executeScript({
        file: 'js/resizeTracker.js'
    });
});