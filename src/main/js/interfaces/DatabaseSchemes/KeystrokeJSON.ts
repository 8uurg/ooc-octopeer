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
     * The timestamp of key down.
     */
    key_down_at?: number;

    /**
     * The timestamp of key up.
     */
    key_up_at?: number;
}
