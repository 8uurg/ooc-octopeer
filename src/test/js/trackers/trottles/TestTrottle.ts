/// <reference path="../../../../../typings/index.d.ts" />

import {Trottle} from "../../../../main/js/trackers/trottles/Trottle";

describe("The basic trottle", function () {
    it("should just pass the message onwards", function() {
        let fakeCollector = jasmine.createSpyObj("Collector", ["sendMessage"]);
        let trottle = new Trottle(fakeCollector);
        let fakeMessage: any = {
            test: "isWorking"
        };

        trottle.sendMessage(fakeMessage);

        expect(fakeCollector.sendMessage).toHaveBeenCalledWith(fakeMessage);
    });
});