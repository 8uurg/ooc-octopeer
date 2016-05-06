/**
 * Created by Cas on 6-5-2016.
 */

interface Requests {

    /**
     * The location of the RESTFul API the request has to be send to.
     */
    api_location: string;

    /**
     * Sends a request with data to the api_location with the specified table.
     * @param table - The table the data has to be stored in.
     * @param data - The data to be sent in JSON format.
     */
    sendRequest(table: string, data: Object): void;
}