/// <reference path="./SemanticTracker.d.ts" />
/// <reference path="../../Main.d.ts" />
declare var OCTOPEER_CONSTANTS: any;
declare var scrollMonitor: any;

/**
 * The semantic visible element scroll tracker.
 */
export class ScrollSemanticTracker
    extends SemanticTracker {

    /**
     * The name of this semantic tracker.
     */
    public getName(): string {
        return "ScrollSemanticTracker";
    }

    /**
     * Register an HTMLElement to this semantic tracker.
     * @param element The element to monitor
     * @param elementName The name of the element.
     */
    public registerElement(element: Element, elementName: string): void {
        let sm = scrollMonitor.create(element);

        sm.enterViewport(() => {
            this.sendData(this.createMessage("Scroll into view", elementName));
        });
        
        sm.exitViewport(() => {
            this.sendData(this.createMessage("Scroll out of view", elementName));
        });
    }

    /**
     * Check if this element mapping has tracking mouse turned on.
     * @param mapping The mapping that is being checked.
     */
    public filterMappings(mapping: SemanticMapping): boolean {
        return mapping.track.scroll;
    }
}

main.declareTracker({
    tracker: (collector, mappings) => {
        return (new ScrollSemanticTracker())
            .withCollector(collector)
            .withMappings(mappings);
    },
    setting: {
        name: OCTOPEER_CONSTANTS.track_semantic_scrolling,
        def: true
    }
});