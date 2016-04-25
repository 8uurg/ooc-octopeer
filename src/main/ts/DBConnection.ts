/**
 * Created by Cas on 23-4-2016.
 */
class DBConnection {

    sessionSetup(sessionID: string, user_hash: string) {
        var xmlHTTP = new XMLHttpRequest();
        xmlHTTP.open("POST", "http://localhost:8000/api/session/", true);
        xmlHTTP.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlHTTP.send({"session": sessionID, "user_hash": user_hash, "platform": "bitbucket"});
    }
}