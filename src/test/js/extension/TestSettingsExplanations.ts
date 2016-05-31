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
    });

    it("a card should be empty before a question mark has been clicked", function() {
        document.body.insertBefore(fixture, document.body.firstChild);
        this.tracker.configureExplanations();
        expect(document.getElementById("card-title").innerHTML).toEqual("");
    });

    it("a card should be filled when a question mark is clicked -- mouse position", function() {
        let element = document.createElement("div");
        element.id = "mouse-position-setting";
        element.innerHTML += "<div class='chip explain-tracking-button'>?</div>";

        let dummy = document.createElement("div");
        dummy.innerHTML = "<div id='mouse-click-setting'><div class='chip explain-tracking-button'>?</div></div>";
        dummy.innerHTML += "<div id='page-resolution-setting'><div class='chip explain-tracking-button'>?</div></div>";
        dummy.innerHTML += "<div id='keystroke-setting'><div class='chip explain-tracking-button'>?</div></div>";
        document.body.insertBefore(fixture, document.body.firstChild);
        document.body.insertBefore(element, document.body.firstChild);
        document.body.insertBefore(dummy, document.body.firstChild);
        console.log("build document");
        console.log(document.body.innerHTML);

        this.tracker.configureExplanations();

        let evt = document.createEvent("MutationEvents");
        evt.initMutationEvent("DOMContentLoaded", true, true, document, "", "", "", 0);
        document.dispatchEvent(evt);

        let event = document.createEvent("HTMLEvents");
        event.initEvent("click", false, true);
        element.dispatchEvent(event);
        
        expect(document.getElementById("card-title").innerHTML).toEqual("Mouse Position Tracking");
    });
});
