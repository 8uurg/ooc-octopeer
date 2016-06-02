/// <reference path="./DatabaseSchemes/SessionJSON.ts" />

/**
 * Gathers session data from the page.
 */
interface SessionDataGatherer {

    /**
     * Gather the session data for the current page.
     */
    getSessionData(): SessionJSON;
}