/**
 * A semantic tracker class
 */
abstract class SemanticTracker {

    /**
     * The collector which collects the data to send it to the database.
     */
    private collector: TrackingCollector;

    /**
     * The semantic element types and their corresponding codes.
     */
    protected element_types_mapping: any = {
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
    protected event_types_mapping: any = {
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
     * @param event_name The name of the event
     * @param element_name The name of the element
     * @returns {SemanticEventJSON}
     */
    protected createMessage(event_name: string, element_name: string): SemanticEventJSON {
        return {
            event_type: this.event_types_mapping[event_name],
            element_type: this.element_types_mapping[element_name],
            created_at: Date.now() / 1000
        };
    }

    /**
     * Send the data to the database.
     * @param data The data to send.
     */
    protected sendData(data: SemanticEventJSON) {
        this.collector.sendMessage({
            table: "semantic-events/",
            data: data
        });
    }

    /**
     * This method registers the trackers for all semantic elements.
     * @param element The semantic element to track and its settings.
     */
    public abstract registerSemanticElement(element: SemanticMapping);
}