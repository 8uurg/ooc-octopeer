///<reference path="./interfaces/CurrentUserData.ts" />
/// <reference path="./interfaces/Repository.ts" />
/// <reference path="./interfaces/SessionDataGatherer.ts" />
/// <reference path="./interfaces/DatabaseSchemes/PullRequestJSON.ts" />
/// <reference path="./interfaces/DatabaseSchemes/RepositoryJSON.ts" />
/// <reference path="./interfaces/DatabaseSchemes/SessionJSON.ts" />
/// <reference path="./interfaces/DatabaseSchemes/UserJSON.ts" />

/**
 * This class tracks the user and repository data on BitBucket pages.
 */
export class BitBucketSessionDataGatherer implements SessionDataGatherer {

    private sessionData: SessionJSON;

    /**
     * Creating a BitBucketSessionDataGatherer object.
     */
    constructor() {
        let data = document.getElementsByTagName("body")[0].attributes;

        // Make sure we are on a pull request page.
        if (!(data.hasOwnProperty("data-current-pr") &&
              data.hasOwnProperty("data-current-repo") &&
              data.hasOwnProperty("data-current-user"))
           ) {
            this.sessionData = undefined;
            return;
        }

        this.createSession(data);
    }

    /**
     * This method creates a session for the user.
     * @param data   All the elements from the body of the document.
     */
    private createSession(data: NamedNodeMap): void {

        let pr: BitBucketPullRequest = JSON.parse(data.getNamedItem("data-current-pr").value);
        let repo: BitBucketRepository = JSON.parse(data.getNamedItem("data-current-repo").value);
        let user: BitBucketUser = JSON.parse(data.getNamedItem("data-current-user").value);

        this.sessionData = {
            pull_request: this.createPullRequest(pr, repo),
            user: this.createUser(user)
        };
    }

    /**
     * This method creates a pull-request object.
     * @param pr    The information about the current pull-request which the user is looking at.
     * @param repo  The information about the current repository which the user is using.
     * @returns {{repository: RepositoryJSON, pull_request_number: number}}
     */
    private createPullRequest(pr: BitBucketPullRequest, repo: BitBucketRepository): PullRequestJSON {
        let repository: RepositoryJSON = this.createRepository(repo);
        return {
            repository: repository,
            pull_request_number: pr.localId
        };
    }

    /**
     * This method creates a repository object.
     * @param repo  The information about the current repository which the user is using.
     * @returns {{owner: String, name: string, platform: string}}
     */
    private createRepository(repo: BitBucketRepository): RepositoryJSON {
        return {
            owner: repo.owner.username,
            name: repo.slug,
            platform: "bitbucket"
        };
    }

    /**
     * This method creates an user object.
     * @param user  The information about the current user.
     * @returns {{username: string}}
     */
    private createUser(user: BitBucketUser): UserJSON {
        return {
            username: user.username
        };
    }

    /**
     * Returns the Session Data for this page in database format.
     * @returns {SessionJSON}
     */
    public getSessionData(): SessionJSON {
        return this.sessionData;
    }

}

// Declare an alias for usage in main, for easy extension.
var DataGatherer = BitBucketSessionDataGatherer; // tslint:disable-line - Block Scope not allowed in global but required.

// Below are typings specifically used for bitbucket data extraction and convenience.
/**
 * BitBucket Pull Request data tag format.
 */
type BitBucketPullRequest = {
    localId: number;
    author: {
        username: string;
    }
};

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
};

/**
 * BitBucket User data tag format.
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
};