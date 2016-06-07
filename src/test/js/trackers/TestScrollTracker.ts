///<reference path="../../../../typings/index.d.ts" />
import {ScrollTracker} from "../../../main/js/trackers/ScrollTracker";

describe("The ScrollTracker", function() {

    beforeEach(function() {
        this.collector = jasmine.createSpyObj("Collector", ["sendMessage"]);
        jasmine.clock().install();
        jasmine.clock().mockDate();
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

    it("should only send one package on many scrolls", function() {
        let tracker = new ScrollTracker().withCollector(this.collector);
        spyOn(window, "addEventListener").and.callFake((ev: string, listener: any) => this.listener = listener);
        tracker.register();
        window.scrollY = 40;
        window.scrollX = 60;
        this.listener();
        window.scrollY = 30;
        window.scrollX = 80;
        this.listener();

        expect(this.collector.sendMessage).toHaveBeenCalledWith({
            table: "mouse-scroll-events/",
            data: jasmine.objectContaining({
                viewport_x: 60,
                viewport_y: 40
            })
        });
    });

    afterEach(function () {
        jasmine.clock().uninstall();
    });

});