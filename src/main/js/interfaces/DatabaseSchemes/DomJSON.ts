/// <reference path="./SessionJSON.ts" />

/**
 * This interface is used to define the structure of an html-page in the RESTful API.
 */
interface DomJSON {

    /**
     * The session object of the current pull request.
     */
    session?: SessionJSON;

    /**
     * The DOM of the html page.
     */
    dom: string;

    /**
     * The time of the creation of the DOM snap-shot.
     */
    created_at: number;
}