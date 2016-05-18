/**
 * Created by Thomas on 17-5-2016.
 * This interface is used to define the structure for a mouse click accepted by the RESTFul API.
 */

interface MouseClickJSON {

    /**
     * The timestamp of when the mouse position was logged.
     */
    created_at: Date;

    /**
     * The link to the current session of the PR of this user.
     */
    session: string;
}