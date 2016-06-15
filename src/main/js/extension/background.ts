import Tab = chrome.tabs.Tab;

declare var RARequestsSender: any;

/**
 * Creates a page on a tab when the extension badge is clicked.
 */
chrome.browserAction.onClicked.addListener(() => {
    chrome.tabs.create({ url: "../../html/settings.html" });
});

let urlWithIcon = [
    {
        urlMatcher: new RegExp("(http|https):\/\/bitbucket\.org\/.*\/pull-requests\/[0-9]+\/.*"),
        path: {
            "48" : "../../img/icons/icon_active48.png",
            "64" : "../../img/icons/icon_active64.png",
            "128" : "../../img/icons/icon_active128.png"
        }
    },
    {
        urlMatcher: new RegExp("(chrome-extension|chrome\:\/\/extensions\/)"),
        path: {
            "48" : "../../img/icons/icon48.png",
            "64" : "../../img/icons/icon64.png",
            "128" : "../../img/icons/icon128.png"
        }
    },
    {
        urlMatcher: new RegExp(".*"), // Any url
        path: {
            "48" : "../../img/icons/icon_inactive48.png",
            "64" : "../../img/icons/icon_inactive64.png",
            "128" : "../../img/icons/icon_inactive128.png"
        }
    }
];

const updateBrowserActionIcon = (tab: Tab) => {
    for (let i = 0; i < urlWithIcon.length; i++) {
        let urlAndPath = urlWithIcon[i];
        if (tab.url.match(urlAndPath.urlMatcher) !== null) {
            chrome.browserAction.setIcon({ path: urlAndPath.path });
            break;
        }
    }
};

chrome.tabs.onUpdated.addListener((tabId, _, tab) => {
    if (tab.active) {
        updateBrowserActionIcon(tab);
    }
});

chrome.tabs.onActivated.addListener((tabInfo) => {
    chrome.tabs.get(tabInfo.tabId, (tab) => {
        updateBrowserActionIcon(tab);
    });
});

chrome.storage.sync.get({ [OCTOPEER_CONSTANTS.database_location_key]: OCTOPEER_CONSTANTS.standard_database_location },
    (items) => {
        let requestSender = new RARequestsSender(items[OCTOPEER_CONSTANTS.database_location_key]);

        chrome.storage.onChanged.addListener((changedItems: any) => {
            if (changedItems.hasOwnProperty(OCTOPEER_CONSTANTS.database_location_key)) {
                requestSender.setApiLocation(changedItems[OCTOPEER_CONSTANTS.database_location_key].newValue);
            }
        });
    });


