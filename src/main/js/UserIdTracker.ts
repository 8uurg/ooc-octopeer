import {CurrentUserData} from "./interfaces/CurrentUserData";

/**
 * This class tracks the user and repository data on BitBucket pages.
 */
export class UserIdTracker {

    /**
     * Reads user data from attributes in a bitbucket repo page.
     * @param   bodyAttributes The attributes in a body tag from a repo page.
     * @returns {CurrentUserData} The data about the user and the repo.
     */
    public readUserInformation(bodyAttributes: NamedNodeMap): CurrentUserData {
        if (!(bodyAttributes.hasOwnProperty("data-current-repo")
            && bodyAttributes.hasOwnProperty("data-current-user"))) {
            return undefined;
        }

        let currentRepositoryData: Repository = JSON.parse(bodyAttributes.getNamedItem("data-current-repo").value);
        let currentUserData: UserData = JSON.parse(bodyAttributes.getNamedItem("data-current-user").value);

        return {userId: currentUserData.displayName, repository: currentRepositoryData.fullslug};
    }

    /**
     * Registers the user and repository page data.
     * @param doc   The page document.
     */
    public log(): void {
        let data = this.readUserInformation(document.getElementsByTagName("body")[0].attributes);
        console.log("User id tracker: " + JSON.stringify(data));
        console.log("Logged user id");
    }
}