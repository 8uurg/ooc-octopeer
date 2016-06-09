let nop: () => HTMLElement[] = () => {
    let emptyArray = <HTMLElement[]> [];
    return emptyArray;
};

/**
 * Configures the explanations on the settings page of Octopeer.
 */
export class SettingsExplanations {

    /**
     * The title for the explanations.
     * @type {HTMLElement}
     */
    private title = document.createElement("span");

    /**
     * The explanations for trackers.
     * We need a selector for the activation button
     * A title
     * An array of explanation text, one element per paragraph
     * and a closure which generates demo elements, this can be an empty array.
     */
    private explanations: { settingSelector: string, title: string,
            bodyText: string[], sampleData: () => HTMLElement[] }[] = [
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
                    time.innerHTML = "Timestamp: " + this.timeFormatter(date.getHours()) +
                        ":" + this.timeFormatter(date.getMinutes()) + ":" + this.timeFormatter(date.getSeconds());
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
                window.addEventListener("resize", () => {
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
        },
        {
            "settingSelector": "scroll-setting-question", "title": "Scroll Tracking",
            "bodyText": [
                "The scroll tracker tracks x and y position of the visible portion of web pages on Bitbucket pull " +
                "requests. This information is used to identify what is visible on your screen and what is not."
            ],
            "sampleData": nop
        },
        {
            "settingSelector": "dom-setting-question", "title": "DOM Element Tracking",
            "bodyText": [
                "The DOM element tracker tracks all HTML elements on Bitbucket. The x and y coordinates of each " +
                "element are tracked, along with the width and height. This way elements can be tied to other " +
                "events such as mouse clicks on a certain position."
            ],
            "sampleData": nop
        },
        {
            "settingSelector": "semantic-position-setting-question", "title": "Semantic Position Tracking",
            "bodyText": [
                "The semantic position tracker tracks the position of your mouse in relation to elements on " +
                "Bitbucket web pages. Events are triggered when the mouse enters or leaves HTML elements on the page."
            ],
            "sampleData": nop
        },
        {
            "settingSelector": "semantic-clicks-setting-question", "title": "Semantic Clicks Tracking",
            "bodyText": [
                "The semantic click tracker tracks the mouse clicks in relation to elements  that are clicked on " +
                "Bitbucket web pages. When a mouse click occurs, the specific element that is clicked is also stored."
            ],
            "sampleData": nop
        },
        {
            "settingSelector": "semantic-keystrokes-setting-question", "title": "Semantic Keystrokes Tracking",
            "bodyText": [
                "The semantic keystroke tracker tracks the keystrokes in relation to elements on " +
                "Bitbucket web pages. When you use your keyboard, the field where the text is being typed in " +
                    "(for instance a comment box) is stored as well."
            ],
            "sampleData": nop
        },
        {
            "settingSelector": "semantic-scrolling-setting-question", "title": "Semantic Scrolling Tracking",
            "bodyText": [
                "The semantic scrolling tracker tracks how far you've scrolled down on Bitbucket web pages." +
                "This way it is possible to deduce which elements on the web page are in view at any given time."
            ],
            "sampleData": nop
        },
        {
            "settingSelector": "semantic-visibility-setting-question", "title": "Semantic PR Page Visibility Tracking",
            "bodyText": [
                "The semantic PR page visibility tracker tracks whether a Bitbucket PR tab is active or not."
            ],
            "sampleData": nop
        }
    ];

    /**
     * This function will prepend a 0 to count values below 10. This way the time will always be formatted neatly.
     * @param count The hour, minute or second count
     * @returns a toString() of the count
     */
    private timeFormatter(count: number) {
        if (count < 10) {
            return ("0" + count.toString());
        }
        return count.toString();
    }

    /**
     * Sets the notification contents and add event listeners to them.
     */
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

    /**
     * Makes the refresh button functional.
     */
    private refreshPages() {
        document.getElementById("refresh-bitbucket-pages").addEventListener("click", () => {
            chrome.tabs.query({
                "url": [
                    "http://bitbucket.org/*",
                    "https://bitbucket.org/*"
                ]
            }, (tabs: chrome.tabs.Tab[]) => {
                tabs.forEach((tab) => {
                    chrome.tabs.reload(tab.id);
                });
                document.getElementById("refresh-pages-notification").style.setProperty("display", "none");
            });
        });
    }

    /**
     * Sets the contents for an explanation card.
     * @param explanation The data for on the card.
     */
    private setCard(explanation: {settingSelector: string, title: string, bodyText: string[],
            sampleData: () => HTMLElement[]}) {
        document.getElementById("card-title").innerHTML = explanation.title;
        this.setCardContentText(explanation.bodyText);
        this.setCardSampleData(explanation.sampleData());
        document.getElementById("tracking-explanation").style.setProperty("display", "block");
    }

    /**
     * Sets the explanation text on the card.
     * @param paragraphs The paragraphs for the explanation text.
     */
    private setCardContentText(paragraphs: string[]) {
        document.getElementById("card-content-text").innerHTML = "";
        paragraphs.forEach((paragraph) => {
            let p = document.createElement("p");
            p.innerText = paragraph;
            document.getElementById("card-content-text").appendChild(p);
        });
    }

    /**
     * Sets the sample data on the card.
     * @param data The HTMLElements for on the card.
     */
    private setCardSampleData(data: HTMLElement[]) {
        document.getElementById("card-sample-data").innerHTML = "";
        data.forEach((dataElement) => {
            document.getElementById("card-sample-data")
                .appendChild(dataElement);
        });
    }
}
(new SettingsExplanations()).configureExplanations();
