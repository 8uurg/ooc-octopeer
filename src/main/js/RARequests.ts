/**
 * Created by Cas on 23-4-2016.
 */
class RARequests implements Requests {

    api_location: string;


    /**
     * The constructor for setting the location of the database.
     * @param url - The URL of the RESTful API to send the data to.
     */
    constructor(url: string) {
        this.api_location = url;
    }

    /**
     * Sends the username to the database.
     * @param userData - An enforced JSON type for the storage of the username.
     */
    sendUserName(userData: UserJSON) {
        this.sendRequest("users", userData);
    }

    /**
     * Sends the data to the database if a database location is set.
     * @param table - The table to put the information in.
     * @param data - The data in JSON format.
     */
    private sendRequest(table: string, data: Object) {
        if(this.api_location == null) {
            console.error("No location for the restful api is known.")
            return;
        }

        var xmlHTTP = new XMLHttpRequest();
        xmlHTTP.open("POST", this.api_location + table, true);
        xmlHTTP.setRequestHeader("Content-Type", "application/json");
        xmlHTTP.send(JSON.stringify(data));

        if(xmlHTTP.status != 200) {
            console.error("An error occurred while sending data to the server: " + xmlHTTP.status);
        }
    }
}