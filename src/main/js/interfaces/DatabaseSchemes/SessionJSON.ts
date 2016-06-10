/// <reference path="./PullRequestJSON.ts" />
/// <reference path="./UserJSON.ts" />

/**
 * This interface is used to define the structure for a session accepted by the RESTFul API.
 */

interface SessionJSON {

    /**
     * The pull request object.
     */
    pull_request: PullRequestJSON;

    /**
     * The user object.
     */
    user: UserJSON;
}