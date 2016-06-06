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
        let allDOMElements: NodeListOf<Element> = document.getElementsByTagName("*");

        for (let i = 0; i < allDOMElements.length; i++) {
            let element: Element = allDOMElements.item(i);
            let elementCoords: ClientRect = element.getBoundingClientRect();
            let elementStyle: CSSStyleDeclaration = window.document.defaultView.getComputedStyle(element);
            element.setAttribute("data-octopeer-x",         (elementCoords.left + window.scrollX).toString());
            element.setAttribute("data-octopeer-y",         (elementCoords.top + window.scrollY).toString());
            element.setAttribute("data-octopeer-width",     elementCoords.width.toString());
            element.setAttribute("data-octopeer-height",    elementCoords.height.toString());
            if (elementStyle.getPropertyValue("z-index") !== "") {
                element.setAttribute("data-octopeer-z", elementStyle.getPropertyValue("z-index"));
            }
        }

        this.sendData(this.createMessage(allDOMElements));
    }

    /**
     * Add a collector to send the tracked data to.
     * @param collector The collector to send to.
     * @returns {KeystrokeTracker}
     */
    public withCollector(collector: TrackingCollector): VisibleElementsTracker {
        this.collector = collector;
        return this;
    }

    /**
     * Creates a message using the VisibleElementJSON interface.
     * @param Dom  The modified dom with data elements added.
     * @returns {{Dom: NodeListOf<Element>, created_at: number}}
     */
    public createMessage(Dom: NodeListOf<Element>): VisibleElementJSON {
        return {
            Dom: Dom,
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