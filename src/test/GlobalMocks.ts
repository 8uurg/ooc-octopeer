/// <reference path="../../typings/index.d.ts" />

/**
 * This class mocks global elements to enable testing on these functions.
 * @type {NodeJS.Global}
 * @private
 */

// Linting is disabled as var is required here. Let has not the proper functionality yet.
var _global: any = global; // tslint:disable-line

// A function that does nothing, used as a placeholder.
function nop() {};

_global.chrome = {
    runtime: {
        connect: function() {
            return {
                postMessage: nop
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
            set: nop,
            get: nop
        },
        onChanged: {
            addListener: nop
        }
    },
    tabs: {
        query: nop,
        reload: nop,
        create: nop,
        get: nop,
        onUpdated: {
            addListener: nop
        },
        onActivated: {
            addListener: nop
        }
    },
    browserAction: {
        setIcon: nop,
        onClicked: {
            addListener: nop
        }
    }
};

_global.XMLHttpRequest = function() {
    this.open = nop;
    this.setRequestHeader = nop;
    this.onreadystatechange = nop;
    this.send = function() {
        this.onreadystatechange();
    };
};

_global.MutationObserver = function() {
    this.disconnect = function() {};
    this.observe = function() {};
};

_global.XMLHttpRequest.prototype.status = 0;
_global.XMLHttpRequest.prototype.readyState = 0;

_global.document = {
    addEventListener:  nop,
    querySelectorAll: nop
};

_global.localStorage = nop;
_global.window = {
    addEventListener: nop,
    scrollX: 0,
    scrollY: 0
};
_global.window.innerHeight = 500;
_global.window.innerWidth = 400;
_global.window.scrollX = 0;
_global.window.scrollY = 0;

_global.OCTOPEER_CONSTANTS = {
    "standard_database_location": "http://10.0.22.6/api/",
    "database_location_key": "databaseLocation"
};

_global.main = {
    declareTrackingCollector: nop,
    declareSessionDataGatherer: nop,
    declareSemanticMappings: nop,
    declareTracker: nop,
    done: nop
};