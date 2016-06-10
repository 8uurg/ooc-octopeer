/**
 * This interface is the mapping for enabling and disabling
 * semantic trackers for a certain semantic element.
 */
interface SemanticEnablingMapping {

    /**
     * Whether the keystrokes will be semantically tracked.
     */
    keystroke: boolean;

    /**
     * Whether the mouse clicks will be semantically tracked.
     */
    click: boolean;

    /**
     * Whether the mouse hovers will be semantically tracked.
     */
    hover: boolean;

    /**
     * Whether the mouse scrolls will be semantically tracked.
     */
    scroll: boolean;
}