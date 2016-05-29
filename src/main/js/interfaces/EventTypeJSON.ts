/**
 * This interface is used to define the structure for an event-type accepted by the RESTFul API.
 */
interface EventTypeJSON {
    /**
     * The ID of the event-type.
     */
    id: number;

    /**
     * The name of the event-type.
     */
    name: string;
}