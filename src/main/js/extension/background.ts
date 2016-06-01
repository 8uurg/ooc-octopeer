/**
 * Creates a page on a tab when the extension badge is clicked.
 */
chrome.browserAction.onClicked.addListener(() => {
    chrome.tabs.create({ url: "../../html/settings.html" });
});

chrome.tabs.onActivated.addListener((tabInfo) => {
    chrome.tabs.get(tabInfo.tabId, (tab) => {
        if (tab.url.indexOf("bitbucket") !== -1) {
            chrome.browserAction.setIcon({
                path : {
                    "48" : "../../img/icons/icon_active48.png",
                    "64" : "../../img/icons/icon_active64.png",
                    "128" : "../../img/icons/icon_active128.png"
                }
            });
        } else if (tab.url.indexOf("chrome-extension") !== -1 ) {
            chrome.browserAction.setIcon({
                path : {
                    "48" : "../../img/icons/icon48.png",
                    "64" : "../../img/icons/icon64.png",
                    "128" : "../../img/icons/icon128.png"
                }
            });
        } else {
            chrome.browserAction.setIcon({
                path : {
                    "48" : "../../img/icons/icon_inactive48.png",
                    "64" : "../../img/icons/icon_inactive64.png",
                    "128" : "../../img/icons/icon_inactive128.png"
                }
            });
        }
    });
});