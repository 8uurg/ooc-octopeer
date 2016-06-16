/// <reference path="../../../typings/index.d.ts" />

import {Main} from "../../main/js/Main";

describe("The Main", function() {
    let main: Main;

    beforeEach(function () {
        main = new Main();
    });

    it("Should not allow more than a single TrackingCollector", function () {
        main.declareTrackingCollector((_) => <TrackingCollector>{});
        expect(() => {
            main.declareTrackingCollector((_) => <TrackingCollector>{});
        }).toThrowError();
    });

    it("Should not allow more than a single Session Data Gatherer", function () {
        main.declareSessionDataGatherer(() => <SessionDataGatherer>{});
        expect(() => {
            main.declareSessionDataGatherer(() => <SessionDataGatherer>{});
        }).toThrowError();
    });

    it("Should not allow more than a single Semantic Mapping", function () {
        main.declareSemanticMappings([]);
        expect(() => {
            main.declareSemanticMappings([]);
        }).toThrowError();
    });

    it("Should allow defining a few trackers.", function() {
        let tracker1 = jasmine.createSpy("Tracker");
        let tracker2 = jasmine.createSpy("Tracker");
        main.declareTracker({
            tracker: tracker1,
            setting: {name: "x", def: true}
        });
        main.declareTracker({
            tracker: tracker2,
            setting: {name: "y", def: false}
        });
    });

    describe("The done function.", function() {
        let tracker1: any;
        let tracker2: any;
        let sessiondata: any;
        let collector: any;

        beforeEach(function () {
            tracker1 = jasmine.createSpy("Tracker");
            main.declareTracker({
                tracker: tracker1,
                setting: {name: "x", def: true}
            });
            tracker2 = jasmine.createSpy("Tracker");
            main.declareTracker({
                tracker: tracker2,
                setting: {name: "y", def: false}
            });
            main.declareSemanticMappings([]);
            sessiondata = jasmine.createSpyObj("SessionDataGatherer", ["getSessionData"]);
            main.declareSessionDataGatherer(() => sessiondata);
        });

        it("should correctly infer default settings.", function(done) {
            collector = jasmine.createSpyObj("Collector", ["isReadyToSend", "sendMessage"]);
            main.declareTrackingCollector((_) => collector);
            collector.isReadyToSend.and.returnValue(true);

            spyOn(chrome.storage.sync, "get").and.callFake(
                function(settings: { [key: string]: boolean },
                        activation: (settings: { [key: string]: boolean }) => void ) {
                    expect(settings["x"]).toBeTruthy();
                    expect(settings["y"]).toBeFalsy();
                    done();
                });

            main.done();
        });

        it("should enable trackers on basis of their setting.", function(done) {
            collector = jasmine.createSpyObj("Collector", ["isReadyToSend", "sendMessage"]);
            main.declareTrackingCollector((_) => collector);
            collector.isReadyToSend.and.returnValue(true);

            spyOn(chrome.storage.sync, "get").and.callFake(
                function(settings: { [key: string]: boolean },
                        activation: (settings: { [key: string]: boolean }) => void ) {
                    // User changed settings, different from defaults!
                    settings["x"] = true;
                    settings["y"] = false;
                    activation(settings);
                    expect(tracker1).toHaveBeenCalled();
                    expect(tracker2).not.toHaveBeenCalled();
                    done();
                });

            main.done();
        });

        it("should check if a collector got the data it required before registering trackers", function() {
            collector = jasmine.createSpyObj("Collector", ["isReadyToSend", "sendMessage"]);
            main.declareTrackingCollector((_) => collector);
            collector.isReadyToSend.and.returnValue(false);

            expect(() => main.done()).toThrowError();
        });

        it("should check if a collector is defined before registering trackers.", function() {
            expect(() => main.done()).toThrowError();
        });
    });

});