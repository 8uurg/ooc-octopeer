/**
 * Created by Cas on 23-4-2016.
 */
class DBConnection {

     sendMousePosition(url: string, startX: number, startY: number, startHTMLElement: string, endX: number, endY: number,
                       endHTMLElement: string, timeStart: Date, timeEnd: Date, session: string) {

        var urlWithParameters = "http://localhost:8000/api/mouse-movement-events?";
        urlWithParameters += "url:" + url + "?";
        urlWithParameters += "start_x_position:" + startX + "?";
        urlWithParameters += "start_y_position:" + startY + "?";
        urlWithParameters += "start_html_element:" + startHTMLElement + "?";
        urlWithParameters += "end_x_position:" + endX + "?";
        urlWithParameters += "end_y_position:" + endY + "?";
        urlWithParameters += "end_html_element:" + endHTMLElement + "?";
        urlWithParameters += "started_at:" + timeStart + "?";
        urlWithParameters += "ended_at:" + timeEnd + "?";
        urlWithParameters += "session:" + session;


        var xmlHTTP = new XMLHttpRequest();
         xmlHTTP.open("GET", urlWithParameters, true);
         xmlHTTP.send(null);
    }
}