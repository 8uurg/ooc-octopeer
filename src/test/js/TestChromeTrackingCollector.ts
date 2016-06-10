///<reference path="../../../typings/index.d.ts" />

import {ChromeTrackingCollector} from "../../main/js/ChromeTrackingCollector";

describe("ChromeTrackingCollector", function () {

    beforeEach(function () {
        this.port = jasmine.createSpyObj("Port", ["postMessage"]);
        spyOn(chrome.runtime, "connect").and.returnValue(this.port);

        this.sessionDataGatherer = jasmine.createSpyObj("SessionDataGatherer", ["getSessionData"]);
        this.sessionDataGatherer.getSessionData.and.returnValue({"test": "isOkay"});
    });

    it("should throw an error when trying to send over a page which does not have a session", function () {
        this.sessionDataGatherer.getSessionData.and.returnValue(undefined);

        let collector = new ChromeTrackingCollector(this.sessionDataGatherer);
        expect(() => {
            collector.sendMessage(<any>{});
        }).toThrowError("Session was not initialized before sending data.");
    });

    it("should get the session from a SessionDataGatherer and open a port.", function () {
        new ChromeTrackingCollector(this.sessionDataGatherer);
        expect(chrome.runtime.connect).toHaveBeenCalled();
        expect(this.sessionDataGatherer.getSessionData).toHaveBeenCalled();
    });

    it("should send the message with the session object changed.", function () {
        let collector = new ChromeTrackingCollector(this.sessionDataGatherer);

        // Silence the static formatting checker, we are not sending it to a server.
        const fakeMessage: Message = <any> {
            "table": "text",
            "data": { "session": {"test": "isNotOkay"} }
        };
        collector.sendMessage(fakeMessage);

        const sessionInjectedMessage: Message = <any> {
            "table": "text",
            "data": { "session": {"test": "isOkay"} }
        };

        expect(this.port.postMessage).toHaveBeenCalledWith(sessionInjectedMessage);
    });

    it("should give back whether the session is set or not (case true)", function() {
        let collector = new ChromeTrackingCollector(this.sessionDataGatherer);
        expect(collector.isReadyToSend()).toBe(true);
    });

    it("should give back whether the session is set or not (case false)", function() {
        this.sessionDataGatherer.getSessionData.and.returnValue(null);
        let collector = new ChromeTrackingCollector(this.sessionDataGatherer);

        expect(collector.isReadyToSend()).toBe(false);
    });
});