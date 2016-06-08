///<reference path="../interfaces/Message.ts" />
///<reference path="../interfaces/DatabaseSchemes/SemanticEventJSON.ts" />
///<reference path="../interfaces/TrackingCollector.ts" />
/// <reference path="./Tracker.d.ts" />

/**
 * Provides a tracker that tracks the visibility on the webpage.
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
            event_type: "http://10.0.22.6/api/event-types/" + (this.pageVisible ? 401 : 402) + "/",
            element_type: "http://10.0.22.6/api/element-types/" + 101 + "/",
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