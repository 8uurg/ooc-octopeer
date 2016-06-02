/// <reference path="./SessionJSON.ts" />

/**
 * This interface is used to define the structure for a semantic event accepted by the RESTFul API.
 */

interface SemanticEventJSON {

    /**
     * The session object of the current pull request.
     */
    session?: SessionJSON;

    /**
     * The type of event used.
     */
    event_types: string;

    /**
     * Type of element.
     */
    element_types: string;

    /**
     * A unix timestamp at which the event started.
     */
    created_at: number;

    /**
     * The duration.
     */
    duration: number;
}