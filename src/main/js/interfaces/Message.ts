/**
 * Created by Cas on 14-5-2016.
 */
interface Message {
    /**
     * The type of the message. *F.E.: MousePos for mouse position events*
     */
    table: "mouse-position-events/"|"sessions/"|"users/";

    /**
     * The data object which adheres one interface.
     */
    data: MousePosJSON|SessionJSON|UserJSON;
}