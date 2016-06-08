/// <reference path="../interfaces/DatabaseSchemes/VisibleElementJSON.ts" />

/**
 * This tracker was created for tracking all coordinates of visible elements on the webpage.
 * As these coordinates combined with mouse positions can give a lot of information.
 */
export class VisibleElementsTracker {
    private collector: TrackingCollector;

    /**
     * Register the VisibleElementsTracker.
     */
    public register() {
        const _this: VisibleElementsTracker = this;

        let prepareDom = function () {
            _this.modifyDom();
        };

        // Send initial dom on page load.
        _this.modifyDom();

        // Sends modified dom on change of the dom.
        document.addEventListener("change", prepareDom);
    }

    /**
     * This method goes through all elements of the dom to add new attributes to them.
     * Afterwards it sends the dom to the message handler.
     */
    private modifyDom() {
        let allDOMElements: NodeListOf<Element> = document.getElementsByTagName("*");

        for (let numberOfElements = 0; numberOfElements < allDOMElements.length; numberOfElements++) {
            let element: Element = allDOMElements.item(numberOfElements);
            this.setDataAttributesToElement(element);
        }
        this.sendData(this.createMessage(document.documentElement.outerHTML));
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
     * Add a collector to send the tracked data to.
     * @param collector The collector to send to.
     * @returns {VisibleElementsTracker}
     */
    public withCollector(collector: TrackingCollector): VisibleElementsTracker {
        this.collector = collector;
        return this;
    }

    /**
     * Creates a message using the VisibleElementJSON interface.
     * @param Dom  The modified dom with data elements added.
     * @returns {{Dom: string}}
     */
    public createMessage(Dom: string): VisibleElementJSON {
        return {
            dom: Dom,
            created_at: Date.now() / 1000
        };
    }

    /**
     * Sends data to the database.
     * @param veData   The VisibleElementJSON object.
     */
    private sendData(veData: VisibleElementJSON) {
        this.collector.sendMessage({
            table: "html-pages/",
            data: veData
        });
    }
}