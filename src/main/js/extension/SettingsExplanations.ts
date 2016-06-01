/**
 * Created by larsstegman on 30-05-16.
 */

export class SettingsExplanations {

    private title = document.createElement("span");
    private explanations = [
        {
            "settingSelector": "mouse-position-setting-question", "title": "Mouse Position Tracking",
            "bodyText": [
                "Mouse position tracking tracks the position of your mouse on Bitbucket pages. The extension " +
                "tracks the X and Y coordinates of the mouse on your screen, and sends them to a database.",
                "You can see a demo of the data that is tracked below. Move that mouse!"
            ],
            "sampleData": () => {
                this.title.innerHTML = "Your cursor is currently here:";
                let xElement = document.createElement("div");
                let yElement = document.createElement("div");
                document.addEventListener("mousemove", (event) => {
                    xElement.innerHTML = "X coordinate: " + event.pageX;
                    yElement.innerHTML = "Y coordinate: " + event.pageY;
                });
                return [this.title, xElement, yElement];
            }
        },
        {
            "settingSelector": "mouse-click-setting-question", "title": "Mouse Click Tracking",
            "bodyText": [
                "Mouse click tracking tracks mouse clicks that occur on Bitbucket pages.",
                "Whenever a click occurs the timestamp and coordinates of the mouse click will be sent " +
                "to the database.",
                "You can see a demo of the data that is tracked below. Click here!"
            ],
            "sampleData": () => {
                this.title.innerHTML = "Your last mouse click was at:";
                let time = document.createElement("div");
                document.addEventListener("click", () => {
                    let date = new Date();
                    time.innerHTML = "Timestamp: " + date.getHours() + ":" + date.getMinutes() + ":" +
                        date.getSeconds();
                });
                return [this.title, time];
            }
        },
        {
            "settingSelector": "page-resolution-setting-question", "title": "Page Resolution Tracking",
            "bodyText": [
                "Page resolution tracking monitors the resolution of your browser. When the page resolution " +
                "changes, an update is sent and the resolution is stored in the database.",
                "You can see a demo of the data that is tracked below. Try resizing your browser!"
            ],
            "sampleData": () => {
                this.title.innerHTML = "Your page resolution is:";
                let width = document.createElement("div");
                let height = document.createElement("div");
                width.innerHTML = "Page width: " + window.innerWidth;
                height.innerHTML = "Page height: " + window.innerHeight;
                window.addEventListener("resize", (event) => {
                    width.innerHTML = "page width: " + window.innerWidth;
                    height.innerHTML = "Page height: " + window.innerHeight;
                });
                return [this.title, width, height];
            }
        },
        {
            "settingSelector": "keystroke-setting-question", "title": "Keystroke Tracking",
            "bodyText": [
                "Keystroke tracking tracks what keys you press when on Bitbucket pages. This includes " +
                "short keys and comments for instance. Whenever a key is pressed this data is stored " +
                "in the database.",
                "You can see a demo of the data that is tracked below. Try typing a bit!"
            ],
            "sampleData": () => {
                this.title.innerHTML = "The last keys you pressed are:";
                let keys = document.createElement("div");
                keys.innerHTML = " ";
                document.addEventListener("keypress", (event) => {
                    keys.innerHTML += String.fromCharCode(event.keyCode);
                    keys.innerHTML = keys.innerHTML.substring(keys.innerHTML.length - 50, keys.innerHTML.length);
                });
                return [this.title, keys];
            }
        }
        // {"settingSelector" : "", "title" : "", "bodyText" : ""}
    ];

    public configureExplanations() {

        this.title.className += " card-sub-title";


        document.addEventListener("DOMContentLoaded", () => {
            this.refreshPages();

            document.getElementById("hide-explanation-button").addEventListener("click", () => {
                document.getElementById("tracking-explanation").style.setProperty("display", "none");
            });

            this.explanations.forEach((explanation) => {
                document.getElementById(explanation.settingSelector).addEventListener("click", () => {
                        this.setCard(explanation);
                    });
            });
        });
    }

    private refreshPages() {
        document.getElementById("refresh-bitbucket-pages").addEventListener("click", () => {
            chrome.tabs.query({
                "url": [
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
    }

    private setCard(explanation: any) {
        this.setCardTitle(explanation.title);
        this.setCardContentText(explanation.bodyText);
        this.setCardSampleData(explanation.sampleData());
        document.getElementById("tracking-explanation").style.setProperty("display", "block");
    }

    private setCardTitle(title: string) {
        document.getElementById("card-title").innerHTML = title;
    }

    private setCardContentText(paragraphs: Array<any>) {
        document.getElementById("card-content-text").innerHTML = "";
        paragraphs.forEach((paragraph) => {
            let p = document.createElement("p");
            p.innerText = paragraph;
            document.getElementById("card-content-text").appendChild(p);
        });
    }

    private setCardSampleData(data: Array<any>) {
        document.getElementById("card-sample-data").innerHTML = "";
        data.forEach((dataElement) => {
            document.getElementById("card-sample-data")
                .appendChild(dataElement);
        });
    }
}
(new SettingsExplanations()).configureExplanations();
