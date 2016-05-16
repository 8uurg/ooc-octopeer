export class KeystrokeTracker {

    private keyCode: number = 0;
    private keyName: string = "";

    /**
     * Register the keystroke tracker.
     */
    public register() {
        var current: KeystrokeTracker = this;

        /**
         * Create an EventListener that fires each time a key is pressed. Log the key that is pressed in the console.
         * @param event object that contains the required key information.
         */
        document.addEventListener('keyup', function (event) {
            current.keyCode = event.keyCode;

            switch (current.keyCode) {
                case  8:
                    current.keyName = "[Backspace]";
                    break;
                case  9:
                    current.keyName = "[Tab]";
                    break;
                case 13:
                    current.keyName = "[Enter]";
                    break;
                case 16:
                    current.keyName = "[Shift]";
                    break;
                case 17:
                    current.keyName = "[Control]";
                    break;
                case 18:
                    current.keyName = "[Alt]";
                    break;
                case 20:
                    current.keyName = "[Caps Lock]";
                    break;
                case 27:
                    current.keyName = "[Escape]";
                    break;
                case 32:
                    current.keyName = "[Space]";
                    break;
                case 33:
                    current.keyName = "[Page Up]";
                    break;
                case 34:
                    current.keyName = "[Page Down]";
                    break;
                case 35:
                    current.keyName = "[End]";
                    break;
                case 36:
                    current.keyName = "[Home]";
                    break;
                case 45:
                    current.keyName = "[Insert]";
                    break;
                case 46:
                    current.keyName = "[Delete]";
                    break;
                default:
                    current.keyName = String.fromCharCode(current.keyCode);
            }

            current.logKeystroke();
        });
        console.log("Registered Keystroke Tracker.");
    }

    /**
     * Log the key that has been pressed and send it to the database.
     */
    logKeystroke() {
        this.sendData(this.keyName);
        console.log("Keystroke: " + this.keyName);
    }

    /**
     * Send data to the database
     * @param keyName name of the key that has been pressed.
     */
    sendData(keyName: string) {
        // TODO: implement this
    }
}


