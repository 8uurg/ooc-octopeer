/// <reference path="./SessionJSON.ts" />

/**
 * Created by Cas on 6-5-2016.
 * This interface is used to define the structure for a mouse position accepted by the RESTFul API.
 */

interface MousePosJSON {

    /**
     * The session object of the current pull request.
     */
    session?: SessionJSON;

    /**
     * The x position of the mouse cursor.
     */
    position_x: number;

    /**
     * The y position of the mouse cursor.
     */
    position_y: number;

    /**
     * The x position of the mouse cursor related with the viewport.
     */
    viewport_x: number;

    /**
     * The y position of the mouse cursor related with the viewport.
     */
    viewport_y: number;

    /**
    * The timestamp of when the mouse position was logged.
    */
    created_at: number;
}