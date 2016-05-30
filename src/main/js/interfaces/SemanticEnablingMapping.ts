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