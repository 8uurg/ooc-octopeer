/// <reference path="../../../../../typings/index.d.ts" />

import {LastMessageTrottle} from "../../../../main/js/trackers/trottles/LastMessageTrottle";

describe("The LastMessage trottle", function () {

    beforeEach(function () {
        jasmine.clock().install();
        jasmine.clock().mockDate();
        this.fakeCollector = jasmine.createSpyObj("Collector", ["sendMessage"]);
        this.trottle = new LastMessageTrottle(this.fakeCollector);
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

    it("should not immidiately pass the message onwards.", function() {
        this.trottle.sendMessage(this.fakeMessage);

        expect(this.fakeCollector.sendMessage).not.toHaveBeenCalledWith(this.fakeMessage);
        jasmine.clock().tick(1000);
        expect(this.fakeCollector.sendMessage).toHaveBeenCalledWith(this.fakeMessage);
    });

    it("should drop the message if one is sent after it.", function() {
        this.trottle.sendMessage(this.wrongFakeMessage);

        jasmine.clock().tick(800);
        this.trottle.sendMessage(this.fakeMessage);

        jasmine.clock().tick(1000);
        expect(this.fakeCollector.sendMessage).not.toHaveBeenCalledWith(this.wrongFakeMessage);
        expect(this.fakeCollector.sendMessage).toHaveBeenCalledWith(this.fakeMessage);
    });

    it("should keep sending if the delay is great enough", function() {
        this.trottle.sendMessage(this.fakeMessage);

        jasmine.clock().tick(5000);
        this.trottle.sendMessage(this.anotherFakeMessage);
        jasmine.clock().tick(1000);

        expect(this.fakeCollector.sendMessage).toHaveBeenCalledWith(this.anotherFakeMessage);
        expect(this.fakeCollector.sendMessage).toHaveBeenCalledWith(this.fakeMessage);
    });

    afterEach(function () {
        jasmine.clock().uninstall();
    });
});