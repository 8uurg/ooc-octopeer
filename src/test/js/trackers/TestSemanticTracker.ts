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

    
});