///<reference path="../../../../../typings/index.d.ts" />

import {DomTracker} from "../../../../main/js/trackers/RawDataTrackers/DomTracker";
import {testTracker} from "./TestTracker";
import any = jasmine.any;

testTracker(DomTracker);

describe("The Dom Tracker", function() {

    beforeEach(function () {
        jasmine.clock().install();
        jasmine.clock().mockDate();

        this.mutationObserver = jasmine.createSpyObj("observer", ["disconnect", "observe"]);
        let _this = this;
        (<any> global).MutationObserver = function (callback: any) {
            this.disconnect = jasmine.createSpy("disconnect");
            this.observe = jasmine.createSpy("observe");
            _this.mutationObserved = callback;
            return _this.mutationObserver;
        };

        this.tracker = new DomTracker();
        window.document = document;

        this.collector = jasmine.createSpyObj("collector", ["sendMessage"]);
        this.tracker.withCollector(this.collector);
        this.element = document.createElement("a");
        document.body.appendChild(this.element);
    });

    it("should add data-octopeer attributes to the elements", function() {
        this.tracker.register();
        this.tracker.pageFullyLoaded = true;
        this.mutationObserved();
        jasmine.clock().tick(701);
        
        expect(this.element.getAttribute("data-octopeer-x")).toBe("0");
        expect(this.element.getAttribute("data-octopeer-y")).toBe("0");
        expect(this.element.getAttribute("data-octopeer-width")).toBe("0");
        expect(this.element.getAttribute("data-octopeer-height")).toBe("0");
    });

    it("should only send data once if one mutation is observed", function() {
        this.tracker.register();
        this.tracker.pageFullyLoaded = true;
        this.mutationObserved();
        jasmine.clock().tick(701);
        
        expect(this.collector.sendMessage).toHaveBeenCalledTimes(1);
    });

    it("should should not add a data-octopeer-z attribute on a default case", function() {
        this.element.style.zIndex = "auto";

        this.tracker.register();
        this.mutationObserved();
        jasmine.clock().tick(701);
        
        expect(this.element.getAttribute("data-octopeer-z")).toBeNull();
    });

    it("should should add a data-octopeer-z attribute when needed", function() {
        this.element.style.zIndex = 3;
        this.tracker.pageFullyLoaded = true;
        this.tracker.register();
        this.mutationObserved();
        jasmine.clock().tick(701);

        expect(this.element.getAttribute("data-octopeer-z")).toBe("3");
    });

    it("should change the configuration, when it is changed.", function () {
        this.tracker.register();
        let newConf = jasmine.objectContaining({
            attributes: false
        });
        this.tracker.changeTrackerConfiguration(newConf);
        expect(this.mutationObserver.observe).toHaveBeenCalledWith(any(Object), newConf);
    });

    afterEach(function () {
        jasmine.clock().uninstall();
    });
});