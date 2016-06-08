/**
 * A semantic tracker class
 */
declare abstract class SemanticTracker {

    /**
     * Set the collector for this tracker.
     * @param collector The collector to send the tracking data to.
     * @return Itself for daisy chaining.
     */
    public withCollector(collector: TrackingCollector): SemanticTracker;

    /**
     * Create a semantic event json.
     * @param event_name The name of the event
     * @param element_name The name of the element
     * @returns {SemanticEventJSON}
     */
    protected createMessage(event_name: string, element_name: string): SemanticEventJSON;

    /**
     * Send the data to the database.
     * @param data The data to send.
     */
    protected sendData(data: SemanticEventJSON): void;

    /**
     * Register an HTMLElement to this semantic tracker.
     * @param element The element to monitor
     * @param eventName The name of the event.
     */
    public abstract registerElement(element: Element, eventName: string): void;
}