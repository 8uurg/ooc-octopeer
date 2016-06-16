/// <reference path="../../interfaces/TrackingCollector.ts" />
/// <reference path="../../interfaces/DatabaseSchemes/SemanticEventJSON.ts" />
/// <reference path="./SemanticTracker.ts" />

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
     * Add an element to track
     * If the selector selects multiple elements, they will all be tracked.
     * @param selector The css selector which selects the element to track.
     * @param eventName The name of the event that is tracked.
     */
    public registerElementWithSelector(selector: string, eventName: string): void;

    /**
     * Add multiple elements to track.
     * If a selector selects multiple elements, they will all be tracked.
     * @param elements A tuple containing the selector for the element and the name of the event.
     */
    public registerElements(elements: [string, string][]): void;

    /**
     * The mappings to use for this semantic tracker.
     * @param mappings The semantic elements and their mappings to register.
     */
    public withMappings(mappings: SemanticMapping[]): SemanticTracker;

    /**
     * The filter to use for the mappings.
     * @param filter The function that filters out the elements to not register to.
     */
    protected abstract filterMappings(mapping: SemanticMapping): boolean;

    /**
     * Register an HTMLElement to this semantic tracker.
     * @param element The element to monitor
     * @param eventName The name of the event.
     */
    public abstract registerElement(element: Element, eventName: string): void;

    /**
     * The name of this semantic tracker
     * @returns {string}
     */
    public abstract getName(): string;
}