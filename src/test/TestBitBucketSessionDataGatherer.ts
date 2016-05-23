///<reference path="../../typings/index.d.ts" />
let MockBrowser = require("mock-browser").mocks.MockBrowser;
let browser: any = new MockBrowser();
document = browser.getDocument();

import {BitBucketSessionDataGatherer} from "../main/js/BitBucketSessionDataGatherer";

/**
 * A data sample for a pr.
 */
const samplePrData = {
   "localId": 71,
   "author": {
      "username": "breijm"
   }
}

/**
 * A data sample for a repo.
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

const sampleSessionData: SessionJSON = {
    pull_request: {
        repository: {
            owner: "Joe",
            name: "octopeer",
            platform: "bitbucket"
        },
        pull_request_number: 71
    },
    user: {
        username: "joesixpack"
    }
}

/**
 * Tests for user Id tracking.
 */
describe("BitBucketSessionDataGatherer", function () {

    beforeEach(function () {
        browser = new MockBrowser();
        browser.getDocument().createElement("body");
        document = browser.getDocument();
    });

    it("doesn't read data from non repository pages.", function () {
        let bbc = new BitBucketSessionDataGatherer();
        expect(bbc.getSessionData()).toBe(undefined);
    });

    it("doesn't read data from a repository page when a user is not logged in", function () {
        let body = <Element> document.getElementsByTagName("body")[0];
        body.setAttribute("data-current-repo", JSON.stringify(sampleRepoData));
        let bbc = new BitBucketSessionDataGatherer();
        expect(bbc.getSessionData()).toBe(undefined);
    });

    it("doesn't read data from a non pull request page.", function () {
        let body = <Element> document.getElementsByTagName("body")[0];
        body.setAttribute("data-current-repo", JSON.stringify(sampleRepoData));
        body.setAttribute("data-current-user", JSON.stringify(sampleUserData));
        let bbc = new BitBucketSessionDataGatherer();
        expect(bbc.getSessionData()).toBe(undefined);
    });

    it("reads data from a repository page when a user is logged in", function () {
        let body = <Element> document.getElementsByTagName("body")[0];
        body.setAttribute("data-current-pr", JSON.stringify(samplePrData));
        body.setAttribute("data-current-repo", JSON.stringify(sampleRepoData));
        body.setAttribute("data-current-user", JSON.stringify(sampleUserData));
        let bbc = new BitBucketSessionDataGatherer();
        expect(bbc.getSessionData()).toEqual(sampleSessionData);
    });
});