/**
 * Created by Cas on 23-4-2016.
 */
export class RARequests implements Requests {

    api_location: string;
    private table: string;
    private data: Object;
    private send: boolean;


    /**
     * The constructor for setting the location of the database.
     * @param url - The URL of the RESTful API to send the data to.
     */
    constructor(url: string) {
        this.api_location = url;
        this.send = false;
    }

    /**
     * Returns the boolean value of send.
     * @returns {boolean}
     */
    public getSend(): boolean {
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
     * @param value - The boolean value for send.
     */
    public setSend(value: boolean): void {
        this.send = value;
    }

    /**
     * Sends the username to the database.
     * @param userData - An enforced JSON type for the storage of the username.
     */
    public sendUserName(userData: UserJSON): void {
        this.send = false;
        this.table = "users";
        this.data = userData;
        this.sendRequest();
    }

    /**
     * Sends the data to the database if a database location is set.
     * @param table - The table to put the information in.
     * @param data - The data in JSON format.
     */
     sendRequest(): void {
        if(this.api_location == null) {
            console.error("No location for the restful api is known.");
            return;
        }

        var xmlHTTP = new XMLHttpRequest();
        var currentSpot: RARequests = this;
        xmlHTTP.open("POST", this.api_location + this.table, true);
        xmlHTTP.setRequestHeader("Content-Type", "application/json");
        xmlHTTP.onreadystatechange = function() {
            if(xmlHTTP.status != 200) {
                console.error("An error occurred while sending data to the server: " + xmlHTTP.status);
            } else {
                currentSpot.send = true;
            }
        }
        xmlHTTP.send(JSON.stringify(this.data));
    }
}