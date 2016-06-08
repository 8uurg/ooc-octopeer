/// <reference path="./SessionJSON.ts" />

/**
 * This interface is used to define the structure for keystrokes accepted by the RESTFul API.
 */

interface KeystrokeJSON {

    /**
     * The session object of the current pull request.
     */
    session?: SessionJSON;

    /**
     * The key name of the keystroke that was logged.
     */
    keystroke: string;

    /**
     * The timestamp of when the keystroke was logged.
     */
    created_at: number;

    /**
     * The type of the keystroke.
     */
    keystroke_type: number;
}
