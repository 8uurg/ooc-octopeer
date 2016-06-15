import {updateBrowserActionIcon, addTabListenersForIcon,
    createBackgroundProcesses} from "../../../main/js/extension/background";

describe("The background script", function () {

    beforeEach(function () {
        this.req = jasmine.createSpyObj("requestSender", ["setApiLocation"]);
        let _thisTestSuite = this;
        (<any> global).RARequestsSender = function (loc: string) {
            this.setApiLocation = function () {};
            return _thisTestSuite.req;
        };
        
        spyOn(chrome.storage.onChanged, "addListener").and.callFake((callback: any) => {
            this.changeAPILocationCallback = callback;
        });
        
        spyOn(chrome.storage.sync, "get").and.callFake((_: any, callback: any) => {
            this.initialiseDBConnectionCallback = callback;
        });
    });

    it("should open the settings page when the browser action button is clicked", function () {
        spyOn(chrome.tabs, "create");
        spyOn(chrome.browserAction.onClicked, "addListener").and.callFake((callback: any) => {
            callback();
        });
        createBackgroundProcesses();
        expect(chrome.tabs.create).toHaveBeenCalled();
    });

    it("should set the api location properly", function () {        
        createBackgroundProcesses();
        this.initialiseDBConnectionCallback({ databaseLocation: "http://fake-server.com/api/" });
        let newDatabaseLoc = "http://test-server.com/api/";
        this.changeAPILocationCallback({ databaseLocation: {
            newValue: newDatabaseLoc
        }});
        expect(this.req.setApiLocation).toHaveBeenCalledWith(newDatabaseLoc);
    });

    it("should not set the api location if no change was made to the api", function () {
        createBackgroundProcesses();
        this.initialiseDBConnectionCallback({ username_key: "joostje" });
        let newUsername = "joost";
        this.changeAPILocationCallback({ username_key: {
            newValue: newUsername
        }});
        expect(this.req.setApiLocation).not.toHaveBeenCalled();
    });
});

describe("The Octopeer browser action icon", function () {
    
    beforeEach(function () {
        this.tab = jasmine.createSpy("tab");
        spyOn(chrome.browserAction, "setIcon");

        spyOn(chrome.tabs.onUpdated, "addListener").and.callFake((callback: any) => {
            callback(42, {}, this.tab);
        });
    });

    it("should be updated correctly", function () {
        this.tab.url = "http://bitbucket.org/joe/pull-requests/1/";
        updateBrowserActionIcon(this.tab);
        expect(chrome.browserAction.setIcon).toHaveBeenCalledWith({ path: {
            "48"  : "../../img/icons/icon_active48.png",
            "64"  : "../../img/icons/icon_active64.png",
            "128" : "../../img/icons/icon_active128.png"
        }});
    });

    it("should be updated to active when a bitbucket tab is updated", function () {
        this.tab.active = true;
        this.tab.url = "http://bitbucket.org/joe/pull-requests/1/";

        addTabListenersForIcon();
        expect(chrome.browserAction.setIcon).toHaveBeenCalledWith({ path: {
            "48"  : "../../img/icons/icon_active48.png",
            "64"  : "../../img/icons/icon_active64.png",
            "128" : "../../img/icons/icon_active128.png"
        }});
    });

    it("should be updated to inactive when the active tab is not a bitbucket page", function () {
        this.tab.active = true;
        this.tab.url = "http://google.com/";

        addTabListenersForIcon();
        expect(chrome.browserAction.setIcon).toHaveBeenCalledWith({ path: {
            "48"  : "../../img/icons/icon48.png",
            "64"  : "../../img/icons/icon64.png",
            "128" : "../../img/icons/icon128.png"
        }});
    });

    it("should not be updated to inactive if the tab is not active", function () {
        this.tab.active = false;
        this.tab.url = "http://bitbucket.com/";

        addTabListenersForIcon();
        expect(chrome.browserAction.setIcon).not.toHaveBeenCalled();
    });

    it("should update the icon to active when a bitbucket tab is opened", function () {
        this.active = true;
        this.tab.url = "http://bitbucket.org/joe/pull-requests/1/";

        spyOn(chrome.tabs, "get").and.callFake((tabId: number, callback: any) => {
            callback(this.tab);
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
