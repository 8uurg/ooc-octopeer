import {SemanticTracker} from "../../../main/js/trackers/semanticTracker";

/**
 * Created by larsstegman on 31-05-16.
 * 
 * A test suite for the semantic keystroke tracker.
 */
describe("The key stroke semantic tracker", () => {

    let collector: TrackingCollector;
    let semanticTracker: SemanticTracker;
    let htmlElement: any; // Using the real type, HTMLElement, causes issues when spying on it.

    beforeEach(() => {
        jasmine.clock().install();
        jasmine.clock().mockDate();
        collector = jasmine.createSpyObj("collector", ["sendMessage"]);
        semanticTracker = new SemanticTracker().withCollector(collector);
        htmlElement = jasmine.createSpyObj("elem", ["addEventListener"]);
    });

    afterEach(() => {
        jasmine.clock().uninstall();
    });

    /*
     * A keydown event might not have been received, e.g. when using shortcuts to change the active tab/program.
     */
    it("should make an event with duration 1, when no keydown event was registered, but a " +
        "keyup event was registered.", () => {
        htmlElement.addEventListener.and.callFake((eventString: string, fireEvent: any) => {
            if (eventString === "keyup") {
                fireEvent({ keyCode: 42 });
            }
        });

        semanticTracker.registerKeystroke("Inline Comment", htmlElement);

        expect(collector.sendMessage).toHaveBeenCalledWith(jasmine.objectContaining({
            data: jasmine.objectContaining({ duration: 1 })
        }));
    });

    it("should register the second key up event with a duration of 1, when the first keydown event has " +
        "been followed by a key up event.", () => {
        let eventListenerClosureKeydown: (event: { keyCode: number }) => void = null;
        let eventListenerClosureKeyup:   (event: { keyCode: number }) => void = null;
        htmlElement.addEventListener.and.callFake((eventString: string, fireEvent: any) => {
            switch (eventString) {
                case "keydown": eventListenerClosureKeydown = fireEvent; break;
                case "keyup": eventListenerClosureKeyup = fireEvent; break;
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

    it("shouldn't send any data before a key up event is registered.", () => {
        htmlElement.addEventListener.and.callFake((eventString: string, fireEvent: any) => {
            if ( eventString === "keydown" ) {
                fireEvent({ keyCode : 42 });
            }
        });

        semanticTracker.registerKeystroke("Inline Comment", htmlElement);
        expect(collector.sendMessage).not.toHaveBeenCalled();
    });

    it("should only register the last key stroke", () => {
        let eventListenerClosureKeydown: (event: { keyCode: number }) => void = null;
        let eventListenerClosureKeyup:   (event: { keyCode: number }) => void = null;
        htmlElement.addEventListener.and.callFake((eventString: string, fireEvent: any) => {
            switch (eventString) {
                case "keydown": eventListenerClosureKeydown = fireEvent; break;
                case "keyup": eventListenerClosureKeyup = fireEvent; break;
                default: break;
            }
        });

        semanticTracker.registerKeystroke("Inline Comment", htmlElement);

        eventListenerClosureKeydown({ keyCode: 42 });
        jasmine.clock().tick(1000);
        let secondTime = Date.now();
        eventListenerClosureKeydown({ keyCode: 42 });
        jasmine.clock().tick(1000);
        let secondEndTime = Date.now();
        eventListenerClosureKeyup({ keyCode: 42 });

        expect(collector.sendMessage).toHaveBeenCalledWith(jasmine.objectContaining({
            data: jasmine.objectContaining({ duration: secondEndTime - secondTime })
        }));
    });

    it("should prevent a key from being registered if the press are older than a certain time.", () => {
        let eventListenerClosureKeydown: (event: { keyCode: number }) => void = null;
        let eventListenerClosureKeyup:   (event: { keyCode: number }) => void = null;
        htmlElement.addEventListener.and.callFake((eventString: string, fireEvent: any) => {
            switch (eventString) {
                case "keydown": eventListenerClosureKeydown = fireEvent; break;
                case "keyup": eventListenerClosureKeyup = fireEvent; break;
                default: break;
            }
        });

        semanticTracker.registerKeystroke("Inline Comment", htmlElement);

        eventListenerClosureKeydown({ keyCode: 42 });
        jasmine.clock().tick(10001);
        eventListenerClosureKeyup({ keyCode: 42 });

        expect(collector.sendMessage).toHaveBeenCalledWith(jasmine.objectContaining({
            data: jasmine.objectContaining({ duration: 1})
        }));
    });
});