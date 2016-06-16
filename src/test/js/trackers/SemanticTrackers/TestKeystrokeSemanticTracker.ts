///<reference path="../../../../../typings/index.d.ts" />

import {SemanticTrackerTest} from "./TestSemanticTracker";
import {KeystrokeSemanticTracker} from "../../../../main/js/trackers/SemanticTrackers/KeystrokeSemanticTracker";

SemanticTrackerTest(KeystrokeSemanticTracker);

describe("The keystroke semantic tracker", function () {

    let tracker: KeystrokeSemanticTracker;
    let collector: TrackingCollector;

    beforeEach(function () {
        tracker = new KeystrokeSemanticTracker();
        collector = jasmine.createSpyObj("collector", ["sendMessage"]);
        tracker.withCollector(collector);
        jasmine.clock().install();
        jasmine.clock().mockDate();
    });

    afterEach(function () {
        jasmine.clock().uninstall();
    });

    it("should register the element correctly.", function () {
        let element = jasmine.createSpyObj("elem", ["addEventListener"]);
        element.addEventListener.and.callFake((_: string, callback: any) => {
            callback();
        });
        tracker.registerElement(element, "Add reaction");

        expect(collector.sendMessage).toHaveBeenCalledWith(jasmine.objectContaining({
            data: jasmine.objectContaining({
                event_type: 101,
                element_type: 110
            })
        }));
    });
});