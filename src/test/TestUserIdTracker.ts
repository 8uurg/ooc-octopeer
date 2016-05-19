///<reference path="../../typings/index.d.ts" />
let MockBrowser = require("mock-browser").mocks.MockBrowser;
declare var global: any;

let browser: any = new MockBrowser();
global.document = browser.getDocument();

import {UserIdTracker} from "../main/js/UserIdTracker";

/**
 * A data sample for a repo.
 * @type {{scm: string, readOnly: boolean, mainbranch: {name: string}, language: string,
 *          owner: {username: string, isTeam: boolean}, fullslug: string, slug: string, id: number,
 *          pygmentsLanguage: string}}
 */
const sampleRepoData = {
    "scm": "git",
    "readOnly": false,
    "mainbranch": {"name": "master"},
    "language": "javascript",
    "owner": {"username": "Joe", "isTeam": false},
    "fullslug": "joeysixpack/octopeer",
    "slug": "octopeer",
    "id": 12345678,
    "pygmentsLanguage": "javascript"
};

/**
 * A data sample for user data.
 * @type {{username: string, displayName: string, uuid: string, firstName: string, avatarUrl: string, lastName: string,
 *          isTeam: boolean, isSshEnabled: boolean, isKbdShortcutsEnabled: boolean, id: number,
 *          isAuthenticated: boolean}}
 */
const sampleUserData = {
    "username": "joesixpack",
    "displayName": "Joey Sax",
    "uuid": "{897}",
    "firstName": "Joey",
    "avatarUrl":
        "https://tctechcrunch2011.files.wordpress.com/2014/03/zap-the-bedhoppingest-characters-on-tv-from-do-017.jpeg",
    "lastName": "Tribbiani",
    "isTeam": false,
    "isSshEnabled": false,
    "isKbdShortcutsEnabled": true,
    "id": 1234567,
    "isAuthenticated": true
};

/**
 * Tests for user Id tracking.
 */
describe("UserIdTracker.ts tests", function () {

    beforeEach(function () {
        browser = new MockBrowser();
        browser.getDocument().createElement("body");
        global.document = browser.getDocument();
    });

    it("reads data from non repository pages.", function () {
        let attributes = document.getElementsByTagName("body")[0].attributes;
        expect((new UserIdTracker()).readUserInformation(attributes)).toBe(undefined);
    });

    it("reads data from a repository page when a user is not logged in", function () {
        let body = <Element> document.getElementsByTagName("body")[0];
        body.setAttribute("data-current-repo", JSON.stringify(sampleRepoData));
        let attributes = body.attributes;
        expect((new UserIdTracker()).readUserInformation(attributes)).toBe(undefined);
    });

    it("reads data from a repository page when a user is logged in", function () {
        let body = <Element> document.getElementsByTagName("body")[0];
        body.setAttribute("data-current-repo", JSON.stringify(sampleRepoData));
        body.setAttribute("data-current-user", JSON.stringify(sampleUserData));
        expect((new UserIdTracker()).readUserInformation(body.attributes)).toEqual({
            userId: sampleUserData.username,
            repository : sampleRepoData.fullslug
        });
    });
});