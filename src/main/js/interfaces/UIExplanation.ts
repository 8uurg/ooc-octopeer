/**
 * This interface represents the structure of an explanation box in the user interface.
 */
interface UIExplanation {

    /**
     * This string represents the question mark that has been clicked on.
     */
    settingSelector: string;

    /**
     * This is the title of the tracker.
     */
    title: string;

    /**
     * This is the explanation of the tracker.
     */
    bodyText: string[];

    /**
     * This is the example data of what is been tracked.
     */
    sampleData: () => HTMLElement[];
}