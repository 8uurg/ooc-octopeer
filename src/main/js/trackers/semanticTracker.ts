/// <reference path="../interfaces/EventTypeJSON.ts" />
/// <reference path="../interfaces/ElementTypeJSON.ts" />
/// <reference path="../interfaces/Message.ts" />
/// <reference path="../interfaces/SemanticEnablingMapping.ts" />
/// <reference path="../interfaces/SemanticEventJSON.ts" />
/// <reference path="../interfaces/SemanticMapping.ts" />
/// <reference path="../interfaces/TrackingCollector.ts" />
declare var scrollMonitor: any;

/**
 * This file contains logic for registering semantic events.
 */

/**
 * Generate a semantic element.
 */
function semanticElement(name: string, descriptor: string, mapping: SemanticEnablingMapping,
                         id: number ): SemanticMapping {
    return {
        name: name,
        descriptor: descriptor,
        mapping: mapping,
        element_type_id: id
    };
}

/**
 * Implements semantic tracking
 * For given elements tracks specific events.
 */
export class SemanticTracker {

    private mappings: SemanticMapping[];
    private collector: TrackingCollector;
    private element_types_mapping: any = {1: "Merge Pull Request",
                                          2: "Close Pull Request",
                                          3: "Cancel inline comment",
                                          4: "Comment inline comment",
                                          5: "Inline Comment",
                                          9: "Edit comment",
                                         10: "Add reaction"
                                         };

    constructor() {
        const full: SemanticEnablingMapping = {
            keystroke: true,
            click: true,
            hover: true,
            scroll: true
        };

        // TODO: Create mappings outside of class and pass them in instead.
        this.mappings = [
            /* BUTTONS */
            semanticElement("merge_pr_button", "#fulfill-pullrequest", full, 1),
            semanticElement("close_pr_button", "#reject-pullrequest", full, 2),
            semanticElement("cancel_inline_comment_button", ".new-comment .aui-button-primary", full, 3),
            semanticElement("submit_inline_comment_button", ".new-comment .buttons a", full, 4),
            semanticElement("create_inline_comment_button", ".aui-iconfont-add-comment", full, 5),
            semanticElement("edit_comment_button", ".comment-actions .edit-link", full, 6),
            semanticElement("pr_comment_button", ".new-comment .buttons .aui-button-primary", full, 10),
            /* TABS - NOTICE: almost no overlap with GitHub. */
            semanticElement("commits_tab", "#pr-menu-commits", full, -1),
            semanticElement("overview_tab", "#pr-menu-diff", full, -1),
            semanticElement("activity_tab", "#pr-menu-activity", full, -1),
            /* TEXTFIELDS */
            semanticElement("comment_textfield", "#general-comments #id_new_comment", full, -1),
            semanticElement("inline_comment_textfield", ".comment-thread-container #id_new_comment", full, -1)
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
            let element = <HTMLElement> elements.item(id);
            if (sm.mapping.keystroke)       { this.registerKeystroke(sm.name, element); }
            if (sm.mapping.click)           { this.registerClick(sm.name, element, sm.element_type_id); }
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
    public registerClick(name: string, element: HTMLElement, element_type_id: number) {
        let _this = this;

        element.addEventListener("click", function() {
            _this.sendData(_this.createMessage(_this.createEventType(1, "Click"), element_type_id, 1));
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
    private createEventType(id: number, name: string): EventTypeJSON {
        return {
            id: id,
            name: name
        };
    }

    /**
     * This method creates an element-type object.
     * @param id    The ID of the element-type.
     * @param name  The name of the element-type
     * @returns {{id: number, name: string}}
     */
    private createElementType(id: number, name: string): ElementTypeJSON {
        return {
            id: id,
            name: name
        };
    }

    /**
     * Creates a message using the Keystroke interface.
     * @returns {KeystrokeJSON}
     */
    private createMessage(event_type: EventTypeJSON, element_type_id: number, duration: number): SemanticEventJSON {
        return {
            event_type: event_type,
            element_type: this.createElementType(element_type_id, this.element_types_mapping[element_type_id]),
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