/// <reference path="./SemanticTracker.d.ts" />
/// <reference path="../../Main.d.ts" />
declare var OCTOPEER_CONSTANTS: any;

/**
 * The semantic key stroke tracker
 */
export class ClickSemanticTracker
    extends SemanticTracker {

    /**
     * The name of this semantic tracker
     * @returns {string}
     */
    public getName(): string {
        return "ClickSemanticTracker";
    }

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

    /**
     * Check if this element mapping has tracking click turned on.
     * @param mapping The mapping that is being checked.
     */
    public shouldRegisterElement(mapping: SemanticMapping): boolean {
        return mapping.track.click;
    }
}

main.declareTracker({
    tracker: (collector, mappings) => {
        return (new ClickSemanticTracker())
            .withCollector(collector)
            .withMappings(mappings);
    },
    setting: {
        name: OCTOPEER_CONSTANTS.track_semantic_clicks,
        def: true
    }
});
