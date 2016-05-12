/**
 * Created by Cas on 23-4-2016.
 * This class lets gives the possibility to send JSON requests to the restful api.
 */
export class RARequestsSender implements Requests {

    api_location: string;
    private table: string;
    private data: Object;
    private send: boolean;

    /**
     * The constructor for setting the location of the database.
     * @param url  The URL of the RESTful API to send the data to.
     */
    constructor(url: string) {
        this.api_location = url;
        this.send = false;
    }

    /**
     * Returns the boolean value of send.
     * @returns {boolean}
     */
    public isSent(): boolean {
        return this.send;
    }

    /**
     * Returns the string value of table.
     * @returns string
     */
    public getTable(): string {
        return this.table;
    }

    /**
     * Returns the Object value of data.
     * @returns Object
     */
    public getData(): Object {
        return this.data;
    }

    /**
     * Sets the value of send (For test purposes).
     * @param value  The boolean value for send.
     */
    public setSend(value: boolean): void {
        this.send = value;
    }

    /**
     * Sends the username to the database.
     * @param userData  An enforced structure for the storage of the username.
     */
    public sendUserName(userData: UserJSON): void {
        this.send = false;
        this.table = "users";
        this.data = userData;
        this.sendRequest();
    }

    /**
     * Sends the mouse position to the database.
     * @param mouseData  An enforced structure for the storage of the mouse position.
     */
    public sendMousePosition(mouseData: MousePosJSON): void {
        this.send = false;
        this.table = "mouse-position-events";
        this.data = mouseData;
        this.sendRequest();
    }

    /**
     * Sends the data to the database if a database location is set.
     * @param table  The table to put the information in.
     * @param data   The data in an object..
     */
     sendRequest(): void {
        if (this.api_location === null) {
            console.error("No location for the restful api is known.");
            return;
        }

        let xmlHTTP = new XMLHttpRequest();
        let _this: RARequestsSender = this;
        xmlHTTP.open("POST", this.api_location + this.table, true);
        xmlHTTP.setRequestHeader("Content-Type", "application/json");
        xmlHTTP.onreadystatechange = function() {
            if (xmlHTTP.status !== 200 && xmlHTTP.readyState === 4) {
                console.error("An error occurred while sending data to the server: " + xmlHTTP.status);
            } else {
                _this.send = true;
            }
        }
        xmlHTTP.send(JSON.stringify(this.data));
    }
}