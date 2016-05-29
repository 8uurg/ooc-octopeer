///<reference path="../interfaces/Message.ts" />
///<reference path="../interfaces/SemanticEventJSON.ts" />
///<reference path="../interfaces/TrackingCollector.ts" />

/**
 * Provides a tracker that tracks the visibility on the webpage.
 */
export class VisibilityTracker {
    private collector: TrackingCollector;
    private pageVisible: boolean = false;
    private lastCall: number = -1;
    private startTime: number = -1;

    /**
     * Register the visibility tracker to the document.
     */
    public register() {
        // Store `this` for usage in functions.
        const _this: VisibilityTracker = this;

        /**
         * Update the mouse coordinates every time the cursor moves.
         * @param event Object that contains the required cursor information.
         */
        document.addEventListener("visibilitychange", function(event) {
            _this.pageVisible = !document.hidden;
            _this.startTime = Date.now() / 1000;
            _this.sendData(_this.createMessage());
        });
    }

    /**
     * Add a collector to send the data to.
     * @param collector The collector.
     * @returns {MousePositionTracker}
     */
    public withCollector(collector: TrackingCollector): VisibilityTracker {
        this.collector = collector;
        return this;
    }

    /**
     * Creates an object of type MousePosJSON.
     * @returns {MousePosJSON}
     */
    private createMessage(): SemanticEventJSON {
        return {
            event_type: "", // Empty for now until it's known what kind of event the visibility is.
            element_type: "", // Empty for now until it's known what kind of event the visibility is.
            started_at: this.startTime,
            duration: Date.now() / 1000 - this.startTime
        };
    }

    /**
     * Send data to centralized collector.
     */
    private sendData(vtData: SemanticEventJSON) {
        let newCall: number = Date.now();

        if ( newCall - this.lastCall >= 1000 ) {
            this.lastCall = newCall;
            this.collector.sendMessage({
                table: "semantic-events/",
                data: vtData
            });
        }
    }
}