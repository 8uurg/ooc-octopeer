///<reference path="../../../../typings/index.d.ts" />
import {SemanticTracker} from "../../../main/js/trackers/semanticTrackerMerged";

/**
 * A test suite for the semantic keystroke tracker.
 */
describe("The key stroke semantic tracker", function() {

    let collector: TrackingCollector;
    let semanticTracker: SemanticTracker;
    let htmlElement: any; // Using the real type, HTMLElement, causes issues when spying on it.
    let fireEvent: any;

    beforeEach(function () {
        jasmine.clock().install();
        jasmine.clock().mockDate();
        collector = jasmine.createSpyObj("collector", ["sendMessage"]);
        semanticTracker = new SemanticTracker().withCollector(collector);
        htmlElement = jasmine.createSpyObj("elem", ["addEventListener"]);
        fireEvent = {};
        htmlElement.addEventListener.and.callFake((eventString: string, fireEventFunction: any) => {
            fireEvent[eventString] = fireEventFunction;
        });
    });

    afterEach(function () {
        jasmine.clock().uninstall();
    });

    it("should register the keystroke for a certain element and key.", function () {
        semanticTracker.registerKeystroke("Inline Comment", htmlElement);

        let now = Date.now() / 1000;
        fireEvent["keyup"]({keyCode: 42});

        expect(collector.sendMessage).toHaveBeenCalledWith(jasmine.objectContaining({
            data: {
                created_at: now,
                event_type: 101,
                element_type: 105
            }
        }));
    });

});

let MockBrowser = require("mock-browser").mocks.MockBrowser;
let browser: any = new MockBrowser();

describe("SemanticTracker", function() {


    beforeEach(function() {
        let _this = this;

        this.fakeElement = browser.getDocument().createElement("body");
        this.tracker = new SemanticTracker();
        this.collector = jasmine.createSpyObj("TrackingCollector", ["sendMessage"]);
        this.tracker.withCollector(this.collector);

        spyOn(this.tracker, "sendData").and.callThrough();
        spyOn(document, "querySelectorAll").and.callFake(function(a: string) {
            return new Array(_this.fakeElement);
        });
    });

    it("should register a click for semantic elements who's clicks should be tracked", function() {
        spyOn(this.tracker, "registerClick");
        this.tracker.register();

        expect(this.tracker.registerClick).toHaveBeenCalledTimes(9);
    });

    it("should send the data when a click on a tracked element occurs.", function() {
        this.tracker.register();
        this.fakeElement.click();

        expect(this.collector.sendMessage).toHaveBeenCalledTimes(9);
    });
});