/**
 * Created by Cas on 6-5-2016.
 *  * This interface is used to define the JSON for a user accepted by the RESTFul API.
 */

interface UserJSON {

    /**
     * The url to the repository of the user.
     */
    url:        string;

    /**
     * The username of the user on BitBucket.
     */
    username:   string;
}