///<reference path="../../../../../typings/index.d.ts" />

import {SemanticTrackerTest} from "./TestSemanticTracker";
import {ClickSemanticTracker} from "../../../../main/js/trackers/SemanticTrackers/ClickSemanticTracker";

SemanticTrackerTest(ClickSemanticTracker);

describe("The Semantic Click Tracker", function () {

    let tracker: ClickSemanticTracker;
    let collector: TrackingCollector;

    beforeEach(function () {
        tracker = new ClickSemanticTracker();
        collector = jasmine.createSpyObj("collector", ["sendMessage"]);
        tracker.withCollector(collector);

        jasmine.clock().install();
        jasmine.clock().mockDate();
    });

    afterEach(function () {
        jasmine.clock().uninstall();
    });

    it("should register the element correctly.", function () {
        let element = jasmine.createSpyObj("element", ["addEventListener"]);
        element.addEventListener.and.callFake((_: string, callback: any) => {
            callback();
        });

        tracker.registerElement(element, "Comment textfield");
        expect(collector.sendMessage).toHaveBeenCalledTimes(1);
    });
});