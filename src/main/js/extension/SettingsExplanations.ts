/**
 * Created by larsstegman on 30-05-16.
 */

var explanations = [
    {"settingSelector" : "#mouse-position-setting", "title" : "Mouse Position Tracking",
        "bodyText" : "Mouse position tracking tracks the position of your mouse on certain pages."}
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