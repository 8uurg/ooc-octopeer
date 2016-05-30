/**
 * Created by larsstegman on 30-05-16.
 */

var explanations = [ // tslint:disable-line A var is required in global code.
    {"settingSelector" : "#mouse-position-setting", "title" : "Mouse Position Tracking",
        "bodyText" : "Mouse position tracking tracks the position of your mouse on Bitbucket pages. " +
        "The extension tracks the X and Y coordinates of the mouse on your screen, and sends them to a database."},
    {"settingSelector" : "#mouse-click-setting", "title" : "Mouse Click Tracking",
        "bodyText" : "Mouse click tracking tracks mouse clicks that occur on Bitbucket pages." +
        "Whenever a click occurs the timestamp and coordinates of the mouse click are sent to the database. "},
    {"settingSelector" : "#page-resolution-setting", "title" : "Page Resolution Tracking",
        "bodyText" : "Page resolution tracking monitors the resolution of your browser. When the screen resolution " +
        "changes, an update is sent and the data is stored in the database."},
    {"settingSelector" : "#keystroke-setting", "title" : "Keystroke Tracking",
        "bodyText" : "Keystroke tracking tracks what keys you press when on Bitbucket pages. This includes " +
        "short keys and comments for instance. Whenever a key is pressed this data is stored in the database."}
    // {"settingSelector" : "", "title" : "", "bodyText" : ""}
];

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("refresh-bitbucket-pages").addEventListener("click", () => {
        chrome.tabs.query({
            "url" : [
                "http://bitbucket.org/*",
                "https://bitbucket.org/*"
            ]
        }, (tabs: [chrome.tabs.Tab]) => {
            tabs.forEach((tab) => {
                chrome.tabs.reload(tab.id);
            });
            document.getElementById("refresh-pages-notification").style.setProperty("display", "none");
        });
    });

    document.getElementById("hide-explanation-button").addEventListener("click", () => {
        document.getElementById("tracking-explanation").style.setProperty("display", "none");
    });

    explanations.forEach((explanation) => {
        document.querySelector(explanation.settingSelector + " .explain-tracking-button")
                .addEventListener("click", () => {
            document.querySelector("#tracking-explanation .card-content .card-title").innerHTML = explanation.title;
            document.querySelector("#tracking-explanation .card-content .card-content-text").innerHTML =
                "<p>" + explanation.bodyText + "</p>";
            document.getElementById("tracking-explanation").style.setProperty("display", "inherit");
        });
    });
});