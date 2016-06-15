/// <reference path="../../interfaces/DatabaseSchemes/SemanticEventJSON.ts" />
/// <reference path="./Tracker.d.ts" />
/// <reference path="../../Main.d.ts" />
declare var OCTOPEER_CONSTANTS: any;

/**
 * Provides a tracker that tracks the visibility on the page.
 */
export class VisibilityTracker extends Tracker {
    private pageVisible: boolean = false;

    /**
     * Register the visibility tracker to the document.
     */
    public register() {
        // Store `this` for usage in functions.
        const _this: VisibilityTracker = this;

        /**
         * Update the visibility every time document hidden is changed.
         * @param event Object that contains the required semantic event information.
         */
        document.addEventListener("visibilitychange", function(event) {
            _this.pageVisible = !document.hidden;
            _this.sendData(_this.createMessage());
        });
    }

    /**
     * Creates an object of type SemanticEventJSON.
     * @returns {SemanticEventJSON}
     */
    private createMessage(): SemanticEventJSON {
        return {
            event_type: this.pageVisible ? 401 : 402,
            element_type: 101,
            created_at: Date.now() / 1000
        };
    }

    /**
     * Send data to centralized collector.
     */
    private sendData(vtData: SemanticEventJSON) {
        this.sendMessage({
            table: "semantic-events/",
            data: vtData
        });
    }
}

main.declareTracker({
    tracker: (collector) => { 
        return (new VisibilityTracker())
            .withCollector(collector);
    },
    setting: {
        name: OCTOPEER_CONSTANTS.track_semantic_visibility,
        def: true
    }
});