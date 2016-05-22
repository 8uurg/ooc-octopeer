///<reference path="./MouseClickJSON.ts" />
///<reference path="./MousePosJSON.ts" />
///<reference path="./SessionJSON.ts" />
///<reference path="./UserJSON.ts" />
/**
 * Created by Cas on 14-5-2016.
 */
interface Message {
    /**
     * The type of the message. *F.E.: MousePos for mouse position events*
     */
    table: "users/"|"repositories/"|"pull-requests/"|"sessions/"|"event-types/"|
           "element-types/"|"semantic-events/"|"event-positions/"|"keystroke-events/"|"mouse-position-events/"|
           "mouse-click-events/"|"mouse-scroll-events/"|"window-resolution-events/";

    /**
     * The data object which adheres one interface.
     */
    data: MouseClickJSON|MousePosJSON|SessionJSON|UserJSON;
}