/**
 * Created by larsstegman on 28-04-16.
 * This interface is used to convert JSON Objects which contain user information, to a definite type.
 */
interface UserData {
    
    /**
     * The user avatar url.
     */
    avatarUrl: string;

    /**
     * The display name of the user.
     */
    displayName: string;

    /**
     * The user bitbucket id.
     */
    id: number;

    /**
     * The bitbucket username.
     */
    username: string;

    /**
     * Whether the user is logged in.
     */
    isAuthenticated: boolean;
}