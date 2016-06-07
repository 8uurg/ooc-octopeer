/// <reference path="../interfaces/Message.ts" />
/// <reference path="../interfaces/SemanticEnablingMapping.ts" />
/// <reference path="../interfaces/DatabaseSchemes/SemanticEventJSON.ts" />
/// <reference path="../interfaces/SemanticMapping.ts" />
/// <reference path="../interfaces/TrackingCollector.ts" />

/**
 * This file contains logic for registering semantic events.
 */

/**
 * Generate a semantic element.
 * @param name         The name of the element.
 * @param descriptor   The descriptors of the element.
 * @param mapping      The mapping of which trackers should be registered.
 * @returns {{name: string, descriptor: string, mapping: SemanticEnablingMapping}}
 */
function createSemanticElement(name: string, descriptor: string, mapping: SemanticEnablingMapping): SemanticMapping {
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
    private element_types_mapping: any = {"Merge Pull Request":        101,
                                          "Close Pull Request":        102,
                                          "Cancel inline comment":     103,
                                          "Comment inline comment":    104,
                                          "Inline Comment":            105,
                                          "Edit comment":              109,
                                          "Add reaction":              110,
                                          "Comment textfield":         501,
                                          "Inline comment textfield":  502

                                         };
    private event_types_mapping: any = {"Keystroke":                   101,
                                        "Click":                       201,
                                        "Mouseenter":                  202,
                                        "Mouseleave":                  203,
                                        "Scroll into view":            301,
                                        "Scroll out of view":          302,
                                        "Start watching pull request": 401,
                                        "Stop watching pull request":  402
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
            createSemanticElement("Merge Pull Request", "#fulfill-pullrequest", full),
            createSemanticElement("Close Pull Request", "#reject-pullrequest", full),
            createSemanticElement("Cancel inline comment", ".new-comment .aui-button-primary", full),
            createSemanticElement("Comment inline comment", ".new-comment .buttons a", full),
            createSemanticElement("Inline Comment", ".aui-iconfont-add-comment", full),
            createSemanticElement("Edit comment", ".comment-actions .edit-link", full),
            createSemanticElement("Add reaction", ".new-comment .buttons .aui-button-primary", full),

            // TODO: Give the tabas database id's.
            /*/!* TABS - NOTICE: almost no overlap with GitHub. *!/
            createSemanticElement("commits_tab", "#pr-menu-commits", full),
            createSemanticElement("overview_tab", "#pr-menu-diff", full),
            createSemanticElement("activity_tab", "#pr-menu-activity", full),*/

            /* TEXTFIELDS */
            createSemanticElement("Comment textfield", "#general-comments #id_new_comment", full),
            createSemanticElement("Inline comment textfield", ".comment-thread-container #id_new_comment", full)
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

    /**
     * This method registers the trackers for each semantic element.
     */
    public register() {
        this.mappings.forEach((semanticElement) => {
           this.registerSemanticElement(semanticElement);
        });
    }

    /**
     * This method registers the trackers for all semantic elements.
     * @param sm  The name of the semantic element.
     */
    private registerSemanticElement(sm: SemanticMapping) {
        let elements = document.querySelectorAll(sm.descriptor);
        for (let id = 0; id < elements.length; id++) {
            let element = <HTMLElement> elements[id];
            if (sm.mapping.keystroke)       { this.registerKeystroke(sm.name, element); }
            if (sm.mapping.click)           { this.registerClick(sm.name, element); }
            if (sm.mapping.hover)           { this.registerMouseEnter(sm.name, element);
                                              this.registerMouseLeave(sm.name, element); }
            if (sm.mapping.scroll)          { this.registerScroll(sm.name, element); }
        }
    }

    /**
     * A tracker for keystrokes on elements. 
     * @param name      The element name.
     * @param element   The element.
     */
    public registerKeystroke(name: string, element: HTMLElement) {
        element.addEventListener("keyup", () => {
            let message: SemanticEventJSON = this.createMessage("Keystroke",
                                                                 name);
            this.sendData(message);
        });
    }

    /**
     * This method adds an click-event-listener to an element.
     * @param name             The element name.
     * @param element          The element.
     */
    public registerClick(name: string, element: HTMLElement) {
        let _this = this;

        element.addEventListener("click", function() {
            let message: SemanticEventJSON = _this.createMessage("Click", name);
            _this.sendData(message);
        });
    }

    /**
     * This method adds a mouse-enter-event-listener to an element.
     * @param name             The element name.
     * @param element          The element.
     */
    public registerMouseEnter(name: string, element: HTMLElement) {
        let _this = this;

        element.addEventListener("mouseenter", function() {
            let message: SemanticEventJSON = _this.createMessage("Mouseenter", name);
            _this.sendData(message);
        });
    }

    /**
     * This method adds a mouse-leave-event-listener to an element.
     * @param name             The element name.
     * @param element          The element.
     */
    public registerMouseLeave(name: string, element: HTMLElement) {
        let _this = this;

        element.addEventListener("mouseleave", function() {
            let message: SemanticEventJSON = _this.createMessage("Mouseleave", name);
            _this.sendData(message);
        });
    }

    // TODO: Create scrolling tracker.
    public registerScroll(name: string, element: HTMLElement) {

    }

    /**
     * Creates a message using the Keystroke interface.
     * @returns {KeystrokeJSON}
     */
    private createMessage(event_name: string, element_name: string): SemanticEventJSON {
        return {
            event_type: this.event_types_mapping[event_name],
            element_type: this.element_types_mapping[element_name],
            created_at: Date.now() / 1000
        };
    }

    /**
     * Send data to the database.
     * @param seData  The data in JSON format.
     */
    private sendData(seData: SemanticEventJSON) {
        this.collector.sendMessage({
            table: "semantic-events/",
            data: seData
        });
    }
}