///<reference path="../interfaces/Message.ts" />
///<reference path="../interfaces/DatabaseSchemes/SemanticEventJSON.ts" />
///<reference path="../interfaces/TrackingCollector.ts" />

/**
 * Provides a tracker that tracks the visibility on the webpage.
 */
export class VisibilityTracker {
    private collector: TrackingCollector;
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
     * Add a collector to send the data to.
     * @param collector The collector.
     * @returns {VisibilityTracker}
     */
    public withCollector(collector: TrackingCollector): VisibilityTracker {
        this.collector = collector;
        return this;
    }

    /**
     * Creates an object of type SemanticEventJSON.
     * @returns {SemanticEventJSON}
     */
    private createMessage(): SemanticEventJSON {
        return {
            event_type: this.pageVisible ? 401 : 402,
            element_type: -1, // -1 for now since there is no element type associated with visibility.
            started_at: Date.now(),
            duration: 0
        };
    }

    /**
     * Send data to centralized collector.
     */
    private sendData(vtData: SemanticEventJSON) {
            this.collector.sendMessage({
                table: "semantic-events/",
                data: vtData
            });
    }
}