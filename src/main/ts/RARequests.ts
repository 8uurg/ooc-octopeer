/**
 * Created by Cas on 23-4-2016.
 */
class RARequests {

    api_location: string;


    /**
     * The constructor for setting the location of the database.
     * @param url - The URL of the RESTful API to send the data to.
     */
    constructor(url: string) {
        this.api_location = url;
    }

    /**
     * Create pull request.
     * @param created - The date the pull request is created.
     * @param merged - The date the pull request is merged.
     * @param closed - The date the pull request is closed.
     * @returns JSON object of the data.
     */
    pullRequest(created: Date, merged: Date, closed: Date) : JSON {
        var jsonObject2 = JSON.constructor();
        jsonObject2 = {"created_at": created, "merged_at": merged, "closed_at": closed};
        return jsonObject2
    }

    /**
     * Sends the data to the database if a database location is set.
     * @param table - The table to put the information in.
     * @param data - The data in JSON format.
     */
    sendRequest(table: string, data: JSON) {
        if(this.api_location == null) {
            console.error("No location for the restful api is known.")
            return;
        }
        var xmlHTTP = new XMLHttpRequest();
        xmlHTTP.open("POST", this.api_location + "" + table, true);
        xmlHTTP.setRequestHeader("Content-Type", "application/json");
        xmlHTTP.send(JSON.stringify(data));

        if(xmlHTTP.status != 200) {
            console.error("An error occurred while sending data to the server: " + xmlHTTP.status);
        }
    }
}