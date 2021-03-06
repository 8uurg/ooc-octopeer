///<reference path="./interfaces/Message.ts" />
/// <reference path="../../../typings/index.d.ts" />

/**
 * This class lets gives the possibility to send DatabaseSchemes requests to the restful api.
 */
export class RARequestsSender {

    private api_location: string;
    private send: boolean = false;
    private allowedStates: number[] = new Array(200, 201, 202);

    /**
     * The constructor for setting the location of the database.
     * @param url  The URL of the RESTful API to send the data to.
     */
    constructor(url: string) {
        this.api_location = url;
        this.register();
    }

    /**
     * This registers a listener for messages in the extension.
     */
    private register() {
        const _this: RARequestsSender = this;

        chrome.runtime.onConnect.addListener(function(port) {
            console.assert(port.name === OCTOPEER_CONSTANTS.chrome_message_sender_id);
            port.onMessage.addListener(function(msg: Message) {
                _this.sendRequest(msg.table, msg.data);
            });
        });
    }

    /**
     * Returns the boolean value of send.
     * @returns {boolean}
     */
    public isSent(): boolean {
        return this.send;
    }

    /**
     * Returns the string value of api_location.
     * @returns {string}
     */
    public getApiLocation(): string {
        return this.api_location;
    }

    /**
     * Allows setting the api location.
     * @param loc The api location
     */
    public setApiLocation(loc: string) {
        console.log("Database location set to: " + loc);
        this.api_location = loc;
    }

    /**
     * This method creates a XMLHttpRequest and sets all parameters.
     * @param table  The endpoint for the database to send the data to.
     * @returns {XMLHttpRequest}
     */
    private createJSONRequest(table: string): XMLHttpRequest {
        let xmlHTTP = new XMLHttpRequest();
        let _this: RARequestsSender = this;

        xmlHTTP.open("POST", this.api_location + table, true);
        xmlHTTP.setRequestHeader("Content-Type", "application/json");
        xmlHTTP.onreadystatechange = function() {
            if (_this.allowedStates.indexOf(xmlHTTP.status) === -1  && xmlHTTP.readyState === 4) {
                console.error("An error occurred while sending data to the server: " + xmlHTTP.status);
            } else {
                _this.send = true;
            }
        };

        return xmlHTTP;
    }

    /**
     * Sends the data to the database if a database location is set.
     * @param table  The table to put the information in.
     * @param data   The data in an object..
     */
     public sendRequest(table: string, data: Object): void {
        if (this.api_location === null) {
            console.error("No location for the restful api is known.");
            return;
        }

        let xmlHTTP = this.createJSONRequest(table);
        xmlHTTP.send(JSON.stringify(data));
    }
}