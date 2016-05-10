/**
 * Created by larsstegman on 28-04-16.
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

export class UserIdTracker {

    /**
     * Constants that are used in the local storage for Octopeer.
     * @type {{user_id_key: string, current_repo_id_key: string}}
     */
    private static octopeer_constants = {
        "user_id_key": "octopeer_user_id",
        "current_repo_id_key": "octopeer_current_repo_id"
    };

    /**
     * Reads user data from attributes in a bitbucket repo page.
     * @param bodyAttributes The attributes in a body tag from a repo page.
     * @returns {CurrentUserData} The data about the user and the repo.
     */
    static readUserInformation(bodyAttributes: NamedNodeMap): CurrentUserData {
        if (!(bodyAttributes.hasOwnProperty("data-current-repo") && bodyAttributes.hasOwnProperty("data-current-user"))) {
            return undefined;
        }

        let currentRepositoryData: Repository = JSON.parse(bodyAttributes.getNamedItem("data-current-repo").value);
        let currentUserData: UserData = JSON.parse(bodyAttributes.getNamedItem("data-current-user").value);

        return {userId: currentUserData.displayName, repository: currentRepositoryData.fullslug};
    }

    /**
     * When the page has loaded the user information is loaded and stored.
     */
    // TODO: Send data to database
    read(doc: Document): void {
        let userInfo = UserIdTracker.readUserInformation(doc.getElementsByTagName("body")[0].attributes);
        console.log("The user " + userInfo.userId + " is in repository " + userInfo.repository);
    }
}

new UserIdTracker().read;