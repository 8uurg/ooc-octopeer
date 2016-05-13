/**
 * An interface which stores the basic user id tracking.
 */
export interface CurrentUserData {
    /**
     * The user's BitBucket id.
     */
    userId: string;

    /**
     * The repository the user is currently visiting.
     */
    repository: string;
}
