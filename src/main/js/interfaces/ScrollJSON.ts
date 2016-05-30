/// <reference path="SessionJSON.ts" />


/**
 * This is the format for the scroll event.
 */
interface ScrollJSON {

    /**
     * The session object of the current pull request.
     */
    session?: SessionJSON;

    /**
     * The x position of the viewport in comparison to the page origin.
     */
    viewport_x: number;

    /**
     * The y position of the viewport in comparison to the page origin.
     */
    viewport_y: number;

    /**
    * The timestamp of when the window scroll location was logged.
    */
    created_at: number;
}