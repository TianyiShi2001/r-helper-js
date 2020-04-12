"use strict";
exports.__esModule = true;
function jsArgTypeToRLiteral(arg) {
    switch (typeof arg) {
        case "string":
            return arg.match(/^.+\(.*\)$/) ? arg : "\"" + arg + "\"";
        case "number":
            return arg;
        case "boolean":
            return arg ? "TRUE" : "FALSE";
        case "undefined":
            return "NA";
    }
}
function Rcall(cmd) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return cmd + "(" + args.map(function (arg) { return (Array.isArray(arg) ? arg[0] + "=" + jsArgTypeToRLiteral(arg[1]) : "" + jsArgTypeToRLiteral(arg)); }).join(",") + ")";
}
exports.Rcall = Rcall;
function Rscript(rcmd) {
    return "Rscript -e '" + rcmd + "'";
}
exports.Rscript = Rscript;
//# sourceMappingURL=index.js.map