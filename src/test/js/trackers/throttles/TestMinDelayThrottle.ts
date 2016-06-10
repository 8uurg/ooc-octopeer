/// <reference path="../../../../../typings/index.d.ts" />

import {MinDelayThrottle} from "../../../../main/js/trackers/throttles/MinDelayThrottle";

describe("The MinDelay throttle", function () {

    beforeEach(function () {
        jasmine.clock().install();
        jasmine.clock().mockDate();
        this.fakeCollector = jasmine.createSpyObj("Collector", ["sendMessage"]);
        this.throttle = new MinDelayThrottle(this.fakeCollector);
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

    it("should immediately pass the message onwards.", function() {
        this.throttle.sendMessage(this.fakeMessage);

        expect(this.fakeCollector.sendMessage).toHaveBeenCalledWith(this.fakeMessage);
    });

    it("should drop the current message if one was sent before it.", function() {
        this.throttle.sendMessage(this.fakeMessage);

        jasmine.clock().tick(800);
        this.throttle.sendMessage(this.WrongFakeMessage);

        expect(this.fakeCollector.sendMessage).not.toHaveBeenCalledWith(this.wrongFakeMessage);
        expect(this.fakeCollector.sendMessage).toHaveBeenCalledWith(this.fakeMessage);
    });

    it("should keep sending if the delay is great enough", function() {
        this.throttle.sendMessage(this.fakeMessage);

        jasmine.clock().tick(5000);
        this.throttle.sendMessage(this.anotherFakeMessage);

        expect(this.fakeCollector.sendMessage).toHaveBeenCalledWith(this.anotherFakeMessage);
        expect(this.fakeCollector.sendMessage).toHaveBeenCalledWith(this.fakeMessage);
    });

    afterEach(function () {
        jasmine.clock().uninstall();
    });

});