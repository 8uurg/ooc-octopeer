/**
 * Created by larsstegman on 28-04-16.
 */

let octopeer_constants = {
    "user_id_key" : "octopeer_user_id",
    "current_repo_id_key" : "octopeer_current_repo_id"
};

logUserInformation(document);

function logUserInformation(page: Document) {

    let bodyAttributes = page.getElementsByTagName("body")[0].attributes;

    if(bodyAttributes.getNamedItem("data-current-repo") == null) {
        console.warn("Octopeer:\t", "Not in a repo, not logging.");
        return;
    }

    let currentRepositoryData: Repository = JSON.parse(bodyAttributes.getNamedItem("data-current-repo").value);
    let currentUserData: UserData  = JSON.parse(bodyAttributes.getNamedItem("data-current-user").value);
    window.localStorage.setItem(octopeer_constants.user_id_key, String(currentUserData.id));
    window.localStorage.setItem(octopeer_constants.current_repo_id_key, String(currentRepositoryData.id));
    
    console.log("The current user is: " + currentUserData.displayName + " and he/she is in repo: " + currentRepositoryData.fullslug);
}

