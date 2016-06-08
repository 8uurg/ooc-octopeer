/// <reference path="./SemanticTracker.d.ts" />

/**
 * The semantic key stroke tracker
 */
export class ClickSemanticTracker
    extends SemanticTracker {

    /**
     * Register an HTMLElement to this semantic tracker.
     * @param element The element to monitor
     * @param eventName The name of the event.
     */
    public registerElement(element: Element, eventName: string): void {
        element.addEventListener("click", () => {
            this.sendData(this.createMessage("Click", eventName));
        });
    }
}
