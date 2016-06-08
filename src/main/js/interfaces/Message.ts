///<reference path="../interfaces/DatabaseSchemes/DomJSON.ts" />
///<reference path="../interfaces/DatabaseSchemes/KeystrokeJSON.ts" />
///<reference path="../interfaces/DatabaseSchemes/MouseClickJSON.ts" />
///<reference path="../interfaces/DatabaseSchemes/MousePosJSON.ts" />
///<reference path="../interfaces/DatabaseSchemes/SemanticEventJSON.ts" />
///<reference path="../interfaces/DatabaseSchemes/WindowResolutionJSON.ts" />
/**
 * This interface is used to define the structure for a chrome message to enforce type-checking.
 */
interface Message {

    /**
     * The type of the message. *F.E.: MousePos for mouse position events*
     */
    table: "users/"|"repositories/"|"pull-requests/"|"sessions/"|"event-types/"|
           "element-types/"|"semantic-events/"|"event-positions/"|"keystroke-events/"|"mouse-position-events/"|
           "mouse-click-events/"|"mouse-scroll-events/"|"window-resolution-events/"|"html-pages/";

    /**
     * The data object which adheres one interface.
     */
    data: KeystrokeJSON|MouseClickJSON|MousePosJSON|WindowResolutionJSON|SemanticEventJSON|DomJSON;
}
