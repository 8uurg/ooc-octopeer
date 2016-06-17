///<reference path="../interfaces/UIExplanation.ts" />

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
    private explanations: UIExplanation[] = [
        {
            "settingSelector": "mouse-position-setting-question", "title": "Mouse Position Tracking",
            "bodyText": [
                "On Bitbucket pull-request page the X and Y coordinates of the mouse on your screen in " +
                "combination with the X and Y coordinates relative to the viewport of the page are tracked. " +
                "Both of them are send to the database.",
                "You can see a demo of the data that is tracked below. Move that mouse!"
            ],
            "sampleData": () => {
                this.title.innerHTML = "Your cursor is currently here:";
                let xElement = document.createElement("div");
                let yElement = document.createElement("div");
                let xViewport = document.createElement("div");
                let yViewport = document.createElement("div");
                document.addEventListener("mousemove", (event) => {
                    xElement.innerHTML = "X coordinate: " + event.pageX;
                    yElement.innerHTML = "Y coordinate: " + event.pageY;
                    xViewport.innerHTML = "X viewport: " + event.clientX;
                    yViewport.innerHTML = "Y viewport: " + event.clientY;
                });
                return [this.title, xElement, yElement, xViewport, yViewport];
            }
        },
        {
            "settingSelector": "mouse-click-setting-question", "title": "Mouse Click Tracking",
            "bodyText": [
                "On Bitbucket pull-request pages the mouse clicks are being tracked." +
                "Whenever a click occurs the timestamp in combination with the X and Y coordinates of where the " +
                "mouse click occurred on your screen are send to the database.",
                "You can see a demo of the data that is tracked below. Click here!"
            ],
            "sampleData": () => {
                this.title.innerHTML = "Your last mouse click was at:";
                let time = document.createElement("div");
                let xElement = document.createElement("div");
                let yElement = document.createElement("div");
                document.addEventListener("click", (event) => {
                    let date = new Date();
                    time.innerHTML = "Timestamp: " + this.timeFormatter(date.getHours()) +
                        ":" + this.timeFormatter(date.getMinutes()) + ":" + this.timeFormatter(date.getSeconds());
                    xElement.innerHTML = "X coordinate: " + event.pageX;
                    yElement.innerHTML = "Y coordinate: " + event.pageY;
                });
                return [this.title, time, xElement, yElement];
            }
        },
        {
            "settingSelector": "page-resolution-setting-question", "title": "Page Resolution Tracking",
            "bodyText": [
                "On Bitbucket pull-request pages the resolution of your webbrowser is being monitored. " +
                "When the resolution changes, the new resolution is send to the database.",
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
                "On Bitbucket pull-request pages all keypresses are being tracked. This includes " +
                "short keys and comments for instance. Whenever a key is pressed this data is send to " +
                "the database.",
                "You can see a demo of the data that is tracked below. Try typing a bit!"
            ],
            "sampleData": () => {
                this.title.innerHTML = "The last keys you pressed are:";
                let keys = document.createElement("div");
                keys.innerHTML = " ";
                document.addEventListener("keypress", (event) => {
                    keys.innerHTML += String.fromCharCode(event.keyCode);
                    keys.innerHTML = keys.innerHTML.substring(keys.innerHTML.length - 20, keys.innerHTML.length);
                });
                return [this.title, keys];
            }
        },
        {
            "settingSelector": "scroll-setting-question", "title": "Scroll Tracking",
            "bodyText": [
                "On Bitbucket pull-request pages the scroll. " +
                "This information is used to identify what is visible on your screen and what is not."
            ],
            "sampleData": () => {
                this.title.innerHTML = "Your current scroll coordinates are:";
                let xScroll = document.createElement("div");
                let yScroll = document.createElement("div");
                xScroll.innerHTML = "X scroll coordinate: " + window.scrollX;
                yScroll.innerHTML = "Y scroll coordinate: " + window.scrollY;
                window.addEventListener("scroll", () => {
                    xScroll.innerHTML = "X scroll coordinate: " + window.scrollX;
                    yScroll.innerHTML = "Y scroll coordinate: " + window.scrollY;
                });
                return [this.title, xScroll, yScroll];
            }
        },
        {
            "settingSelector": "dom-setting-question", "title": "DOM Element Tracking",
            "bodyText": [
                "On Bitbucket pull-request pages the entire DOM is tracked. The DOM consists of all HTML elements " +
                "on the webpage. For each element, the X and Y coordinates together with the width and the height " +
                "are added as data-tags. Afterwards, the entire DOM is send to the database."
            ],
            "sampleData": nop
        },
        {
            "settingSelector": "semantic-hover-setting-question", "title": "Semantic Hover Tracking",
            "bodyText": [
                "On Bitbucket pull-request pages the position of your mouse in relation to elements on " +
                "Bitbucket webpages is tracked. An event is triggered when the mouse enters or leaves a monitored " +
                "HTML element on the webpage. Afterwards, a predefined event and element type together with the " +
                "timestamp are send to the database."
            ],
            "sampleData": nop
        },
        {
            "settingSelector": "semantic-clicks-setting-question", "title": "Semantic Clicks Tracking",
            "bodyText": [
                "On Bitbucket pull-request pages the clicks of your mouse in relation to elements on " +
                "Bitbucket webpages are tracked. An event is triggered when the mouse clicks a monitored HTML " +
                "element on the webpage. Afterwards, a predefined event and element type together with the " +
                "timestamp are send to the database."
            ],
            "sampleData": nop
        },
        {
            "settingSelector": "semantic-keystrokes-setting-question", "title": "Semantic Keystrokes Tracking",
            "bodyText": [
                "On Bitbucket pull-request pages the keypresses in relation to elements on Bitbucket webpages are " +
                "tracked. An event is triggered when a keypress is made in a monitored HTML element on the webpage " +
                "(for instance a comment box). Afterwards, a predefined event and element type together with the " +
                "timestamp are send to the database."
            ],
            "sampleData": nop
        },
        {
            "settingSelector": "semantic-scrolling-setting-question", "title": "Semantic Scrolling Tracking",
            "bodyText": [
                ""
            ],
            "sampleData": nop
        },
        {
            "settingSelector": "semantic-visibility-setting-question", "title": "Semantic PR Page Visibility Tracking",
            "bodyText": [
                "On Bitbucket pull-request pages the visibility of the tab is being tracked. When the pull-request " +
                "tab becomes (in)visible that is stored in the database."
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
            this.setupPageRefreshButton();

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
    private setupPageRefreshButton() {
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
    private setCard(explanation: UIExplanation) {
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
