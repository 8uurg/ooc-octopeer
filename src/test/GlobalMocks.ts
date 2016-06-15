/**
 * This class mocks global elements to enable testing on these functions.
 * @type {NodeJS.Global}
 * @private
 */

// Linting is disabled as var is required here. Let has not the proper functionality yet.
var _global: any = global; // tslint:disable-line

// A function that does nothing, used as a placeholder.
function nop() {}

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
        }
    },
    tabs: {
        query: nop,
        reload: nop
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

_global.XMLHttpRequest.prototype.status = 0;
_global.XMLHttpRequest.prototype.readyState = 0;

_global.document = {
    addEventListener:  function() {},
    querySelectorAll: function() {}
};

_global.localStorage = function() {};
_global.window = {
    addEventListener: function() {},
    scrollX: 0,
    scrollY: 0
};
_global.window.innerHeight = 500;
_global.window.innerWidth = 400;
_global.window.scrollX = 0;
_global.window.scrollY = 0;

_global.OCTOPEER_CONSTANTS = {
    "database_location_key": "databaseLocation"
};

_global.main = {
    declareTrackingCollector: nop,
    declareSessionDataGatherer: nop,
    declareSemanticMappings: nop,
    declareTracker: nop,
    done: nop
}