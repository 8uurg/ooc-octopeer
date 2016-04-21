"use strict";

/*
 * From https://iamalivingcontradiction.wordpress.com/2015/09/02/how-to-automate-jasmine-tests-for-typescript-with-gulp/
 */

var fs = require("fs");

function __require( file ) {
    var dir = process.cwd().concat("/target/");
    return fs.readFileSync(
        dir.concat(file),
        "utf-8"
    );
}

module.exports = __require;