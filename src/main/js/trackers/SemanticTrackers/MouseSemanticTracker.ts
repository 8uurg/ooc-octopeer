/// <reference path="./SemanticTracker.d.ts" />
/// <reference path="../../Main.d.ts" />
declare var OCTOPEER_CONSTANTS: any;

/**
 * The semantic key stroke tracker
 */
export class MouseSemanticTracker
    extends SemanticTracker {

    /**
     * The name of this semantic tracker
     * @returns {string}
     */
    public getName(): string {
        return "MouseSemanticTracker";
    }

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

    /**
     * Check if this element mapping has tracking mouse turned on.
     * @param mapping The mapping that is being checked.
     */
    public filterMappings(mapping: SemanticMapping) {
        return mapping.track.hover;
    }
}

main.declareTracker({
    tracker: (collector, mappings) => {
        return (new MouseSemanticTracker())
            .withCollector(collector)
            .withMappings(mappings);
    },
    setting: {
        name: OCTOPEER_CONSTANTS.track_semantic_position,
        def: true
    }
});