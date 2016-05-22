/**
 * This interface is used to define the structure for keystrokes accepted by the RESTFul API.
 */

interface KeystrokeJSON {
    /**
     * The timestamp of when the keystroke was logged.
     */
    created_at: number;

    /**
     * The key name of the keystroke that was logged.
     */
    keyName: string;

    /**
     * The link to the session of the PR of this user.
     */
    session: string;
}
