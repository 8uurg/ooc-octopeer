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
    private element_types_mapping: any = {"Merge Pull Request": 101,
                                          "Close Pull Request": 102,
                                          "Cancel inline comment": 103,
                                          "Comment inline comment": 104,
                                          "Inline Comment": 105,
                                          "Edit comment": 109,
                                          "Add reaction": 10,
                                          "Comment textfield": 501,
                                          "Inline comment textfield": 502

                                         };
    private event_types_mapping: any = {"Keystroke": 101,
                                        "Click": 201,
                                        "Mouseenter": 202,
                                        "Mouseleave": 203,
                                        "Scroll into view": 301,
                                        "Scroll out of view": 302,
                                        "Start watching pull request": 401,
                                        "Stop watching pull request": 402
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
            let element = <HTMLElement> elements.item(id);
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
            let event_type: number = _this.event_types_mapping["Click"];
            let element_type: number = _this.element_types_mapping[name];
            let message: SemanticEventJSON = _this.createMessage(event_type, element_type, 1);
            _this.sendData(message);
        });
    }

    public registerHover(name: string, element: HTMLElement) {

    }

    public registerScroll(name: string, element: HTMLElement) {

    }

    /**
     * Creates a message using the Keystroke interface.
     * @returns {KeystrokeJSON}
     */
    private createMessage(event_type: number, element_type: number,
                          duration: number): SemanticEventJSON {
        return {
            event_type: "http://10.0.22.6/api/event-types/" + event_type,
            element_type: "http://10.0.22.6/api/element-types/" + element_type,
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