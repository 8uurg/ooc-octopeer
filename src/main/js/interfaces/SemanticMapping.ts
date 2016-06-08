/**
 * This interface is used for declaring semantic elements.
 */
interface SemanticMapping {

    /**
     * The name of the semantic element.
     */
    name: string;

    /**
     * The css descriptors of the semantic element.
     */
    descriptor: string;

    /**
     * The semantic mapping scheme for the semantic element.
     */
    mapping: SemanticEnablingMapping;
}