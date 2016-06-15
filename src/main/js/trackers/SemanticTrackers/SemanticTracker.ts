/// <reference path="../../interfaces/DatabaseSchemes/SemanticEventJSON.ts" />
/// <reference path="../../interfaces/TrackingCollector.ts" />

/**
 * A semantic tracker class
 */
export abstract class SemanticTracker {

    /**
     * The collector which collects the data to send it to the database.
     */
    private collector: TrackingCollector;

    /**
     * The semantic element types and their corresponding codes.
     */
    public element_types_mapping: any = {
        "Merge Pull Request":        101,
        "Close Pull Request":        102,
        "Cancel inline comment":     103,
        "Comment inline comment":    104,
        "Inline Comment":            105,
        "Edit comment":              109,
        "Add reaction":              110,
        "Comment textfield":         501,
        "Inline comment textfield":  502
    };

    /**
     * The semantic event types and their corresponding codes.
     */
    public event_types_mapping: any = {
        "Keystroke":                   101,
        "Click":                       201,
        "Mouseenter":                  202,
        "Mouseleave":                  203,
        "Scroll into view":            301,
        "Scroll out of view":          302,
        "Start watching pull request": 401,
        "Stop watching pull request":  402
    };

    /**
     * Set the collector for this tracker.
     * @param collector The collector to send the tracking data to.
     * @return Itself for daisy chaining.
     */
    public withCollector(collector: TrackingCollector): SemanticTracker {
        this.collector = collector;
        return this;
    }

    /**
     * Create a semantic event json.
     * @param event_type_name The name of the event type
     * @param element_name The name of the element
     * @returns {SemanticEventJSON}
     */
    protected createMessage(event_type_name: string, element_name: string): SemanticEventJSON {
        if (!this.event_types_mapping.hasOwnProperty(event_type_name)) {
            throw new TypeError("Illegal semantic event type name: " + event_type_name);
        }
        if (!this.element_types_mapping.hasOwnProperty(element_name)) {
            throw new TypeError("Illegal semantic element type name: " + element_name);
        }

        return {
            event_type: this.event_types_mapping[event_type_name],
            element_type: this.element_types_mapping[element_name],
            created_at: Date.now() / 1000
        };
    }

    /**
     * Send the data to the database.
     * @param data The data to send.
     */
    protected sendData(data: SemanticEventJSON): void {
        this.collector.sendMessage({
            table: "semantic-events/",
            data: data
        });
    }

    /**
     * Add an element to track
     * If the selector selects multiple elements, they will all be tracked.
     * @param selector The css selector which selects the element to track.
     * @param eventName The name of the event that is tracked.
     */
    public registerElementWithSelector(selector: string, eventName: string) {
        let selectedElements = <NodeListOf<Element>> document.querySelectorAll(selector);
        for (let i = 0; i < selectedElements.length; i++) {
            this.registerElement(selectedElements[i], eventName);
        }
    }

    /**
     * Add multiple elements to track.
     * If a selector selects multiple elements, they will all be tracked.
     * @param elements A tuple containing the selector for the element and the name of the event.
     */
    public registerElements(elements: [string, string][]) {
        for (let i = 0; i < elements.length; i++) {
            this.registerElementWithSelector(elements[i][0], elements[i][1]);
        }
    }

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