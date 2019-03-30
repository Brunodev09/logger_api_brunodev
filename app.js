/*
Author: Bruno Mayol Giannotti

Date: 03/2019

Software: A simples nodejs logger for APIs

*/

module.exports = logger;

var promise = require('bluebird');

// Colors def
const Reset = "\x1b[0m"
const Bright = "\x1b[1m"
const Dim = "\x1b[2m"
const Underscore = "\x1b[4m"
const Blink = "\x1b[5m"
const Reverse = "\x1b[7m"
const Hidden = "\x1b[8m"

const FgBlack = "\x1b[30m"
const FgRed = "\x1b[31m"
const FgGreen = "\x1b[32m"
const FgYellow = "\x1b[33m"
const FgBlue = "\x1b[34m"
const FgMagenta = "\x1b[35m"
const FgCyan = "\x1b[36m"
const FgWhite = "\x1b[37m"

const BgBlack = "\x1b[40m"
const BgRed = "\x1b[41m"
const BgGreen = "\x1b[42m"
const BgYellow = "\x1b[43m"
const BgBlue = "\x1b[44m"
const BgMagenta = "\x1b[45m"
const BgCyan = "\x1b[46m"
const BgWhite = "\x1b[47m"

// Error handlers
var error = {
    actionNotFound: "Action not found. Avaiable actions are: error, warning and info",
    typeError: "All paramaters must be of the type String"
}

var color = null;
var app = null;


/*
@action -> String -> "error", "warning" or "info" are permitted
@application -> String -> Any string that describes the name and/or/module of your application
@message -> String -> Any string describing the log
@return -> Promise -> Returns a promise with a customized console.log function
*/

function logger($action, $application, $message) {

    return promise.try(promiseCheckValid)
        .then(promiseCheckAction)
        .then(promiseMakeApp)
        .then(promiseExecute)
        .catch(promiseError);

    function promiseCheckValid() {
        if (typeof $action !== "string" || typeof $application !== "string" || typeof $message !== "string") {
            throw error.typeError;
        }
        else return;
    }


    function promiseCheckAction() {

        switch($action) {
            case "error":
               color = FgRed;
               break;
           case "warning":
               color = FgYellow;
               break;
           case "info":
               color = FgGreen;
               break;
           default: 
               color = FgGreen;
               break;
       }
           if ($action !== "error" && $action !== "warning" && $action !== "info") {
                throw error.actionNotFound;
           }
           else {
                return true;
           }
    }

    function promiseMakeApp(result) {
        if (result !== undefined && result !== null) {
            if (result) {
                var app = "[SERVER]: At ".concat($application);
                return app;
            }
        }
    }

    function promiseExecute(result) {
        $application = result;
        if ($application !== undefined && $application !== null) {
            console.log(color, $application + " " + $message);
        }
    }

    function promiseError(ex) {
        console.log(ex);
        return ex;
    }


}