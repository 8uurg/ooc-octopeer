/**
 * Created by larsstegman on 25-05-16.
 */
chrome.browserAction.onClicked.addListener(() => {
    chrome.tabs.create({ url: "../../octopeer_interface.html" });
});