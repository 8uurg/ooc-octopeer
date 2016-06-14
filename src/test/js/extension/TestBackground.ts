import {updateBrowserActionIcon, addTabListenersForIcon,
    createBackgroundProcesses} from "../../../main/js/extension/background";

describe("The background script", function () {

    it("should open the settings page when the browser action button is clicked", function () {
        spyOn(chrome.tabs, "create");
        spyOn(chrome.browserAction.onClicked, "addListener").and.callFake((callback: any) => {
            callback();
        });
        createBackgroundProcesses();
        expect(chrome.tabs.create).toHaveBeenCalled();
    });

    it("should set the api location properly", function () {
        // Spy on the RARequestSender
        let req = jasmine.createSpyObj("requestSender", ["setApiLocation"]);
        (<any> global).RARequestsSender = function (loc: string) {
            this.setApiLocation = function () {};
            return req;
        };

        let getCallback: (items: any) => void;
        spyOn(chrome.storage.sync, "get").and.callFake((_: any, callback: any) => {
            getCallback = callback;
        });

        let changeListener: (changedItems: any) => void;
        spyOn(chrome.storage.onChanged, "addListener").and.callFake((callback: any) => {
            changeListener = callback;
        });
        createBackgroundProcesses();
        getCallback({ databaseLocation: "http://fake-server.com/api/" });
        changeListener({ databaseLocation: {
            newValue: "http://test-server.com/api/"
        }});
        expect(req.setApiLocation).toHaveBeenCalled();
    });
});

describe("The Octopeer browser action icon", function () {

    let tab: chrome.tabs.Tab;
    beforeEach(function () {
        tab = jasmine.createSpyObj("tab", ["active", "url"]);
        spyOn(chrome.browserAction, "setIcon");
    });

    it("should be updated correctly", function () {
        let tab = jasmine.createSpyObj("tab", ["url"]);
        tab.url = "http://bitbucket.org/joe/pull-requests/1/";
        updateBrowserActionIcon(tab);
        expect(chrome.browserAction.setIcon).toHaveBeenCalledWith({ path: {
            "48"  : "../../img/icons/icon_active48.png",
            "64"  : "../../img/icons/icon_active64.png",
            "128" : "../../img/icons/icon_active128.png"
        }});
    });

    it("should be updated to active when a bitbucket tab is updated", function () {
        tab.active = true;
        tab.url = "http://bitbucket.org/joe/pull-requests/1/";
        spyOn(chrome.tabs.onUpdated, "addListener").and.callFake((callback: any) => {
            callback(42, {}, tab);
        });
        addTabListenersForIcon();
        expect(chrome.browserAction.setIcon).toHaveBeenCalledWith({ path: {
            "48"  : "../../img/icons/icon_active48.png",
            "64"  : "../../img/icons/icon_active64.png",
            "128" : "../../img/icons/icon_active128.png"
        }});
    });

    it("should be updated to inactive when the active tab is not a bitbucket page", function () {
        tab.active = true;
        tab.url = "http://google.com/";

        spyOn(chrome.tabs.onUpdated, "addListener").and.callFake((callback: any) => {
            callback(42, {}, tab);
        });
        addTabListenersForIcon();
        expect(chrome.browserAction.setIcon).toHaveBeenCalledWith({ path: {
            "48"  : "../../img/icons/icon48.png",
            "64"  : "../../img/icons/icon64.png",
            "128" : "../../img/icons/icon128.png"
        }});
    });

    it("should update the icon to active when a bitbucket tab is opened", function () {
        tab.active = true;
        tab.url = "http://bitbucket.org/joe/pull-requests/1/";

        spyOn(chrome.tabs, "get").and.callFake((tabId: number, callback: any) => {
            callback(tab);
        });

        spyOn(chrome.tabs.onActivated, "addListener").and.callFake((callback: any) => {
            callback({});
        });
        addTabListenersForIcon();
        expect(chrome.browserAction.setIcon).toHaveBeenCalledWith({ path: {
            "48"  : "../../img/icons/icon_active48.png",
            "64"  : "../../img/icons/icon_active64.png",
            "128" : "../../img/icons/icon_active128.png"
        }});
    });
});
