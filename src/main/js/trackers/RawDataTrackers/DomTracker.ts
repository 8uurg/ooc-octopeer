/// <reference path="../../interfaces/DatabaseSchemes/DomJSON.ts" />
/// <reference path="./Tracker.d.ts" />

/**
 * This tracker was created for tracking all coordinates of visible elements on the webpage.
 * As these coordinates combined with mouse positions can give a lot of information.
 */
export class DomTracker extends Tracker {

    private mObserver: MutationObserver;
    private mConfig: Object;

    /**
     * Register the VisibleElementsTracker.
     */
    public register() {
        this.createObserver();
        this.setObserverConfiguration(true, false, false);
        this.setObserverToAllElements();
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
        this.setObserverToAllElements();
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
     *
     * @returns {MutationObserver}
     */
    private createObserver(): void {
        const _this: DomTracker = this;

        this.mObserver =  new MutationObserver(function() {
            _this.modifyDom();
        });
    }

    /**
     *
     * @param attributes
     * @param childList
     * @param characterData
     * @returns {{attributes: boolean, childList: boolean, characterData: boolean}}
     */
    public setObserverConfiguration(attributes: boolean, childList: boolean, characterData: boolean): void {
        this.mConfig = {
            attributes:         attributes,
            attributeFilter:    ["id", "class", "src"],
            characterData:      characterData,
            childList:          childList,
        };
    }

    /**
     * 
     */
    private setObserverToAllElements() {
        let allElements = document.getElementsByTagName("*");

        for (let iNumberOfElement = 0; iNumberOfElement < allElements.length; iNumberOfElement++) {
            this.mObserver.observe(allElements.item(iNumberOfElement), this.mConfig);
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