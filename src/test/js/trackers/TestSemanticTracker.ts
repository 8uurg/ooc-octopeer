///<reference path="../../../../typings/index.d.ts" />

let MockBrowser = require("mock-browser").mocks.MockBrowser;
let browser: any = new MockBrowser();

import createSpyObj = jasmine.createSpyObj;
import {SemanticTracker} from "../../../main/js/trackers/semanticTracker";

describe("SemanticTracker", function() {


    beforeEach(function() {
        let _this = this;

        this.fakeElement = browser.getDocument().createElement("body");
        this.tracker = new SemanticTracker();
        this.collector = createSpyObj("TrackingCollector", ["sendMessage"]);
        this.tracker.withCollector(this.collector);

        spyOn(this.tracker, "sendData").and.callThrough();
        spyOn(document, "querySelectorAll").and.callFake(function(a: string) {
            return new Array(_this.fakeElement);
        });
    });

    it("should register a click for semantic elements who's clicks should be tracked", function() {
        spyOn(this.tracker, "registerClick");
        this.tracker.register();

        expect(this.tracker.registerClick).toHaveBeenCalledTimes(12);
    });

    it("should send the data when a click on a tracked element occurs.", function() {
        this.tracker.register();
        this.fakeElement.click();

        expect(this.collector.sendMessage).toHaveBeenCalledTimes(12);
    });
});