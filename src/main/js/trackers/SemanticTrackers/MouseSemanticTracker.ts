/// <reference path="./SemanticTracker.d.ts" />

/**
 * The semantic key stroke tracker
 */
export class MouseSemanticTracker
    extends SemanticTracker {

    /**
     * Register an HTMLElement to this semantic tracker.
     * @param element The element to monitor
     * @param eventName The name of the event.
     */
    public registerElement(element: Element, eventName: string): void {
        element.addEventListener("mouseenter", () => {
            this.sendData(this.createMessage("Mouseenter", eventName));
        });

        element.addEventListener("mouseleave", () => {
            this.sendData(this.createMessage("Mouseleave", eventName));
        });
    }
}
