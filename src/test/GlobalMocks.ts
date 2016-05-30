/**
 * Created by Cas on 18-5-2016.
 */
 // Linting is disabled as var is required here. Let has not the proper functionality yet.
var _global: any = global; // tslint:disable-line

_global.chrome = {
    runtime: {
        connect: function() {
            return {
                postMessage: function() {}
            };
        },
        onConnect: {
            addListener: function() {
                return {
                    onMessage: {}
                };
            }
        }
    },
    storage: {
        sync: {
            set: function () {},
            get: function () {}
        }
    }
};

_global.XMLHttpRequest = function() {
    this.open = function() {};
    this.setRequestHeader = function() {};
    this.onreadystatechange = function() {};
    this.send = function() {
        this.onreadystatechange();
    };
};

_global.XMLHttpRequest.prototype.status = 0;
_global.XMLHttpRequest.prototype.readyState = 0;

_global.document = {
    addEventListener:  function() {}
};

_global.localStorage = function() {};
_global.window = {
    addEventListener: function() {},
    scrollX: 0,
    scrollY: 0
};
_global.window.innerHeight = 500;
_global.window.innerWidth = 400;

_global.OCTOPEER_CONSTANTS = {};
