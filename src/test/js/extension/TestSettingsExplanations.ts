///<reference path="../../../../typings/index.d.ts" />

import {SettingsExplanations} from "../../../main/js/extension/SettingsExplanations";
let MockBrowser = require("mock-browser").mocks.MockBrowser;

describe("Setting explanation cards", function() {
    let _document = new MockBrowser().getDocument();

    let fixture: HTMLElement = _document.createElement("div");
    let element = _document.createElement("div");
    element.innerHTML += "<div class='chip explain-tracking-button'>?</div>";
    let dummy = _document.createElement("div");

    beforeEach(function() {
        _document = new MockBrowser().getDocument();

        fixture = _document.createElement("div");
        element = _document.createElement("div");
        element.innerHTML += "<div class='chip explain-tracking-button'>?</div>";
        dummy = _document.createElement("div");

        this.tracker = new SettingsExplanations();
        _document.body.insertBefore(fixture, _document.body.firstChild);
        fixture.innerHTML = "<div id='refresh-bitbucket-pages'></div><div id='hide-explanation-button'></div>";
        fixture.innerHTML += "<div id='tracking-explanation'><div class='card-content white-text'>";
        fixture.innerHTML += "<span id='card-title'></span><div id='card-content-text'></div>";
        fixture.innerHTML += "<div id='card-sample-data'></div></div></div>";
        this.evt = _document.createEvent("MutationEvents");
        this.evt.initMutationEvent("DOMContentLoaded", true, true, _document, "", "", "", 0);
        this.event = _document.createEvent("HTMLEvents");
        this.event.initEvent("click", false, true);
        this.document = new MockBrowser().getDocument();
    });

    it("a card should be empty before a question mark has been clicked", function() {
        this.tracker.configureExplanations();
        expect(_document.getElementById("card-title").innerHTML).toEqual("");
    });

    let testArray = [
        {id: "mouse-position-setting-question", title: "Mouse Position Tracking"},
        {id: "mouse-click-setting-question", title: "Mouse Click Tracking"},
        {id: "page-resolution-setting-question",  title: "Page Resolution Tracking"},
        {id: "keystroke-setting-question", title: "Keystroke Tracking"}
    ];

    testArray.forEach( function(item) {
        xit("a card should be filled when a question mark is clicked -- " +  item.title, function() {
            element.id = item.id;
            testArray.forEach(function(dummyItem) {
                if (item.id !== dummyItem.id) {
                    dummy.innerHTML +=
                        "<div id='" + dummyItem.id + "'><div class='explain-tracking-button'>?</div></div>";
                }
            });
            _document.body.insertBefore(dummy, _document.body.firstChild);
            _document.body.insertBefore(element, _document.body.firstChild);
            this.tracker.configureExplanations();
            _document.dispatchEvent(this.evt);
            element.dispatchEvent(this.event);
            expect(_document.getElementById("card-title").innerHTML).toEqual(item.title);
        });
    });

    it("an explanation should be visible after clicking a question mark", function() {
        testArray.forEach(function(dummyItem) {
            dummy.innerHTML +=
                "<div id='" + dummyItem + "'><div class='explain-tracking-button'>?</div></div>";
        });
        _document.body.insertBefore(dummy, _document.body.firstChild);
        this.tracker.configureExplanations();
        _document.dispatchEvent(this.evt);
        element.dispatchEvent(this.event);
        expect(_document.defaultView.getComputedStyle(_document.getElementById("tracking-explanation"), null)
            .getPropertyValue("display")).toEqual("block");
    });

    xit("an explanation should be hidden after clicking close", function() {
        testArray.forEach(function(dummyItem) {
            dummy.innerHTML +=
                "<div id='" + dummyItem + "'><div class='explain-tracking-button'>?</div></div>";
        });
        _document.body.insertBefore(dummy, _document.body.firstChild);
        this.tracker.configureExplanations();
        _document.dispatchEvent(this.evt);
        _document.getElementById("hide-explanation-button").click();
        expect(_document.defaultView.getComputedStyle(_document.getElementById("tracking-explanation"), null)
            .getPropertyValue("display")).toEqual("none");
    });

    afterEach(function() {
        _document.body.innerHTML = "";
        fixture.innerHTML = "";
        dummy.innerHTML = "";
    });
});
