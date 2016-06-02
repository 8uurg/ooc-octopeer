import {SemanticTracker} from "../../../main/js/trackers/semanticTracker";

/**
 * Created by larsstegman on 31-05-16.
 * 
 * A test suite for the semantic keystroke tracker.
 */
describe("The key stroke semantic tracker", function() {

    let collector: TrackingCollector;
    let semanticTracker: SemanticTracker;
    let htmlElement: any; // Using the real type, HTMLElement, causes issues when spying on it.
    let fireEvent: any;

    beforeEach(function() {
        jasmine.clock().install();
        jasmine.clock().mockDate();
        collector = jasmine.createSpyObj("collector", ["sendMessage"]);
        semanticTracker = new SemanticTracker().withCollector(collector);
        htmlElement = jasmine.createSpyObj("elem", ["addEventListener"]);
        fireEvent = {};
        htmlElement.addEventListener.and.callFake((eventString: string, fireEventFunction: any) => {
            fireEvent[eventString] = fireEventFunction;
        });
    });

    afterEach(function() {
        jasmine.clock().uninstall();
    });

    /*
     * A keydown event might not have been received, e.g. when using shortcuts to change the active tab/program.
     */
    it("should make an event with duration 1, when no keydown event was registered, but a " +
            "keyup event was registered.", function() {
        semanticTracker.registerKeystroke("Inline Comment", htmlElement);

        fireEvent["keyup"]({ keyCode: 42 });

        expect(collector.sendMessage).toHaveBeenCalledWith(jasmine.objectContaining({
            data: jasmine.objectContaining({ duration: 1 })
        }));
    });

    it("should register the second key up event with a duration of 1, when the first keydown event has " +
            "been followed by a key up event.", function() {
        semanticTracker.registerKeystroke("Inline Comment", htmlElement);

        fireEvent["keydown"]({ keyCode: 42 });
        let start = Date.now();
        jasmine.clock().tick(4000);
        fireEvent["keyup"]({ keyCode: 42 });
        let end = Date.now();
        jasmine.clock().tick(4000);
        fireEvent["keyup"]({ keyCode: 42 });

        expect(collector.sendMessage).toHaveBeenCalledTimes(2);
        expect(collector.sendMessage).toHaveBeenCalledWith(jasmine.objectContaining({
            data: jasmine.objectContaining({ duration: 1 })
        }));
        expect(collector.sendMessage).toHaveBeenCalledWith(jasmine.objectContaining({
            data: jasmine.objectContaining({ duration: end - start })
        }));
    });

    it("shouldn't send any data after a keydown event is registered, but before a key up event " +
            "is registered.", function() {
        semanticTracker.registerKeystroke("Inline Comment", htmlElement);

        fireEvent["keydown"]({ keyCode: 42 });
        expect(collector.sendMessage).not.toHaveBeenCalled();
    });

    it("should only register a duplicate keystroke if both have sent a keyup event.", function() {
        semanticTracker.registerKeystroke("Inline Comment", htmlElement);

        fireEvent["keydown"]({ keyCode: 42 });
        jasmine.clock().tick(1000);
        let secondTime = Date.now();
        fireEvent["keydown"]({ keyCode: 42 });
        jasmine.clock().tick(1000);
        let secondEndTime = Date.now();
        fireEvent["keyup"]({ keyCode: 42 });

        expect(collector.sendMessage).toHaveBeenCalledWith(jasmine.objectContaining({
            data: jasmine.objectContaining({ duration: secondEndTime - secondTime })
        }));
    });

    it("should prevent a key from being registered if the press is older than a certain time.", function() {
        semanticTracker.registerKeystroke("Inline Comment", htmlElement);

        fireEvent["keydown"]({ keyCode: 42 });
        jasmine.clock().tick(10001);
        fireEvent["keyup"]({ keyCode: 42 });

        expect(collector.sendMessage).toHaveBeenCalledWith(jasmine.objectContaining({
            data: jasmine.objectContaining({ duration: 1})
        }));
    });
});