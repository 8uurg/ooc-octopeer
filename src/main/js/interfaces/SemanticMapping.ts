/**
 * This interface is used for declaring semantic elements.
 */
interface SemanticMapping {
    name: string;
    descriptor: string;
    mapping: SemanticEnablingMapping;
    element_type_id: number;
}