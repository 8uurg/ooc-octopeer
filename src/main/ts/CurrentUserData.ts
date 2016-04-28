/**
 * Created by larsstegman on 28-04-16.
 * This interface is used to convert JSON Objects which contain user information, to a definite type.
 */
interface UserData {
    avatarUrl: string;
    displayName: string;
    id: number;
    username: string;
    isAuthenticated: boolean;
}