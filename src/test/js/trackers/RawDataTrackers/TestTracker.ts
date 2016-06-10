/// <reference path="./../../../../main/js/trackers/RawDataTrackers/Tracker.d.ts" />
///<reference path="../../../../../typings/index.d.ts" />

export function testTracker(TrackerClass: new () => Tracker) {
    describe("The basic tracking behaviour", function() {
        it("should allow adding an throttle in between.", function () {
            let tracker = new TrackerClass();
            let fakeCollector = jasmine.createSpyObj("Collector", ["sendMessage"]);
            let trackerSendMessage = jasmine.createSpy("sendMessage");
            let fakeTracker: any = function() { this.sendMessage = trackerSendMessage; };
            let fakeMessage: any = {
                test: "Works"
            };

            tracker.withCollector(fakeCollector).withThrottle(fakeTracker);

            tracker.sendMessage(fakeMessage);

            expect(trackerSendMessage).toHaveBeenCalled();
            expect(fakeCollector.sendMessage).not.toHaveBeenCalled();
        });
    });
}