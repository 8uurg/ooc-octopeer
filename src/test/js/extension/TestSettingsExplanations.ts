///<reference path="../../../../typings/index.d.ts" />

import {SettingsExplanations} from "../../../main/js/extension/SettingsExplanations";
let MockBrowser = require("mock-browser").mocks.MockBrowser;

function buildDummy(dummyArray: {id: string; title: string}[]) {
    let dummyObject = document.createElement("div");
    dummyArray.forEach(function(dummyItem) {
        dummyObject.innerHTML +=
            "<div id='" + dummyItem + "'><div class='explain-tracking-button'>?</div></div>";
    });
    return dummyObject;
}

describe("Setting explanation cards", function() {
    document = new MockBrowser().getDocument();

    let fixture: HTMLElement = document.createElement("div");
    let element = document.createElement("div");
    element.innerHTML += "<div class='chip explain-tracking-button'>?</div>";
    let dummy = document.createElement("div");

    beforeEach(function() {
        document = new MockBrowser().getDocument();

        fixture = document.createElement("div");
        element = document.createElement("div");
        element.innerHTML += "<div class='chip explain-tracking-button'>?</div>";
        dummy = document.createElement("div");

        this.tracker = new SettingsExplanations();
        document.body.insertBefore(fixture, document.body.firstChild);
        fixture.innerHTML = "<div id='refresh-bitbucket-pages'></div><div id='hide-explanation-button'></div>";
        fixture.innerHTML += "<div id='tracking-explanation'><div class='card-content white-text'>";
        fixture.innerHTML += "<span id='card-title'></span><div id='card-content-text'></div>";
        fixture.innerHTML += "<div id='card-sample-data'></div></div></div>";
        this.evt = document.createEvent("MutationEvents");
        this.evt.initMutationEvent("DOMContentLoaded", true, true, document, "", "", "", 0);
        this.event = document.createEvent("HTMLEvents");
        this.event.initEvent("click", false, true);
        this.document = new MockBrowser().getDocument();
    });

    it("a card should be empty before a question mark has been clicked", function() {
        this.tracker.configureExplanations();
        expect(document.getElementById("card-title").innerHTML).toEqual("");
    });

    let testArray = [
        {id: "mouse-position-setting-question",     title: "Mouse Position Tracking"},
        {id: "mouse-click-setting-question",        title: "Mouse Click Tracking"},
        {id: "page-resolution-setting-question",    title: "Page Resolution Tracking"},
        {id: "keystroke-setting-question",          title: "Keystroke Tracking"}
    ];

    testArray.forEach( function(item) {
        it("a card should be filled when a question mark is clicked -- " +  item.title, function() {
            element.id = item.id;
            testArray.forEach(function(dummyItem) {
                if (item.id !== dummyItem.id) {
                    dummy.innerHTML +=
                        "<div id='" + dummyItem.id + "'><div class='explain-tracking-button'>?</div></div>";
                }
            });
            document.body.insertBefore(dummy, document.body.firstChild);
            document.body.insertBefore(element, document.body.firstChild);
            this.tracker.configureExplanations();
            document.dispatchEvent(this.evt);
            element.dispatchEvent(this.event);
            expect(document.getElementById("card-title").innerHTML).toEqual(item.title);
        });
    });

    it("an explanation should be visible after clicking a question mark", function() {
        dummy.innerHTML += buildDummy(testArray);
        document.body.insertBefore(dummy, document.body.firstChild);
        this.tracker.configureExplanations();
        document.dispatchEvent(this.evt);
        element.dispatchEvent(this.event);
        expect(document.defaultView.getComputedStyle(document.getElementById("tracking-explanation"), null)
            .getPropertyValue("display")).toEqual("block");
    });

    it("an explanation should be hidden after clicking close", function() {
        dummy.innerHTML += buildDummy(testArray);
        document.body.insertBefore(dummy, document.body.firstChild);
        this.tracker.configureExplanations();
        document.dispatchEvent(this.evt);
        document.getElementById("hide-explanation-button").click();
        expect(document.defaultView.getComputedStyle(document.getElementById("tracking-explanation"), null)
            .getPropertyValue("display")).toEqual("none");
    });

    afterEach(function() {
        document.body.innerHTML = "";
        fixture.innerHTML = "";
        dummy.innerHTML = "";
    });
});
