/// <reference path="../../interfaces/DatabaseSchemes/DomJSON.ts" />
/// <reference path="./Tracker.d.ts" />

/**
 * This tracker was created for tracking all coordinates of visible elements on the webpage.
 * As these coordinates combined with mouse positions can give a lot of information.
 */
export class DomTracker extends Tracker {

    private mutationObserver: MutationObserver;
    private mutationObserverConfiguration: MutationObserverInit = {
        attributes: true,
        attributeFilter: ["data-octopeer-x", "data-octopeer-y", "data-octopeer-height", "data-octopeer-width",
            "data-octopeer-z"],
        childList: true,
        subtree: true
    };

    /**
     * Register the VisibleElementsTracker.
     */
    public register() {
        let registerChange = () => {
            this.mutationObserver.disconnect();
            this.modifyDom();
            this.sendData(this.createMessage(document.documentElement.outerHTML));
            this.connectObserver();
        };
        this.mutationObserver = new MutationObserver(registerChange);
        this.connectObserver();
        registerChange();
    }

    /**
     * Connect the mutation observer with the body.
     */
    private connectObserver() {
        if (this.mutationObserver === null) {
            return;
        }
        let body = document.getElementsByTagName("body")[0];
        this.mutationObserver.observe(body, this.mutationObserverConfiguration);
    }

    /**
     * This method goes through all elements of the body to add new attributes to them.
     * Afterwards it sends the dom to the message handler.
     */
    private modifyDom() {
        let elements: NodeListOf<Element> = document.querySelectorAll("body *");

        for (let i = 0; i < elements.length; i++) {
            let element: Element = elements.item(i);
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
}