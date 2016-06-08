///<reference path="../../../../typings/index.d.ts" />

import {DomTracker} from "../../../main/js/trackers/DomTracker";

describe("The Visible Elements Tracker", function() {

    beforeEach(function () {
        let _this = this;

        jasmine.clock().install();
        jasmine.clock().mockDate();
        this.tracker = new DomTracker();
        window.document = document;

        this.ev = <(e: any) => void> null;
        document.addEventListener = function(eventName: string, callback: (e: any) => void) {
            _this.ev = callback;
        };

        this.collector = jasmine.createSpyObj("collector", ["sendMessage"]);
        this.tracker = new DomTracker();
        this.tracker.withCollector(this.collector);
        this.element = document.createElement("a");
        document.body.appendChild(this.element);
    });

    it("should add data-octopeer attributes to the elements", function() {
        this.tracker.register();
        this.ev();

        expect(this.element.getAttribute("data-octopeer-x")).toBe("0");
        expect(this.element.getAttribute("data-octopeer-y")).toBe("0");
        expect(this.element.getAttribute("data-octopeer-width")).toBe("0");
        expect(this.element.getAttribute("data-octopeer-height")).toBe("0");
    });

    it("should call the sendData twice", function() {
        this.tracker.register();
        this.ev();

        expect(this.collector.sendMessage).toHaveBeenCalledTimes(2);
    });

    afterEach(function () {
        jasmine.clock().uninstall();
    });
});