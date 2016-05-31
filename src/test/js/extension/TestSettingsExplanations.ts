///<reference path="../../../../typings/index.d.ts" />

import {SettingsExplanations} from "../../../main/js/extension/SettingsExplanations";

describe("Setting explanation cards", function() {
    let fixture: HTMLElement = document.createElement("div");

    beforeEach(function() {
        this.tracker = new SettingsExplanations();
        fixture.innerHTML = "<div id='refresh-bitbucket-pages'></div>";
        fixture.innerHTML += "<div id='hide-explanation-button'></div>";
        fixture.innerHTML += "<div id='tracking-explanation'>";
        fixture.innerHTML += "<div class='card-content white-text'><span id='card-title'></span>";
        fixture.innerHTML += "<div id='card-content-text'></div><div id='card-sample-data'></div></div></div>";
        document.body.insertBefore(fixture, document.body.firstChild);

        this.element = document.createElement("div");
        this.dummy = document.createElement("div");
        this.element.innerHTML += "<div class='chip explain-tracking-button'>?</div>";

        this.evt = document.createEvent("MutationEvents");
        this.event = document.createEvent("HTMLEvents");
    });

    it("a card should be empty before a question mark has been clicked", function() {
        this.tracker.configureExplanations();
        expect(document.getElementById("card-title").innerHTML).toEqual("");
    });

    it("a card should be filled when a question mark is clicked -- mouse position", function() {
        this.element.id = "mouse-position-setting";
        this.dummy.innerHTML = "<div id='mouse-click-setting'><div class='explain-tracking-button'>?</div></div>";
        this.dummy.innerHTML += "<div id='page-resolution-setting'><div class='explain-tracking-button'>?</div></div>";
        this.dummy.innerHTML += "<div id='keystroke-setting'><div class='explain-tracking-button'>?</div></div>";
        document.body.insertBefore(this.element, document.body.firstChild);
        document.body.insertBefore(this.dummy, document.body.firstChild);

        this.tracker.configureExplanations();
        this.evt.initMutationEvent("DOMContentLoaded", true, true, document, "", "", "", 0);
        document.dispatchEvent(this.evt);
        this.event.initEvent("click", false, true);
        this.element.dispatchEvent(this.event);

        expect(document.getElementById("card-title").innerHTML).toEqual("Mouse Position Tracking");
    });

    it("a card should be filled when a question mark is clicked -- mouse clicks", function() {
        this.element.id = "mouse-click-setting";
        this.dummy.innerHTML = "<div id='mouse-position-setting'><div class='explain-tracking-button'>?</div></div>";
        this.dummy.innerHTML += "<div id='page-resolution-setting'><div class='explain-tracking-button'>?</div></div>";
        this.dummy.innerHTML += "<div id='keystroke-setting'><div class='explain-tracking-button'>?</div></div>";

        document.body.insertBefore(this.element, document.body.firstChild);
        document.body.insertBefore(this.dummy, document.body.firstChild);

        this.tracker.configureExplanations();
        this.evt.initMutationEvent("DOMContentLoaded", true, true, document, "", "", "", 0);
        document.dispatchEvent(this.evt);
        this.event.initEvent("click", false, true);
        this.element.dispatchEvent(this.event);

        expect(document.getElementById("card-title").innerHTML).toEqual("Mouse Click Tracking");
    });

    it("a card should be filled when a question mark is clicked -- window resize", function() {
        this.element.id = "page-resolution-setting";
        this.dummy.innerHTML = "<div id='mouse-click-setting'><div class='explain-tracking-button'>?</div></div>";
        this.dummy.innerHTML += "<div id='mouse-position-setting'><div class='explain-tracking-button'>?</div></div>";
        this.dummy.innerHTML += "<div id='keystroke-setting'><div class='explain-tracking-button'>?</div></div>";

        document.body.insertBefore(this.element, document.body.firstChild);
        document.body.insertBefore(this.dummy, document.body.firstChild);

        this.tracker.configureExplanations();
        this.evt.initMutationEvent("DOMContentLoaded", true, true, document, "", "", "", 0);
        document.dispatchEvent(this.evt);
        this.event.initEvent("click", false, true);
        this.element.dispatchEvent(this.event);

        expect(document.getElementById("card-title").innerHTML).toEqual("Page Resolution Tracking");
    });

    it("a card should be filled when a question mark is clicked -- keystrokes", function() {
        this.element.id = "keystroke-setting";
        this.dummy.innerHTML = "<div id='mouse-click-setting'><div class='explain-tracking-button'>?</div></div>";
        this.dummy.innerHTML += "<div id='page-resolution-setting'><div class='explain-tracking-button'>?</div></div>";
        this.dummy.innerHTML += "<div id='mouse-position-setting'><div class='explain-tracking-button'>?</div></div>";

        document.body.insertBefore(this.element, document.body.firstChild);
        document.body.insertBefore(this.dummy, document.body.firstChild);

        this.tracker.configureExplanations();

        this.evt.initMutationEvent("DOMContentLoaded", true, true, document, "", "", "", 0);
        document.dispatchEvent(this.evt);
        this.event.initEvent("click", false, true);
        this.element.dispatchEvent(this.event);

        expect(document.getElementById("card-title").innerHTML).toEqual("Keystroke Tracking");
    });

    afterEach(function() {
        document.body.innerHTML = "";
    });
});
