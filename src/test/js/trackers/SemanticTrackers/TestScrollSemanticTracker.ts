///<reference path="../../../../../typings/index.d.ts" />
declare var scrollMonitor: any;

import {ScrollSemanticTracker} from "../../../../main/js/trackers/SemanticTrackers/ScrollSemanticTracker";
import {SemanticTrackerTest} from "./TestSemanticTracker";

describe("The mouse semantic tracker", function () {

    let tracker: ScrollSemanticTracker;
    let collector: TrackingCollector;
    let monitor: any;
    let fireEvent: any;

    beforeEach(function () {
        tracker = new ScrollSemanticTracker();
        collector = jasmine.createSpyObj("collector", ["sendMessage"]);
        tracker.withCollector(collector);
        jasmine.clock().install();
        jasmine.clock().mockDate();

        monitor = jasmine.createSpyObj("scrollMonitor", ["enterViewport", "exitViewport"]);
        fireEvent = {};
        monitor.enterViewport.and.callFake((f: Function) => fireEvent["enterViewport"] = f);
        monitor.exitViewport.and.callFake((f: Function) => fireEvent["exitViewport"] = f);
        spyOn(scrollMonitor, "create").and.returnValue(monitor);

        let element = jasmine.createSpyObj("elem", ["addEventListener"]);
        tracker.registerElement(element, "Comment textfield");
    });

    afterEach(function () {
        jasmine.clock().uninstall();
    });

    it("should return ScrollSemanticTracker as name", function() {
        expect(tracker.getName()).toEqual("ScrollSemanticTracker");
    });

    it("should ignore mappings without scroll", function() {
        expect(tracker.filterMappings({
            name: "Everything",
            selector: "*",
            track: {
                scroll: false,
                click: true,
                hover: true,
                keystroke: true
            }
        })).toBeFalsy();
    });

    it("should accept mappings with scroll", function() {
        expect(tracker.filterMappings({
            name: "Everything",
            selector: "*",
            track: {
                scroll: true,
                click: false,
                hover: false,
                keystroke: false
            }
        })).toBeTruthy();
    });

    it("should correctly register a mouse enter", function () {
        fireEvent["enterViewport"]();
        expect(collector.sendMessage).toHaveBeenCalledTimes(1);
        expect(collector.sendMessage).toHaveBeenCalledWith(jasmine.objectContaining({
            data: jasmine.objectContaining({
                event_type: 301
            })
        }));
    });

    it("should correctly register a mouse leave", function () {
        fireEvent["exitViewport"]();
        expect(collector.sendMessage).toHaveBeenCalledTimes(1);
        expect(collector.sendMessage).toHaveBeenCalledWith(jasmine.objectContaining({
            data: jasmine.objectContaining({
                event_type: 302
            })
        }));
    });
});