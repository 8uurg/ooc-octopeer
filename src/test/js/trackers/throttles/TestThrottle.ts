/// <reference path="../../../../../typings/index.d.ts" />

import {Throttle} from "../../../../main/js/trackers/throttles/Throttle";

describe("The basic throttle", function () {
    it("should just pass the message onwards", function() {
        let fakeCollector = jasmine.createSpyObj("Collector", ["sendMessage"]);
        let throttle = new Throttle(fakeCollector);
        let fakeMessage: any = {
            test: "isWorking"
        };

        throttle.sendMessage(fakeMessage);

        expect(fakeCollector.sendMessage).toHaveBeenCalledWith(fakeMessage);
    });
});