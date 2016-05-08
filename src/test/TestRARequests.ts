///<reference path="../../typings/main.d.ts" />
import {RARequests} from '../main/js/RARequests';

/**
 * Created by Cas on 8-5-2016.
 */

describe('RESTFul API requests', () => {

    it('should create a constructor', () => expect(new RARequests("location")).not.toBeNull(true));

    it('should trigger the sendRequest when calling sendUsername', function() {

        var rarObject = new RARequests("someLocation");
        spyOn(rarObject, "sendRequest").and.callFake(function() {
            rarObject.setSend(true);
        });

        rarObject.sendUserName({"url":"someURL", "username":"someUsername"});

        expect(rarObject.getTable()).toEqual("users");
        expect(rarObject.getData()).toEqual({"url":"someURL", "username":"someUsername"});
        expect(rarObject.getSend()).toEqual(true);
    });

    it('should have an api_location set', function() {

        var rarObject = new RARequests(null);
        rarObject.sendUserName({"url":"someURL", "username":"someUsername"});

        expect(rarObject.getSend()).toEqual(false);
    });
});