///<reference path="../../../../typings/index.d.ts" />

let MockBrowser = require("mock-browser").mocks.MockBrowser;
let browser: any = new MockBrowser();
let oldDocument = document;
document = browser.getDocument();
import {SettingsExplanations} from "../../../main/js/extension/SettingsExplanations";

/**
 * Takes an array with elements and creates dummy elemements with the ID's.
 * @param dummyArray An array with items that need dummy HTML elements
 * @returns {HTMLDivElement|HTMLElement} An HTML element with the dummy ID's.
 */
function buildDummy(dummyArray: {id: string; title: string}[]) {
    let dummyObject = document.createElement("div");
    dummyArray.forEach(function(dummyItem) {
        dummyObject.innerHTML +=
            "<div id='" + dummyItem + "'><div class='explain-tracking-button'>?</div></div>";
    });
    return dummyObject;
}

describe("Setting explanation cards", function() {

    beforeEach(function() {
        browser = new MockBrowser();
        browser.getDocument().createElement("body");

        oldDocument = document;
        document = browser.getDocument();

        this.fixture = document.createElement("div");
        this.element = document.createElement("div");
        this.dummy = document.createElement("div");
        this.element.innerHTML = "<div class='chip explain-tracking-button'>?</div>";
        this.dummy.innerHTML = "";
        this.tracker = new SettingsExplanations();
        document.body.insertBefore(this.fixture, document.body.firstChild);
        this.fixture.innerHTML = "<div id='refresh-bitbucket-pages'></div><div id='hide-explanation-button'></div>";
        this.fixture.innerHTML += "<div id='tracking-explanation'><div class='card-content white-text'>";
        this.fixture.innerHTML += "<span id='card-title'></span><div id='card-content-text'></div>";
        this.fixture.innerHTML += "<div id='card-sample-data'></div></div></div>";
        this.evt = document.createEvent("MutationEvents");
        this.evt.initMutationEvent("DOMContentLoaded", true, true, document, "", "", "", 0);
        this.event = document.createEvent("HTMLEvents");
        this.event.initEvent("click", false, true);
    });

    afterEach(function() {
        document.body.innerHTML = "";
        this.fixture.innerHTML = "";
        this.dummy.innerHTML = "";
        document = oldDocument;
    });

    it("a card should be empty before a question mark has been clicked", function() {
        this.tracker.configureExplanations();
        expect(document.getElementById("card-title").innerHTML).toEqual("");
    });

    let testArray = [
        {id: "mouse-position-setting-question",         title: "Mouse Position Tracking"},
        {id: "mouse-click-setting-question",            title: "Mouse Click Tracking"},
        {id: "page-resolution-setting-question",        title: "Page Resolution Tracking"},
        {id: "keystroke-setting-question",              title: "Keystroke Tracking"},
        {id: "scroll-setting-question",                 title: "Scroll Tracking"},
        {id: "dom-setting-question",                    title: "DOM Element Tracking"},
        {id: "semantic-position-setting-question",      title: "Semantic Position Tracking"},
        {id: "semantic-clicks-setting-question",        title: "Semantic Clicks Tracking"},
        {id: "semantic-keystrokes-setting-question",    title: "Semantic Keystrokes Tracking"},
        {id: "semantic-scrolling-setting-question",     title: "Semantic Scrolling Tracking"},
        {id: "semantic-visibility-setting-question",    title: "Semantic PR Page Visibility Tracking"}
    ];

    testArray.forEach( function(item) {
        it("a card should be filled when a question mark is clicked -- " +  item.title, function() {
            this.element.id = item.id;
            let localDummy = this.dummy;
            testArray.forEach(function(dummyItem) {
                if (item.id !== dummyItem.id) {
                    localDummy.innerHTML +=
                        "<div id='" + dummyItem.id + "'><div class='explain-tracking-button'>?</div></div>";
                }
            });
            document.body.insertBefore(localDummy, document.body.firstChild);
            document.body.insertBefore(this.element, document.body.firstChild);
            this.tracker.configureExplanations();
            document.dispatchEvent(this.evt);
            this.element.dispatchEvent(this.event);
            expect(document.getElementById("card-title").innerHTML).toEqual(item.title);
        });
    });

    it("an explanation should be visible after clicking a question mark", function() {
        this.dummy.innerHTML += buildDummy(testArray);
        document.body.insertBefore(this.dummy, document.body.firstChild);
        this.tracker.configureExplanations();
        document.dispatchEvent(this.evt);
        this.element.dispatchEvent(this.event);
        expect(document.defaultView
            .getComputedStyle(document.getElementById("tracking-explanation"), null)
            .getPropertyValue("display")).toEqual("block");
    });

    it("an explanation should be hidden after clicking close", function() {
        this.dummy.innerHTML += buildDummy(testArray);
        document.body.insertBefore(this.dummy, document.body.firstChild);
        this.tracker.configureExplanations();
        document.dispatchEvent(this.evt);
        document.getElementById("hide-explanation-button").click();
        expect(document.defaultView.getComputedStyle(document
            .getElementById("tracking-explanation"), null)
            .getPropertyValue("display")).toEqual("none");
    });
});

describe("Time Formatter", function() {
    beforeEach(function() {
        this.tracker = new SettingsExplanations();
    });

    it("should prepend a 0 to a value below 10", function() {
        expect(this.tracker.timeFormatter(9)).toEqual("09");
    });

    it("should not touch a value above 9", function() {
        expect(this.tracker.timeFormatter(10)).toEqual("10");
    });
});
