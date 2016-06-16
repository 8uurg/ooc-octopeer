declare var RARequestsSender: any;

/**
 * Attaches listeners for the browser action and api location changes.
 */
export function createBackgroundProcesses() {
    chrome.browserAction.onClicked.addListener(() => {
        chrome.tabs.create({ url: "../../html/settings.html" });
    });

    chrome.storage.sync.get(
        { [OCTOPEER_CONSTANTS.database_location_key]: OCTOPEER_CONSTANTS.standard_database_location }, (items) => {
            let requestSender = new RARequestsSender(items[OCTOPEER_CONSTANTS.database_location_key]);

            chrome.storage.onChanged.addListener((changedItems: any) => {
                if (changedItems.hasOwnProperty(OCTOPEER_CONSTANTS.database_location_key)) {
                    requestSender.setApiLocation(changedItems[OCTOPEER_CONSTANTS.database_location_key].newValue);
                }
            });
        });

}

let urlWithIcon = [
    {
        urlMatcher: new RegExp("(http|https):\/\/bitbucket\.org\/.*\/pull-requests\/[0-9]+\/.*"),
        path: {
            "48"  : "../../img/icons/icon_active48.png",
            "64"  : "../../img/icons/icon_active64.png",
            "128" : "../../img/icons/icon_active128.png"
        }
    },
    {
        urlMatcher: new RegExp(".*"),
        path: {
            "48"  : "../../img/icons/icon48.png",
            "64"  : "../../img/icons/icon64.png",
            "128" : "../../img/icons/icon128.png"
        }
    }
];

/**
 * Updates the icon depending on the tab.
 * @param tab The current active tab.
 */
export function updateBrowserActionIcon(tab: chrome.tabs.Tab) {
    for (let i = 0; i < urlWithIcon.length; i++) {
        let urlAndPath = urlWithIcon[i];
        if (tab.url.match(urlAndPath.urlMatcher) !== null) {
            chrome.browserAction.setIcon({ path: urlAndPath.path });
            break;
        }
    }
}

/**
 * Attaches the listeners for the icon status.
 */
export function addTabListenersForIcon() {
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        if (tab.active) {
            updateBrowserActionIcon(tab);
        }
    });

    chrome.tabs.onActivated.addListener((tabInfo) => {
        chrome.tabs.get(tabInfo.tabId, (tab) => {
            updateBrowserActionIcon(tab);
        });
    });
}

createBackgroundProcesses();
addTabListenersForIcon();

