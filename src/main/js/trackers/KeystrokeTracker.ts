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

    /**
     * Register the keystroke tracker.
     */
    public register() {
        document.addEventListener("keydown", (event) => {
            this.sendData(this.createMessage(event.keyCode, KeyEventType.down));
        });

        document.addEventListener("keyup", (event) => {
            this.sendData(this.createMessage(event.keyCode, KeyEventType.up));
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
    private createMessage(keyCode: number, type: KeyEventType): KeystrokeJSON {
        let keyName: string;
        if (this.keyMap[keyCode] != null) {
            keyName = this.keyMap[keyCode];
        } else {
            keyName = String.fromCharCode(keyCode);
        }

        return {
            created_at: Date.now() / 1000,
            keystroke: keyName,
            keystroke_type: type
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

enum KeyEventType {
    down = 1,
    up = 2
}