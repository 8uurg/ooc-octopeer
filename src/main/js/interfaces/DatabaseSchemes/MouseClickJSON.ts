/// <reference path="./SessionJSON.ts" />

/**
 * This interface is used to define the structure for a mouse click accepted by the RESTFul API.
 */

interface MouseClickJSON {

    /**
     * The session object of the current pull request.
     */
    session?: SessionJSON;

    /**
     * The timestamp of when the mouse position was logged.
     */
    created_at: number;
}