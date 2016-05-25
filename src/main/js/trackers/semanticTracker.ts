/// <reference path="../interfaces/TrackingCollector.ts" />
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
    mouse_enter: boolean;
    mouse_leave: boolean;
    scroll_in_view: boolean;
    scroll_out_view: boolean;
}

/**
 * Generate a semantic element.
 */
function semanticElement(name: string, descriptor: string, mapping: SemanticEnablingMapping ): SemanticMapping {
    return {
        name: name,
        descriptor: descriptor,
        mapping: mapping
    };
}

/**
 * This interface combines the enabled mapping.
 */
interface SemanticMapping {
    name: string;
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
            mouse_enter: true,
            mouse_leave: true,
            scroll_in_view: true,
            scroll_out_view: true
        };

        // TODO: Make mappings work.
        this.mappings = [
            /* BUTTONS */
            semanticElement("merge_pr_button", "#fulfill-pullrequest", full),
            semanticElement("close_pr_button", "#reject-pullrequest", full),
            semanticElement("cancel_inline_comment_button", ".new-comment .aui-button-primary", full),
            semanticElement("submit_inline_comment_button", ".new-comment .buttons a", full),
            semanticElement("create_inline_comment_button", ".aui-iconfont-add-comment", full),
            semanticElement("edit_comment_button", ".comment-actions .edit-link", full),
            semanticElement("pr_comment_button", ".new-comment .buttons .aui-button-primary", full),
            /* TABS - NOTICE: almost no overlap with GitHub. */
            semanticElement("commits_tab", "#pr-menu-commits", full),
            semanticElement("overview_tab", "#pr-menu-diff", full),
            semanticElement("activity_tab", "#pr-menu-activity", full),
            /* TEXTFIELDS */
            semanticElement("comment_textfield", "#general-comments #id_new_comment", full),
            semanticElement("inline_comment_textfield", ".comment-thread-container #id_new_comment", full)
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
            if (sm.mapping.keystroke)       { this.registerKeystroke(sm.name, element); }
            if (sm.mapping.click)           { this.registerClick(sm.name, element); }
            if (sm.mapping.mouse_enter)     { this.registerMouseEnter(sm.name, element); }
            if (sm.mapping.mouse_leave)     { this.registerMouseLeave(sm.name, element); }
            if (sm.mapping.scroll_in_view)  { this.registerScrollInView(sm.name, element); }
            if (sm.mapping.scroll_out_view) { this.registerScrollOutView(sm.name, element); }
        }
    }

    public registerKeystroke(name: string, element: HTMLElement) {

    }

    public registerClick(name: string, element: HTMLElement) {

    }

    public registerMouseEnter(name: string, element: HTMLElement) {

    }

    public registerMouseLeave(name: string, element: HTMLElement) {

    }

    public registerScrollInView(name: string, element: HTMLElement) {

    }

    public registerScrollOutView(name: string, element: HTMLElement) {

    }

}