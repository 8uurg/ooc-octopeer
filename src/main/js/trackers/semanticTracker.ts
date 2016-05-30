/// <reference path="../interfaces/TrackingCollector.ts" />
declare var scrollMonitor: any;

/**
 * This file contains logic for registering semantic events.
 */

/**
 * This interface is the mapping for enabling and disabling
 * semantic trackers for a certain semantic element.
 */
interface SemanticEnablingMapping {
    keystroke: boolean;
    click: boolean;
    hover: boolean;
    scroll: boolean;
}

/**
 * Generate a semantic element.
 */
function semanticElement(name: string, id: number, descriptor: string,
                         mapping: SemanticEnablingMapping ): SemanticMapping {
    return {
        name: name,
        id: id,
        descriptor: descriptor,
        mapping: mapping
    };
}

/**
 * This interface combines the enabled mapping.
 */
interface SemanticMapping {
    name: string;
    id: number;
    descriptor: string;
    mapping: SemanticEnablingMapping;
}

/**
 * Implments semantic tracking
 * For given elements tracks specific events.
 */
class SemanticTracker {

    private mappings: SemanticMapping[];
    private collector: TrackingCollector;

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
            semanticElement("merge_pr_button", 101, "#fulfill-pullrequest", full),
            semanticElement("close_pr_button", 102, "#reject-pullrequest", full),
            semanticElement("cancel_inline_comment_button", 103, ".new-comment .aui-button-primary", full),
            semanticElement("submit_inline_comment_button", 104, ".new-comment .buttons a", full),
            semanticElement("create_inline_comment_button", 105, ".aui-iconfont-add-comment", full),
            semanticElement("edit_comment_button", 109, ".comment-actions .edit-link", full),
            semanticElement("pr_comment_button", 113, ".new-comment .buttons .aui-button-primary", full),
            /* TABS - NOTICE: almost no overlap with GitHub. */
            semanticElement("commits_tab", 202, "#pr-menu-commits", full),
            semanticElement("overview_tab", 204, "#pr-menu-diff", full),
            semanticElement("activity_tab", 205, "#pr-menu-activity", full),
            /* TEXTFIELDS */
            semanticElement("comment_textfield", 501, "#general-comments #id_new_comment", full),
            semanticElement("inline_comment_textfield", 502, ".comment-thread-container #id_new_comment", full)
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

    public registerSemanticElement(sm: SemanticMapping) {
        let elements = document.querySelectorAll(sm.descriptor);
        for (let id = 0; id < elements.length; id++) {
            let element = <HTMLElement> elements.item(id);
            if (sm.mapping.keystroke)       { this.registerKeystroke(sm.name, sm.id, element); }
            if (sm.mapping.click)           { this.registerClick(sm.name, sm.id, element); }
            if (sm.mapping.hover)           { this.registerHover(sm.name, sm.id, element); }
            if (sm.mapping.scroll)          { this.registerScroll(sm.name, sm.id, element); }
        }
    }

    public registerKeystroke(name: string, id: number, element: HTMLElement) {

    }

    public registerClick(name: string, id: number, element: HTMLElement) {

    }

    public registerHover(name: string, id: number, element: HTMLElement) {

    }

    public registerScroll(name: string, id: number, element: HTMLElement) {

    }

}