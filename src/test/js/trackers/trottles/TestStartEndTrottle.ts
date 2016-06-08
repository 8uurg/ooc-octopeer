/// <reference path="../../../../../typings/index.d.ts" />

import {StartEndTrottle} from "../../../../main/js/trackers/trottles/StartEndTrottle";

describe("The LastMessage trottle", function () {

    beforeEach(function () {
        jasmine.clock().install();
        jasmine.clock().mockDate();
        this.fakeCollector = jasmine.createSpyObj("Collector", ["sendMessage"]);
        this.trottle = new StartEndTrottle(this.fakeCollector);
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

    it("should immidiately pass the first message onwards.", function() {
        this.trottle.sendMessage(this.fakeMessage);

        expect(this.fakeCollector.sendMessage).toHaveBeenCalledWith(this.fakeMessage);
    });

    it("Not immidiately send the message sent soon after it.", function() {
        this.trottle.sendMessage(this.fakeMessage);
        expect(this.fakeCollector.sendMessage).toHaveBeenCalledWith(this.fakeMessage);

        jasmine.clock().tick(800);
        this.trottle.sendMessage(this.anotherFakeMessage);
        expect(this.fakeCollector.sendMessage).not.toHaveBeenCalledWith(this.anotherFakeMessage);

        jasmine.clock().tick(1000);
        expect(this.fakeCollector.sendMessage).toHaveBeenCalledWith(this.anotherFakeMessage);
    });

    it("should keep sending if the delay is great enough", function() {
        this.trottle.sendMessage(this.fakeMessage);
        expect(this.fakeCollector.sendMessage).toHaveBeenCalledWith(this.fakeMessage);

        jasmine.clock().tick(1001);

        this.trottle.sendMessage(this.anotherFakeMessage);
        expect(this.fakeCollector.sendMessage).toHaveBeenCalledWith(this.anotherFakeMessage);
    });

    afterEach(function () {
        jasmine.clock().uninstall();
    });
});