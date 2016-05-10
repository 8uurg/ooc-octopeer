var keyCode: number = null;
var keyName: string = null;

/**
 * Create an EventListener that fires each time a key is pressed. Log the key that is pressed in the console.
 * @param event object that contains the required key information.
 */
document.addEventListener('keydown', function(event) {
    keyCode = event.keyCode;

    switch(keyCode) {
        case  8:
            keyName = "[Backspace]";
            break;
        case  9:
            keyName = "[Tab]";
            break;
        case 13:
            keyName = "[Enter]";
            break;
        case 16:
            keyName = "[Shift]";
            break;
        case 17:
            keyName = "[Control]";
            break;
        case 18:
            keyName = "[Alt]";
            break;
        case 20:
            keyName = "[Caps Lock]";
            break;
        case 27:
            keyName = "[Escape]";
            break;
        case 32:
            keyName = "[Space]";
            break;
        case 33:
            keyName = "[Page Up]";
            break;
        case 34:
            keyName = "[Page Down]";
            break;
        case 35:
            keyName = "[End]";
            break;
        case 36:
            keyName = "[Home]";
            break;
        case 45:
            keyName = "[Insert]";
            break;
        case 46:
            keyName = "[Delete]";
            break;
        default:
            keyName = String.fromCharCode(keyCode);
    }
    
    console.log("Keystroke: " + keyName);
});
