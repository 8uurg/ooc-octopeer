/**
 * Created by Cas on 18-5-2016.
 */
var glob: any = global; // tslint:disable-line

glob.chrome = {
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

glob.XMLHttpRequest = function() {
    this.open = function() {};
    this.setRequestHeader = function() {};
    this.onreadystatechange = function() {};
    this.send = function() {
        this.onreadystatechange();
    };
};

glob.XMLHttpRequest.prototype.status = 0;
glob.XMLHttpRequest.prototype.readyState = 0;

glob.document = {
    addEventListener:  function() {}
};
