/// <reference path="../../../../../typings/index.d.ts" />

import {StartEndThrottle} from "../../../../main/js/trackers/throttles/StartEndThrottle";

describe("The LastMessage throttle", function () {

    beforeEach(function () {
        jasmine.clock().install();
        jasmine.clock().mockDate();
        this.fakeCollector = jasmine.createSpyObj("Collector", ["sendMessage"]);
        this.throttle = new StartEndThrottle(this.fakeCollector);
        this.fakeMessage = {
            test: "isWorking"
        };
        this.anotherFakeMessage = {
            test: "isWorkingEvenBetter"
        };
        this.wrongFakeMessage = {
            test: "isNotWorking"
        };
    });

    it("should immediately pass the first message onwards.", function() {
        this.throttle.sendMessage(this.fakeMessage);

        expect(this.fakeCollector.sendMessage).toHaveBeenCalledWith(this.fakeMessage);
    });

    it("Not immideately send the message sent soon after it.", function() {
        this.throttle.sendMessage(this.fakeMessage);
        expect(this.fakeCollector.sendMessage).toHaveBeenCalledWith(this.fakeMessage);

        jasmine.clock().tick(800);
        this.throttle.sendMessage(this.anotherFakeMessage);
        expect(this.fakeCollector.sendMessage).not.toHaveBeenCalledWith(this.anotherFakeMessage);

        jasmine.clock().tick(1000);
        expect(this.fakeCollector.sendMessage).toHaveBeenCalledWith(this.anotherFakeMessage);
    });

    it("should keep sending if the delay is great enough", function() {
        this.throttle.sendMessage(this.fakeMessage);
        expect(this.fakeCollector.sendMessage).toHaveBeenCalledWith(this.fakeMessage);

        jasmine.clock().tick(1001);

        this.throttle.sendMessage(this.anotherFakeMessage);
        expect(this.fakeCollector.sendMessage).toHaveBeenCalledWith(this.anotherFakeMessage);
    });

    afterEach(function () {
        jasmine.clock().uninstall();
    });
});