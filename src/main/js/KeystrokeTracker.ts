///<reference path="./interfaces/Message.ts" />
///<reference path="./interfaces/KeystrokeJSON.ts" />
export class KeystrokeTracker {

    private keyCode: number = 0;
    private keyName: string = "";
    private port: any = null;

    /**
     * Register the keystroke tracker.
     */
    public register() {
        let _this: KeystrokeTracker = this;

        _this.port = chrome.runtime.connect({name: "requestSender"});

        /**
         * Create an EventListener that fires each time a key is pressed. Log the key that is pressed in the console.
         * @param event object that contains the required key information.
         */
        document.addEventListener("keyup", function (event) {
            _this.keyCode = event.keyCode;

            switch (_this.keyCode) {
                case  8:
                    _this.keyName = "[Backspace]";
                    break;
                case  9:
                    _this.keyName = "[Tab]";
                    break;
                case 13:
                    _this.keyName = "[Enter]";
                    break;
                case 16:
                    _this.keyName = "[Shift]";
                    break;
                case 17:
                    _this.keyName = "[Control]";
                    break;
                case 18:
                    _this.keyName = "[Alt]";
                    break;
                case 20:
                    _this.keyName = "[Caps Lock]";
                    break;
                case 27:
                    _this.keyName = "[Escape]";
                    break;
                case 32:
                    _this.keyName = "[Space]";
                    break;
                case 33:
                    _this.keyName = "[Page Up]";
                    break;
                case 34:
                    _this.keyName = "[Page Down]";
                    break;
                case 35:
                    _this.keyName = "[End]";
                    break;
                case 36:
                    _this.keyName = "[Home]";
                    break;
                case 45:
                    _this.keyName = "[Insert]";
                    break;
                case 46:
                    _this.keyName = "[Delete]";
                    break;
                default:
                    _this.keyName = String.fromCharCode(_this.keyCode);
            }

            _this.sendData(_this.createMessage());
        });
    }

    /**
     * Creates a message using the Keystroke interface.
     * @returns {KeystrokeJSON}
     */
    private createMessage(): KeystrokeJSON {
        let data: KeystrokeJSON = {
                created_at: Date.now(),
                keyName: this.keyName,
                session: "" // Empty for now.
        };
        return data;
    }

    /**
     * Send data to the database
     */
    private sendData(ksData: KeystrokeJSON) {
        this.port.postMessage({
            table: "keystroke-events/",
            data: ksData
        });
    }
}