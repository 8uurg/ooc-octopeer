/// <reference path="./SemanticTracker.d.ts" />
/// <reference path="../../Main.d.ts" />
declare var OCTOPEER_CONSTANTS: any;

/**
 * The semantic key stroke tracker
 */
export class KeystrokeSemanticTracker
    extends SemanticTracker {

    /**
     * The name of this semantic tracker
     * @returns {string}
     */
    public getName(): string {
        return "KeystrokeSemanticTracker";
    }

    /**
     * Register a HTMLElement to this semantic tracker.
     * @param element The element to monitor
     * @param eventName The name of the event.
     */
    public registerElement(element: Element, eventName: string): void {
        element.addEventListener("keyup", () => {
            this.sendData(this.createMessage("Keystroke", eventName));
        });
    }
}

main.declareTracker({
    tracker: (collector, mappings) => {
        return (new KeystrokeSemanticTracker())
            .withCollector(collector);
    },
    setting: {
        name: OCTOPEER_CONSTANTS.track_semantic_key_strokes,
        def: true
    }
});
