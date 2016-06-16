///<reference path="../../../../../typings/index.d.ts" />

import {MouseSemanticTracker} from "../../../../main/js/trackers/SemanticTrackers/MouseSemanticTracker";
import {SemanticTrackerTest} from "./TestSemanticTracker";

SemanticTrackerTest(MouseSemanticTracker);

describe("The mouse semantic tracker", function () {

    let tracker: MouseSemanticTracker;
    let collector: TrackingCollector;
    let fireEvent: any;

    beforeEach(function () {
        tracker = new MouseSemanticTracker();
        collector = jasmine.createSpyObj("collector", ["sendMessage"]);
        tracker.withCollector(collector);
        jasmine.clock().install();
        jasmine.clock().mockDate();

        fireEvent = {};

        let element = jasmine.createSpyObj("elem", ["addEventListener"]);
        element.addEventListener.and.callFake((event: string, callback: any) => {
            fireEvent[event] = callback;
        });

        tracker.registerElement(element, "Comment textfield");
    });

    afterEach(function () {
        jasmine.clock().uninstall();
    });

    it("should correctly register a mouse enter", function () {
        fireEvent["mouseenter"]();
        expect(collector.sendMessage).toHaveBeenCalledTimes(1);
        expect(collector.sendMessage).toHaveBeenCalledWith(jasmine.objectContaining({
            data: jasmine.objectContaining({
                event_type: 202
            })
        }));
    });

    it("should correctly register a mouse leave", function () {
        fireEvent["mouseleave"]();
        expect(collector.sendMessage).toHaveBeenCalledTimes(1);
        expect(collector.sendMessage).toHaveBeenCalledWith(jasmine.objectContaining({
            data: jasmine.objectContaining({
                event_type: 203
            })
        }));
    });
});