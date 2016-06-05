/**
 * This tracker was created for tracking all coordinates of visible elements on the webpage.
 * As these coordinates combined with mouse positions can give a lot of information.
 */

export class VisibleElementsTracker {
    private collector: TrackingCollector;

    private mapping_of_element_types: string[] = 
        new Array("LI",
                                             "A",
                                             "BUTTON",
                                             "INPUT",
                                             "IMG",
                                             "DT",
                                             "DD",
                                             "PRE",
                                             "SPAN",
                                             "H1");

    /**
     *
     */
    public register() {
        let _this: VisibleElementsTracker = this;

        let allDOMElements = document.getElementsByTagName("*");

        for(let i = 0; i < allDOMElements.length; i++) {
            let element: Element = allDOMElements.item(i);
            if(this.mapping_of_element_types.indexOf(element.nodeName) !== -1) {
                let elementCoords = element.getBoundingClientRect();
                let elementWidth: number = elementCoords.width;
                let elementHeight: number = elementCoords.height;
                let elementLeft: number = elementCoords.left;
                let elementRight: number = elementCoords.right;
                let elementTop: number = elementCoords.top;
                let elementBottom: number = elementCoords.bottom;
                console.log(element);
                console.log("Width: " + elementWidth);
                console.log("Height: " + elementHeight);
                console.log("Left: " + elementLeft);
                console.log("Right: " + elementRight);
                console.log("Top: " + elementTop);
                console.log("Bottom: " + elementBottom);
            }
        }
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
     *
     */
    public createMessage() {

    }

    /**
     *
     */
    private sendData() {

    }
}
