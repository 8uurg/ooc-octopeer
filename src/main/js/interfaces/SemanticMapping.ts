/// <reference path="./SemanticEnablingMapping.ts" />

/**
 * This interface is used for declaring semantic elements.
 */
interface SemanticMapping {

    /**
     * The name or type of the semantic element.
     */
    name: string;

    /**
     * The css selector of the semantic element.
     */
    selector: string;

    /**
     * The semantic mapping scheme for the semantic element.
     */
    track: SemanticEnablingMapping;
}