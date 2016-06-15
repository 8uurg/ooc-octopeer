/// <reference path="../../interfaces/DatabaseSchemes/DomJSON.ts" />
/// <reference path="./Tracker.d.ts" />
/// <reference path="../../Main.d.ts" />
declare var OCTOPEER_CONSTANTS: any;

/**
 * This tracker was created for tracking all coordinates of visible elements on the webpage.
 * As these coordinates combined with mouse positions can give a lot of information.
 */
export class DomTracker extends Tracker {

    /**
     * Register the VisibleElementsTracker.
     */
    public register() {
        const _this: DomTracker = this;

        let sendModifiedDom = function () {
            _this.modifyDom();
            _this.sendData(_this.createMessage(document.documentElement.outerHTML));
        };

        // Send initial dom on page load.
        sendModifiedDom();

        // Sends modified dom on change of the dom.
        window.document.addEventListener("change", sendModifiedDom);
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
     * @param Dom  The modified dom with data elements added.
     * @returns {DomJSON}
     */
    public createMessage(Dom: string): DomJSON {
        return {
            dom: Dom,
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