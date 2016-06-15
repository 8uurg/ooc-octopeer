/// <reference path="./../../../../main/js/trackers/RawDataTrackers/Tracker.d.ts" />
///<reference path="../../../../../typings/index.d.ts" />

export function testTracker(TrackerClass: new () => Tracker) {
    describe("The basic tracking behaviour", function() {
        it("should allow adding an throttle in between.", function () {
            let tracker = new TrackerClass();
            let fakeCollector = jasmine.createSpyObj("Collector", ["sendMessage"]);
            let fakeThrottle = jasmine.createSpyObj("Throttle", ["sendMessage"]);
            let fakeThrottleFac: any = () => fakeThrottle;
            let fakeMessage: any = {
                test: "Works"
            };

            tracker.withCollector(fakeCollector).withThrottle(fakeThrottleFac);

            tracker.sendMessage(fakeMessage);

            expect(fakeThrottle.sendMessage).toHaveBeenCalled();
            expect(fakeCollector.sendMessage).not.toHaveBeenCalled();
        });
    });
}