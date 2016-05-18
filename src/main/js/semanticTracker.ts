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
            semanticElement("merge_pr_button", "", full),
            semanticElement("close_pr_button", "", full),
            semanticElement("cancel_inline_comment_button", "", full),
            semanticElement("submit_inline_comment_button", "", full),
            semanticElement("create_inline_comment_button", "", full),
            semanticElement("edit_comment_button", "", full),
            semanticElement("pr_comment_button", "", full),
            /* TABS - NOTICE: almost no overlap with GitHub. */
            semanticElement("commits_tab", "", full),
            semanticElement("overview_tab", "", full),
            semanticElement("activity_tab", "", full),
            /* TEXTFIELDS */
            semanticElement("comment_textfield", "", full),
            semanticElement("inline_comment_textfield", "", full)
        ];
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
            if (sm.mapping.keystroke)       { this.registerKeystroke(sm.name, element); };
            if (sm.mapping.click)           { this.registerClick(sm.name, element); };
            if (sm.mapping.mouse_enter)     { this.registerMouseEnter(sm.name, element); };
            if (sm.mapping.mouse_leave)     { this.registerMouseLeave(sm.name, element); };
            if (sm.mapping.scroll_in_view)  { this.registerScrollInView(sm.name, element); };
            if (sm.mapping.scroll_out_view) { this.registerScrollOutView(sm.name, element); };
        };
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