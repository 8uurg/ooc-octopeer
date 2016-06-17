///<reference path="../../../../../typings/index.d.ts" />
declare var scrollMonitor: any;

import {ScrollSemanticTracker} from "../../../../main/js/trackers/SemanticTrackers/ScrollSemanticTracker";

describe("The mouse semantic tracker", function () {

    beforeEach(function () {
        this.tracker = new ScrollSemanticTracker();
        this.collector = jasmine.createSpyObj("collector", ["sendMessage"]);
        this.tracker.withCollector(this.collector);
        jasmine.clock().install();
        jasmine.clock().mockDate();

        this.monitor = jasmine.createSpyObj("scrollMonitor", ["enterViewport", "exitViewport"]);
        this.fireEvent = {};
        this.monitor.enterViewport.and.callFake((f: Function) => this.fireEvent["enterViewport"] = f);
        this.monitor.exitViewport.and.callFake((f: Function) => this.fireEvent["exitViewport"] = f);
        spyOn(scrollMonitor, "create").and.returnValue(this.monitor);

        let element = jasmine.createSpyObj("elem", ["addEventListener"]);
        this.tracker.registerElement(element, "Comment textfield");
    });

    afterEach(function () {
        jasmine.clock().uninstall();
    });

    it("should return ScrollSemanticTracker as name", function() {
        expect(this.tracker.getName()).toEqual("ScrollSemanticTracker");
    });

    it("should ignore mappings without scroll", function() {
        expect(this.tracker.filterMappings({
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
        expect(this.tracker.filterMappings({
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

    it("should correctly register a viewport enter", function () {
        this.fireEvent["enterViewport"]();
        expect(this.collector.sendMessage).toHaveBeenCalledTimes(1);
        expect(this.collector.sendMessage).toHaveBeenCalledWith(jasmine.objectContaining({
            data: jasmine.objectContaining({
                event_type: 301
            })
        }));
    });

    it("should correctly register a viewport leave", function () {
        this.fireEvent["exitViewport"]();
        expect(this.collector.sendMessage).toHaveBeenCalledTimes(1);
        expect(this.collector.sendMessage).toHaveBeenCalledWith(jasmine.objectContaining({
            data: jasmine.objectContaining({
                event_type: 302
            })
        }));
    });
});