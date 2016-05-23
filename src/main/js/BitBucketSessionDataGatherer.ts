///<reference path="./interfaces/Message.ts" />
///<reference path="./interfaces/CurrentUserData.ts" />
/// <reference path="./interfaces/Repository.ts" />
/// <reference path="./interfaces/SessionDataGatherer.ts" />
/// <reference path="./interfaces/SessionJSON.ts" />

/**
 * This class tracks the user and repository data on BitBucket pages.
 */
export class BitBucketSessionDataGatherer implements SessionDataGatherer {

    private sessionData: SessionJSON;

    constructor() {
        let data = document.getElementsByTagName("body")[0].attributes;

        // Make sure we are on a pull request page.
        if (!(data.hasOwnProperty("data-current-pr") &&
              data.hasOwnProperty("data-current-repo") &&
              data.hasOwnProperty("data-current-user"))
           ) {
            return null;
        }

        let pr: BitBucketPullRequest = JSON.parse(data.getNamedItem("data-current-pr").value);
        let repo: BitBucketRepository = JSON.parse(data.getNamedItem("data-current-repo").value);
        let user: BitBucketUser = JSON.parse(data.getNamedItem("data-current-user").value);

        this.sessionData = {
            pull_request: {
                repository: {
                    owner: repo.owner.username,
                    name: repo.slug,
                    platform: "bitbucket"
                },
                pull_request_number: pr.localId
            },
            user: {
                username: user.username
            }
        };
    }

    /**
     * Returns the Session Data for this page in database format.
     */
    public getSessionData(): SessionJSON {
        return this.sessionData;
    }

}

// Declare an alias for usage in main, for easy extension.
var DataGatherer = BitBucketSessionDataGatherer; // tslint:disable-line - Block Scope not allowed in global but required.

// Below are typings specifically used for bitbucket data extraction and convinience.
/**
 * BitBucket Pull Request data tag format.
 */
type BitBucketPullRequest = {
    localId: number;
    author: {
        username: string;
    }
}

/**
 * BitBucket Repository data tag format.
 */
type BitBucketRepository = {
   "scm": "git",
   "readOnly": boolean,
   "mainbranch": {
      "name": string
   },
   "language": string,
   "owner": {
      "username": string,
      "isTeam": boolean
   },
   "fullslug": string,
   "slug": string,
   "id": number,
   "pygmentsLanguage": string
}

/**
 * BitBucket User data tag format 
 */
type BitBucketUser = {
   "username": string,
   "displayName": string,
   "uuid": string,
   "firstName": string,
   "avatarUrl": string,
   "lastName": string,
   "isTeam": boolean,
   "isSshEnabled": boolean,
   "isKbdShortcutsEnabled": boolean,
   "id": number,
   "isAuthenticated": boolean
}