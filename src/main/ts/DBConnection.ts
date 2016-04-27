/**
 * Created by Cas on 23-4-2016.
 */
class DBConnection {

    database_location: string;

    /**
     * The constructor for setting the location of the database.
     * @param url - The URL of the RESTful API to send the data to.
     */
    constructor(url: string) {
        this.database_location = url;
    }

    /**
     * Create pull request.
     * @param created - The date the pull request is created.
     * @param merged - The date the pull request is merged.
     * @param closed - The date the pull request is closed.
     * @returns JSON object of the data.
     */
    pullRequest(created: Date, merged: Date, closed: Date) : JSON {
        var jsonObject2 = new JSON.constructor();
        jsonObject2 = {"created_at": created, "merged_at": merged, "closed_at": closed};
        return jsonObject2
    }

    /**
     * Sends the data to the database if a database location is set.
     * @param table - The table to put the information in.
     * @param data - The data in JSON format.
     */
    sendToDatabase(table: string, data: JSON) {
        if(this.database_location != null) {
            var xmlHTTP = new XMLHttpRequest();
            xmlHTTP.open("POST", this.database_location + "" + table, true);
            xmlHTTP.setRequestHeader("Content-Type", "application/json");
            xmlHTTP.send(JSON.stringify(data));
        } else {
            console.log("Database connection needs an url!");
        }
    }
}