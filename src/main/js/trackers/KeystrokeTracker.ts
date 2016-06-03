///<reference path="../interfaces/Message.ts" />
///<reference path="../interfaces/DatabaseSchemes/KeystrokeJSON.ts" />
///<reference path="../interfaces/TrackingCollector.ts" />

export class KeystrokeTracker {

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

    private pressedKeys: number[] = [];

    /**
     * Register the keystroke tracker.
     */
    public register() {
        let _this: KeystrokeTracker = this;

        /**
         * Create an EventListener that fires each time a key is pressed. Log the key that is pressed in the console.
         * @param event object that contains the required key information.
         */
        document.addEventListener("keydown", (event) => {
            this.pressedKeys[event.keyCode] = Date.now() / 1000;
        });

        document.addEventListener("keyup", (event) => {
            let start_time = this.pressedKeys[event.keyCode];
            let end_time = Date.now() / 1000;

            this.pressedKeys[event.keyCode] = undefined;

            this.sendData(_this.createMessage(event.keyCode, start_time, end_time));
        });

        setInterval(this.sendUnsentKeyDowns, 10000);
    }

    /**
     * Sends the keys which have had no keyup event.
     */
    private sendUnsentKeyDowns() {
        for ( let key in this.pressedKeys ) {
            if (this.pressedKeys.hasOwnProperty(key) && Date.now() - this.pressedKeys[key] > 10000) {
                let start_time = this.pressedKeys[key];
                this.pressedKeys[key] = undefined;
                this.sendData(this.createMessage(Number(key), start_time, undefined));
            }
        }
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
    private createMessage(keyCode: number, up_time: number, down_time: number): KeystrokeJSON {
        let keyName: string;
        if (this.keyMap[keyCode] != null) {
            keyName = this.keyMap[keyCode];
        } else {
            keyName = String.fromCharCode(keyCode);
        }

        return {
            created_at: Date.now() / 1000,
            keystroke: keyName,
            key_down_at: down_time,
            key_up_at: up_time
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