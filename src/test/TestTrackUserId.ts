///<reference path="../../typings/main.d.ts" />
import {UserIdTracker} from '../main/js/UserIdTracker';

let MockBrowser = require("mock-browser").mocks.MockBrowser;
declare var global: any;

let sampleRepoData = {
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

let sampleUserData = {
    "username": "joesixpack",
    "displayName": "Joey Sax",
    "uuid": "{897}",
    "firstName": "Joey",
    "avatarUrl": "https://tctechcrunch2011.files.wordpress.com/2014/03/zap-the-bedhoppingest-characters-on-tv-from-do-017.jpeg",
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
describe("UserIdTracker.ts tests", () => {

    var browser: any;
    beforeEach(() => {
        browser = new MockBrowser();
        browser.getDocument().createElement("body");
        global.document = browser.getDocument();
    });

    it("readUserData from non repository page", () => {
        var attributes = document.getElementsByTagName("body")[0].attributes;
        expect(UserIdTracker.readUserInformation(attributes)).toBe(undefined);
    });

    it("readUserData from a repository page when a user is not logged in", () => {
        var body = <Element> document.getElementsByTagName("body")[0];
        body.setAttribute('data-current-repo', String(sampleRepoData));
        var attributes = body.attributes;
        expect(UserIdTracker.readUserInformation(attributes)).toBe(undefined);
    });
});