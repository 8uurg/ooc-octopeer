/// <reference path="../interfaces/EventTypeJSON.ts" />
/// <reference path="../interfaces/ElementTypeJSON.ts" />
/// <reference path="../interfaces/Message.ts" />
/// <reference path="../interfaces/SemanticEnablingMapping.ts" />
/// <reference path="../interfaces/SemanticEventJSON.ts" />
/// <reference path="../interfaces/SemanticMapping.ts" />
/// <reference path="../interfaces/TrackingCollector.ts" />

/**
 * This file contains logic for registering semantic events.
 */

/**
 * Generate a semantic element.
 */
function semanticElement(name: string, descriptor: string, mapping: SemanticEnablingMapping): SemanticMapping {
    return {
        name: name,
        descriptor: descriptor,
        mapping: mapping,
    };
}

/**
 * Implements semantic tracking
 * For given elements tracks specific events.
 */
export class SemanticTracker {

    private mappings: SemanticMapping[];
    private collector: TrackingCollector;
    private element_types_mapping: any = {"Merge Pull Request": 1,
                                          "Close Pull Request": 2,
                                          "Cancel inline comment": 3,
                                          "Comment inline comment": 4,
                                          "Inline Comment": 5,
                                          "Edit comment": 9,
                                          "Add reaction": 10,
                                          "Comment textfield": 26,
                                          "Inline comment textfield": 27

                                         };
    private event_types_mapping: any = {"Keystroke": 1,
                                        "Click": 2,
                                        "Mouseenter": 3,
                                        "Mouseleave": 4,
                                        "Scroll into view": 5,
                                        "Scroll out of view": 6,
                                        "Start watching pull request": 7,
                                        "Stop watching pull request": 8
                                        };

    constructor() {
        const full: SemanticEnablingMapping = {
            keystroke: true,
            click: true,
            hover: true,
            scroll: true
        };

        // TODO: Create mappings outside of class and pass them in instead.
        // TODO: Alter the names of the elements, to the names they actually have for Tabs and Textfields.
        this.mappings = [
            /* BUTTONS */
            semanticElement("Merge Pull Request", "#fulfill-pullrequest", full),
            semanticElement("Close Pull Request", "#reject-pullrequest", full),
            semanticElement("Cancel inline comment", ".new-comment .aui-button-primary", full),
            semanticElement("Comment inline comment", ".new-comment .buttons a", full),
            semanticElement("Inline Comment", ".aui-iconfont-add-comment", full),
            semanticElement("Edit comment", ".comment-actions .edit-link", full),
            semanticElement("Add reaction", ".new-comment .buttons .aui-button-primary", full),
            /* TABS - NOTICE: almost no overlap with GitHub. */
            semanticElement("commits_tab", "#pr-menu-commits", full),
            semanticElement("overview_tab", "#pr-menu-diff", full),
            semanticElement("activity_tab", "#pr-menu-activity", full),
            /* TEXTFIELDS */
            semanticElement("Comment textfield", "#general-comments #id_new_comment", full),
            semanticElement("Inline comment textfield", ".comment-thread-container #id_new_comment", full)
        ];
    }

    /**
     * Set the collector for this tracker.
     * @param collector The collector to send the tracking data to.
     * @return Itself for daisy chaining.
     */
    public withCollector(collector: TrackingCollector): SemanticTracker {
        this.collector = collector;
        return this;
    }

    public register() {
        this.mappings.forEach((i) => {
           this.registerSemanticElement(i);
        });
    }

    private registerSemanticElement(sm: SemanticMapping) {
        let elements = document.querySelectorAll(sm.descriptor);
        for (let id = 0; id < elements.length; id++) {
            let element = <HTMLElement> elements[id];
            if (sm.mapping.keystroke)       { this.registerKeystroke(sm.name, element); }
            if (sm.mapping.click)           { this.registerClick(sm.name, element); }
            if (sm.mapping.hover)           { this.registerHover(sm.name, element); }
            if (sm.mapping.scroll)          { this.registerScroll(sm.name, element); }
        }
    }

    public registerKeystroke(name: string, element: HTMLElement) {

    }

    /**
     * This method adds an click-event-listener to an element.
     * @param name             The element name.
     * @param element          The element.
     * @param element_type_id  The type ID of the element.
     */
    public registerClick(name: string, element: HTMLElement) {
        let _this = this;

        element.addEventListener("click", function() {
            let event_type: EventTypeJSON = _this.createEventType("Click");
            let element_type: ElementTypeJSON = _this.createElementType(name);
            let message: SemanticEventJSON = _this.createMessage(event_type, element_type, 1);
            _this.sendData(message);
        });
    }

    public registerHover(name: string, element: HTMLElement) {

    }

    public registerScroll(name: string, element: HTMLElement) {

    }

    /**
     * This method creates an event-type object.
     * @param id    The ID of the event-type.
     * @param name  The name of the event-type.
     * @returns {{id: number, name: string}}
     */
    private createEventType(name: string): EventTypeJSON {
        return {
            id: this.event_types_mapping[name],
            name: name
        };
    }

    /**
     * This method creates an element-type object.
     * @param id    The ID of the element-type.
     * @param name  The name of the element-type
     * @returns {{id: number, name: string}}
     */
    private createElementType(name: string): ElementTypeJSON {
        return {
            id: this.element_types_mapping[name],
            name: name
        };
    }

    /**
     * Creates a message using the Keystroke interface.
     * @returns {KeystrokeJSON}
     */
    private createMessage(event_type: EventTypeJSON, element_type: ElementTypeJSON,
                          duration: number): SemanticEventJSON {
        return {
            event_type: event_type,
            element_type: element_type,
            created_at: Date.now() / 1000,
            duration: duration
        };
    }

    /**
     * Send data to the database
     */
    private sendData(seData: SemanticEventJSON) {
        this.collector.sendMessage({
            table: "semantic-events/",
            data: seData
        });
    }

}