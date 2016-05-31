"use strict";

import {SemanticTracker} from "../../../main/js/trackers/semanticTracker";

/**
 * Created by larsstegman on 31-05-16.
 * 
 * A test suite for the semantic keystroke tracker.
 */
describe("The key stroke semantic tracker", () => {

    let collector: TrackingCollector;
    let semanticTracker: SemanticTracker;
    let htmlElement: any;

    beforeEach(() => {
        collector = jasmine.createSpyObj("collector", ["sendMessage"]);
        semanticTracker = new SemanticTracker().withCollector(collector);
        htmlElement = jasmine.createSpyObj("elem", ["addEventListener"]);
        jasmine.clock().install();
    });

    afterEach(() => {
        jasmine.clock().uninstall();
    });

    it("should make an event with duration 1, when no keydown event was registered.", () => {
        htmlElement.addEventListener.and.callFake((eventString: string, eventFiredCallback: any) => {
            if (eventString === "keyup") {
                eventFiredCallback({ keyCode: 42 });
            }
        });

        semanticTracker.registerKeystroke("Inline Comment", htmlElement);

        expect(collector.sendMessage).toHaveBeenCalledWith(jasmine.objectContaining({
            data: jasmine.objectContaining({ duration: 1 })
        }));
    });

    it("should no longer register a time longer than 1 after one keydown and 2 keyups", () => {
        let eventListenerClosureKeydown: (event: { keyCode: number }) => void = null;
        let eventListenerClosureKeyup:   (event: { keyCode: number }) => void = null;
        htmlElement.addEventListener.and.callFake((eventString: string, callback: any) => {
            switch (eventString) {
                case "keydown": eventListenerClosureKeydown = callback; break;
                case "keyup": eventListenerClosureKeyup = callback; break;
                default: break;
            }
        });

        semanticTracker.registerKeystroke("Inline Comment", htmlElement);

        eventListenerClosureKeydown({ keyCode: 42 });
        let start = Date.now();
        jasmine.clock().tick(4000);
        eventListenerClosureKeyup({ keyCode: 42 });
        let end = Date.now();
        jasmine.clock().tick(4000);
        eventListenerClosureKeyup({ keyCode: 42 });

        expect(collector.sendMessage).toHaveBeenCalledTimes(2);
        expect(collector.sendMessage).toHaveBeenCalledWith(jasmine.objectContaining({
            data: jasmine.objectContaining({ duration: 1 })
        }));
        expect(collector.sendMessage).toHaveBeenCalledWith(jasmine.objectContaining({
            data: jasmine.objectContaining({ duration: end - start })
        }));
    });
});