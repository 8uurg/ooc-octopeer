///<reference path="../interfaces/Message.ts" />
///<reference path="../interfaces/DatabaseSchemes/KeystrokeJSON.ts" />
///<reference path="../interfaces/TrackingCollector.ts" />

export class KeystrokeTracker {

    private keyName: string = "";
    private collector: TrackingCollector;
    private keyMap: any = {8: "[Backspace]",
                           9: "[Tab]",
                           13: "[Enter]",
                           16: "[Shift]",
                           17: "[Control]",
                           18: "[Alt]",
                           20: "[Caps Lock]",
                           27: "[Escape]",
                           32: "[Space]",
                           33: "[Page Up]",
                           34: "[Page Down]",
                           35: "[End]",
                           36: "[Home]",
                           45: "[Insert]",
                           46: "[Delete]"};

    /**
     * Register the keystroke tracker.
     */
    public register() {
        let _this: KeystrokeTracker = this;

        /**
         * Create an EventListener that fires each time a key is pressed. Log the key that is pressed in the console.
         * @param event object that contains the required key information.
         */
        document.addEventListener("keyup", function (event) {

            if (_this.keyMap[event.keyCode] != null) {
                _this.keyName = _this.keyMap[ event.keyCode ];
            } else {
                _this.keyName = String.fromCharCode(event.keyCode);
            }

            _this.sendData(_this.createMessage());
        });
    }

    /**
     * Add a collector to send the tracked data to.
     * @param collector The collector to send to.
     * @returns {KeystrokeTracker}
     */
    public withCollector(collector: TrackingCollector): KeystrokeTracker {
        this.collector = collector;
        return this;
    }

    /**
     * Creates a message using the Keystroke interface.
     * @returns {KeystrokeJSON}
     */
    private createMessage(): KeystrokeJSON {
        return {
            created_at: Date.now() / 1000,
            keystroke: this.keyName
        };
    }

    /**
     * Send data to the database
     */
    private sendData(ksData: KeystrokeJSON) {
        this.collector.sendMessage({
            table: "keystroke-events/",
            data: ksData
        });
    }
}