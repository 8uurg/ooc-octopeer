/**
 * This is the interface for sending the screen resolution.
 */
interface WindowSize {

    /**
     * The timestamp of when this object is created.
     */
    created_at: number;

    /**
     * The width of the screen.
     */
    width: number;

    /**
     * The height of the screen.
     */
    height: number;

    /**
     * The session of the user.
     */
    session: string;
}