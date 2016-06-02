/// <reference path="./PullRequestJSON.ts" />
/// <reference path="./UserJSON.ts" />

/**
 * Created by Cas on 6-5-2016.
 * This interface is used to define the structure for a session accepted by the RESTFul API.
 */

interface SessionJSON {

    /**
     * The pull request object..
     */
    pull_request: PullRequestJSON;

    /**
     * The user object..
     */
    user: UserJSON;
}