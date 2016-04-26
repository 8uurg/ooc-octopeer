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
     * Creating an JSON Object for a session.
     * @param sessionID - The session id.
     * @param user_hash - The hash of the user.
     * @returns JSON Object - The JSON object of a session.
     */
    sessionSetup(url: string, started: Date, ended: Date, user: string) : JSON {
        var jsonObject2 = new JSON.constructor();
        jsonObject2 = {"url": started, "started_at": started, "ended_at": ended, "user": user};
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
            xmlHTTP.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xmlHTTP.send(data);
        } else {
            console.log("Database connection needs an url!");
        }
    }
}