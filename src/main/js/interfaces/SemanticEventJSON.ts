/**
 * This interface is used to define the structure of a semantic event in the RESTful API.
 */
interface SemanticEventJSON {
    /**
     * The session object of the current pull request.
     */
    session?: SessionJSON;

    /**
     * The event-type object.
     */
    event_type: number;

    /**
     * The element-type object.
     */
    element_type: number;

    /**
     * The timestamp of the event.
     */
    created_at: number;

    /**
     * How long the event took.
     */
    duration: number;
}