///<reference path="../../../../typings/index.d.ts" />
"use strict";
import {ScrollTracker} from "../../../main/js/trackers/ScrollTracker";

describe("The ScrollTracker", function() {

    beforeEach(function() {
        this.collector = jasmine.createSpyObj("Collector", ["sendMessage"]);
    });

    it("should send a package on scroll", function() {
        let tracker = new ScrollTracker().withCollector(this.collector);
        spyOn(window, "addEventListener").and.callFake((ev: string, listener: any) => this.listener = listener);
        tracker.register();
        window.scrollY = 40;
        window.scrollX = 60;
        this.listener();

        expect(this.collector.sendMessage).toHaveBeenCalled();
    });

});