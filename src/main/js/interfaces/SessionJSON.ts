/**
 * Created by Cas on 6-5-2016.
 * This interface is used to define the JSON for a session accepted by the RESTFul API.
 */

interface SessionJSON {

    /**
     * The url of the bitbucket repository of the pull_request.
     */
    url: string;

    /**
     * The platform of the pull_request, bitbucket in this case.
     */
    platform: "bitbucket";

    /**
     * The link to the pull_request in the database.
     */
    pull_request: string;

    /**
     * The link to the userdata in the database.
     */
    user: string;
}