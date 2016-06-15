/// <reference path="../../interfaces/DatabaseSchemes/KeystrokeJSON.ts" />
/// <reference path="./Tracker.d.ts" />
/// <reference path="../../Main.d.ts" />
declare var OCTOPEER_CONSTANTS: any;

/**
 * Enum as the database uses only two types identified by numbers.
 * This avoids using magic numbers.
 */
enum KeyEventType {
    down = 1,
    up = 2
}

/**
 * Provides a tracker that tracks keystrokes on the page.
 */
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

    /**
     * Register the keystroke tracker.
     */
    public register() {
        document.addEventListener("keydown", (event) => {
            this.sendData(this.createMessage(this.mapKeyCodeToString(event.keyCode), KeyEventType.down));
        });

        document.addEventListener("keyup", (event) => {
            this.sendData(this.createMessage(this.mapKeyCodeToString(event.keyCode), KeyEventType.up));
        });
    }

    /**
     * Maps a key code to a string.
     * @param keyCode The key code.
     * @returns {string} The corresponding string.
     */
    private mapKeyCodeToString(keyCode: number): string {
        if (this.keyMap[keyCode] != null) {
            return this.keyMap[keyCode];
        } else {
            return String.fromCharCode(keyCode);
        }
    }

    /**
     * Creates a message using the Keystroke interface.
     * @param keyName The keycode for the key that has to be sent.
     * @param type The type of the key stroke.
     * @returns {KeystrokeJSON}
     */
    private createMessage(keyName: string, type: KeyEventType): KeystrokeJSON {
        return {
            created_at: Date.now() / 1000,
            keystroke: keyName,
            keystroke_type: type
        };
    }

    /**
     * Send data to the database.
     */
    private sendData(ksData: KeystrokeJSON) {
        this.sendMessage({
            table: "keystroke-events/",
            data: ksData
        });
    }
}

main.declareTracker({
    tracker: (collector) => {
        return (new KeystrokeTracker())
            .withCollector(collector)
            .register();
    },
    setting: {
        name: OCTOPEER_CONSTANTS.track_key_strokes,
        def: true
    }
});