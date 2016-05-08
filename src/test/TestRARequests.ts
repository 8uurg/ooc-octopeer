///<reference path="../../typings/main.d.ts" />
import {RARequests} from '../main/js/RARequests';

/**
 * Created by Cas on 8-5-2016.
 */

describe('RESTFul API requests', () => {

    it('The constructor returns an object', () => expect(new RARequests("location")).not.toBeNull(true));

    it('The sendUsername has been successfully called', function() {

        var rarObject = new RARequests("someLocation");
        spyOn(rarObject, "sendRequest").and.callFake(function() {
            rarObject.send = true;
        });

        rarObject.sendUserName({"url":"someURL", "username":"someUsername"});

        expect(rarObject.table).toEqual("users");
        expect(rarObject.data).toEqual({"url":"someURL", "username":"someUsername"});
        expect(rarObject.send).toEqual(true);
    });

    it('The api_location was not set', function() {

        var rarObject = new RARequests(null);
        rarObject.sendUserName({"url":"someURL", "username":"someUsername"});

        expect(rarObject.send).toEqual(false);
    });
});