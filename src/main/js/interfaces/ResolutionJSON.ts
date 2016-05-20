/**
 * This interface is used to define the structure for resolutions accepted by the RESTFul API.
 */

interface ResolutionJSON {

    /**
     * The timestamp of when the keystroke was logged.
     */
    created_at: Date;

    /**
     * The width of the window resolution.
     */
    width: Number;

    /**
     * The height of the window resolution.
     */
    height: Number;

    /**
     * The link to the session of the PR of this user.
     */
    session: string;
}
