/// <reference path="./RepositoryJSON.ts" />

/**
 * This interface is used to define the structure of a pull request in the RESTful API.
 */
interface PullRequestJSON {

    /**
     * The repository object this pull request affects.
     */
    repository: RepositoryJSON;

    /**
     * The number of this pull request.
     */
    pull_request_number: number;
}