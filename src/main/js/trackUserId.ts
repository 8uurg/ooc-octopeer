/**
 * Created by larsstegman on 28-04-16.
 */

/**
 * Constants that are used in the local storage for Octopeer.
 * @type {{user_id_key: string, current_repo_id_key: string}}
 */
let octopeer_constants = {
    "user_id_key" : "octopeer_user_id",
    "current_repo_id_key" : "octopeer_current_repo_id"
};

interface CurrentUserData {
    /**
     * The user's BitBucket id.
     */
    userId: string;

    /**
     * The repository the user is currently visiting.
     */
    repository: string;
}

//TODO: Send data to database
function readUserInformation(bodyAttributes: NamedNodeMap) : CurrentUserData {
    if(bodyAttributes.getNamedItem("data-current-repo") == null) {
        return;
    }

    let currentRepositoryData: Repository = JSON.parse(bodyAttributes.getNamedItem("data-current-repo").value);
    let currentUserData: UserData = JSON.parse(bodyAttributes.getNamedItem("data-current-user").value);

    return {userId: currentUserData.displayName, repository: currentRepositoryData.fullslug};
}

/**
 * When the page has loaded the user information is loaded and stored.
 */
let userInfo = readUserInformation(document.getElementsByTagName("body")[0].attributes);
console.log("The user " + userInfo.userId + " is in repository " + userInfo.repository);
window.localStorage.setItem(octopeer_constants.current_repo_id_key, String(userInfo.repository));
window.localStorage.setItem(octopeer_constants.user_id_key, String(userInfo.userId));

