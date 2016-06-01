/**
 * Creates a page on a tab when the extension badge is clicked.
 */
chrome.browserAction.onClicked.addListener(() => {
    chrome.tabs.create({ url: "../../html/settings.html" });
});

let urlWithIcon = [
    {
        urlComponent: "bitbucket",
        path: {
            "48" : "../../img/icons/icon_active48.png",
            "64" : "../../img/icons/icon_active64.png",
            "128" : "../../img/icons/icon_active128.png"
        }
    },
    {
        urlComponent: "chrome-extension",
        path: {
            "48" : "../../img/icons/icon48.png",
            "64" : "../../img/icons/icon64.png",
            "128" : "../../img/icons/icon128.png"
        }
    },
    {
        urlComponent: "", // Is always in a string.
        path: {
            "48" : "../../img/icons/icon_inactive48.png",
            "64" : "../../img/icons/icon_inactive64.png",
            "128" : "../../img/icons/icon_inactive128.png"
        }
    }
];

chrome.tabs.onActivated.addListener((tabInfo) => {
    chrome.tabs.get(tabInfo.tabId, (tab) => {
        for (let i = 0; i < urlWithIcon.length; i++) {
            let urlAndPath = urlWithIcon[i];
            if (tab.url.indexOf(urlAndPath.urlComponent) !== -1) {
                chrome.browserAction.setIcon({ path: urlAndPath.path });
                break;
            }
        }
    });
});