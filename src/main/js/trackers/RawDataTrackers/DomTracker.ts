/// <reference path="../../interfaces/DatabaseSchemes/DomJSON.ts" />
/// <reference path="./Tracker.d.ts" />
/// <reference path="../../Main.d.ts" />
declare var OCTOPEER_CONSTANTS: any;

/**
 * Tracks the HTML page and assigns special meta-data to the elements.
 * This meta data contains information about the rendered positions of the elements.
 * If multiple mutation follows each other the tracking of data is delayed by certain interval.
 */
export class DomTracker extends Tracker {

    private mutationObserver: MutationObserver;
    private mutationObserverConfiguration: MutationObserverInit = {
        attributes: true,
        attributeFilter: ["role"],
        childList: true,
        subtree: true
    };
    private timer: any;

    public pageFullyLoaded  = false;

    /**
     * Register the VisibleElementsTracker.
     */
    public register() {
        let mutationFired = () => {
            clearInterval(this.timer);
            this.timer = setInterval(() => {
                this.collectData();
                clearInterval(this.timer);
            }, 700);
        };
        this.mutationObserver = new MutationObserver(mutationFired);

        window.addEventListener("load", () => {
            this.pageFullyLoaded = true;
            mutationFired();
        });
        window.addEventListener("resize", mutationFired);
    }

    /**
     * Triggers the collection and sending of data.
     */
    private collectData() {
        if (!this.pageFullyLoaded) {
            return;
        }
        console.log("Mutating DOM!");
        this.mutationObserver.disconnect();
        this.modifyDom();
        this.sendData(this.createMessage(document.documentElement.outerHTML));
        this.connectObserver();
    }

    /**
     * Connect the mutation observer with the body.
     */
    private connectObserver() {
        if (this.mutationObserver === null) {
            return;
        }
        this.mutationObserver.disconnect();
        this.mutationObserver.observe(document.body, this.mutationObserverConfiguration);
    }

    /**
     * This method goes through all elements of the body to add new attributes to them.
     * Afterwards it sends the dom to the message handler.
     */
    private modifyDom() {
        let elementsInBody: NodeListOf<Element> = document.querySelectorAll("body *");

        for (let i = 0; i < elementsInBody.length; i++) {
            let element: Element = elementsInBody.item(i);
            this.setDataAttributesToElement(element);
        }
    }

    /**
     * This method adds data attributes to an element.
     * @param element   The element the data attributes should be added to.
     */
    private setDataAttributesToElement(element: Element) {
        let elementCoords: ClientRect = element.getBoundingClientRect();
        let elementStyle: CSSStyleDeclaration = window.document.defaultView.getComputedStyle(element);

        element.setAttribute("data-octopeer-x",         (elementCoords.left + window.scrollX).toString());
        element.setAttribute("data-octopeer-y",         (elementCoords.top + window.scrollY).toString());
        element.setAttribute("data-octopeer-width",     elementCoords.width.toString());
        element.setAttribute("data-octopeer-height",    elementCoords.height.toString());

        if (elementStyle.getPropertyValue("z-index") !== "" &&
            elementStyle.getPropertyValue("z-index") !== "auto") {
            element.setAttribute("data-octopeer-z", elementStyle.getPropertyValue("z-index"));
        }
    }

    /**
     * Creates a message using the VisibleElementJSON interface.
     * @param dom  The modified dom with data elements added.
     * @returns {DomJSON}
     */
    public createMessage(dom: string): DomJSON {
        return {
            dom: dom,
            created_at: Date.now() / 1000
        };
    }

    /**
     * Sends data to the database.
     * @param dData   The DomJSON object.
     */
    private sendData(dData: DomJSON) {
        this.sendMessage({
            table: "html-pages/",
            data: dData
        });
    }

    /**
     * Changes the tracker configuration.
     * @param conf The configuration for the DOM tracker.
     */
    public changeTrackerConfiguration(conf: MutationObserverInit) {
        this.mutationObserverConfiguration = conf;
        this.connectObserver();
    }
}

main.declareTracker({
    tracker: (collector) => {
        return (new DomTracker())
            .withCollector(collector)
            .register();
    },
    setting: {
        name: OCTOPEER_CONSTANTS.track_dom,
        def: true
    }
});