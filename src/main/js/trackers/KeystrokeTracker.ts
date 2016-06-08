/// <reference path="../interfaces/DatabaseSchemes/KeystrokeJSON.ts" />
/// <reference path="./Tracker.d.ts" />

export class KeystrokeTracker extends Tracker {

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

    private pressedKeys: number[];

    /**
     * Register the keystroke tracker.
     */
    public register() {
        this.pressedKeys = [];
        /**
         * Create an EventListener that fires each time a key is pressed. Log the key that is pressed in the console.
         * @param event object that contains the required key information.
         */
        document.addEventListener("keydown", (event) => {
            this.pressedKeys[event.keyCode] = Date.now() / 1000;
            this.sendUnsentKeyDowns();
        });

        document.addEventListener("keyup", (event) => {
            let key_down_time = this.pressedKeys[event.keyCode];
            let key_up_time = Date.now() / 1000;

            this.pressedKeys[event.keyCode] = undefined;

            this.sendData(this.createMessage(event.keyCode, key_down_time, key_up_time));
            this.sendUnsentKeyDowns();
        });
    }

    /**
     * Sends the keys which have had no keyup event.
     */
    private sendUnsentKeyDowns() {
        for ( let key in this.pressedKeys ) {
            if (this.pressedKeys.hasOwnProperty(key) && Date.now() - this.pressedKeys[key] > 10000) {
                let key_down_time = this.pressedKeys[key];
                this.pressedKeys[key] = undefined;
                this.sendData(this.createMessage(Number(key), key_down_time, undefined));
            }
        }
    }

    /**
     * Creates a message using the Keystroke interface.
     * @returns {KeystrokeJSON}
     */
    private createMessage(keyCode: number, key_down_time: number, key_up_time: number): KeystrokeJSON {
        let keyName: string;
        if (this.keyMap[keyCode] != null) {
            keyName = this.keyMap[keyCode];
        } else {
            keyName = String.fromCharCode(keyCode);
        }

        return {
            created_at: Date.now() / 1000,
            keystroke: keyName,
            key_down_at: key_down_time,
            key_up_at: key_up_time
        };
    }

    /**
     * Send data to the database
     */
    private sendData(ksData: KeystrokeJSON) {
        this.sendMessage({
            table: "keystroke-events/",
            data: ksData
        });
    }
}