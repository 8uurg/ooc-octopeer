/// <reference path="./SessionJSON.ts" />

/**
 * Created by Cas on 23-5-2016.
 * This interface is used to define the structure of the window resolution in the RESTful API.
 */

interface WindowResolutionJSON {

    /**
     * The session object of the current pull request.
     */
    session?: SessionJSON;

    /**
     * The width of the screen.
     */
    width: number;

    /**
     * The height of the screen.
     */
    height: number;

    /**
     * The timestamp of when this object is created.
     */
    created_at: number;

}