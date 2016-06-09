/// <reference path="./SemanticTracker.d.ts" />

/**
 * The semantic key stroke tracker
 */
export class KeystrokeSemanticTracker
    extends SemanticTracker {

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
