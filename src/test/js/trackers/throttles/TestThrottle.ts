/// <reference path="../../../../../typings/index.d.ts" />

import {Throttle} from "../../../../main/js/trackers/throttles/Throttle";

describe("The basic throttle", function () {
    beforeEach(function () {
        this.fakeCollector = jasmine.createSpyObj("Collector", ["sendMessage", "isReadyToSend"]);
        this.throttle = new Throttle(this.fakeCollector);
        this.fakeMessage = {
            test: "isWorking"
        };
    });

    it("should just pass the message onwards", function() {
        this.throttle.sendMessage(this.fakeMessage);

        expect(this.fakeCollector.sendMessage).toHaveBeenCalledWith(this.fakeMessage);
    });

    it("should pass the request if it ready to send onwards.", function () {
        this.throttle.isReadyToSend();

        expect(this.fakeCollector.isReadyToSend).toHaveBeenCalledTimes(1);
    });
});