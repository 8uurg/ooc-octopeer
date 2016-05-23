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
    keyName: string;

    /**
     * The timestamp of when the keystroke was logged.
     */
    created_at: number;
}
