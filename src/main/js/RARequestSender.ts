///<reference path="./interfaces/message.ts" />
/**
 * Created by Cas on 23-4-2016.
 * This class lets gives the possibility to send JSON requests to the restful api.
 */
export class RARequestsSender {

    public api_location: string;
    private send: boolean = false;

    /**
     * The constructor for setting the location of the database.
     * @param url  The URL of the RESTful API to send the data to.
     */
    public constructor(url: string) {
        this.api_location = url;
        this.register();
    }

    /**
     * This registers a listener for messages in the extension.
     */
    private register() {
        const _this: RARequestsSender = this;

        chrome.runtime.onConnect.addListener(function(port) {
            console.assert(port.name === "requestSender");
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
     * Sends the data to the database if a database location is set.
     * @param table  The table to put the information in.
     * @param data   The data in an object..
     */
     public sendRequest(table: string, data: Object): void {
        if (this.api_location === null) {
            console.error("No location for the restful api is known.");
            return;
        }

        let xmlHTTP = new XMLHttpRequest();
        let _this: RARequestsSender = this;
        xmlHTTP.open("POST", this.api_location + table, true);
        xmlHTTP.setRequestHeader("Content-Type", "application/json");
        xmlHTTP.onreadystatechange = function() {
            if (xmlHTTP.status !== 200 && xmlHTTP.readyState === 4) {
                console.error("An error occurred while sending data to the server: " + xmlHTTP.status);
            } else {
                _this.send = true;
            }
        };
        xmlHTTP.send(JSON.stringify(data));
    }
}

new RARequestsSender("http://localhost:8000/api/");