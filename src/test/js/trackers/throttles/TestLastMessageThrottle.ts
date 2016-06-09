/// <reference path="../../../../../typings/index.d.ts" />

import {LastMessageThrottle} from "../../../../main/js/trackers/throttles/LastMessageThrottle";

describe("The LastMessage throttle", function () {

    beforeEach(function () {
        jasmine.clock().install();
        jasmine.clock().mockDate();
        this.fakeCollector = jasmine.createSpyObj("Collector", ["sendMessage"]);
        this.throttle = new LastMessageThrottle(this.fakeCollector);
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

    it("should not immediately pass the message onwards.", function() {
        this.throttle.sendMessage(this.fakeMessage);

        expect(this.fakeCollector.sendMessage).not.toHaveBeenCalledWith(this.fakeMessage);
        jasmine.clock().tick(1000);
        expect(this.fakeCollector.sendMessage).toHaveBeenCalledWith(this.fakeMessage);
    });

    it("should drop the message if one is sent after it.", function() {
        this.throttle.sendMessage(this.wrongFakeMessage);

        jasmine.clock().tick(800);
        this.throttle.sendMessage(this.fakeMessage);

        jasmine.clock().tick(1000);
        expect(this.fakeCollector.sendMessage).not.toHaveBeenCalledWith(this.wrongFakeMessage);
        expect(this.fakeCollector.sendMessage).toHaveBeenCalledWith(this.fakeMessage);
    });

    it("should keep sending if the delay is great enough", function() {
        this.throttle.sendMessage(this.fakeMessage);

        jasmine.clock().tick(5000);
        this.throttle.sendMessage(this.anotherFakeMessage);
        jasmine.clock().tick(1000);

        expect(this.fakeCollector.sendMessage).toHaveBeenCalledWith(this.anotherFakeMessage);
        expect(this.fakeCollector.sendMessage).toHaveBeenCalledWith(this.fakeMessage);
    });

    afterEach(function () {
        jasmine.clock().uninstall();
    });
});