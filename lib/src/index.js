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
function Rcall(cmd, args, kwargs) {
    var call = cmd + "(";
    args && (call += args.map(function (arg) { return jsArgTypeToRLiteral(arg); }).join(","));
    if (kwargs) {
        args && (call += ",");
        call += Object.keys(kwargs)
            .map(function (k) { return k + "=" + jsArgTypeToRLiteral(kwargs[k]); })
            .join(",");
    }
    return call + ")";
}
exports.Rcall = Rcall;
function Rscript(rcmd) {
    return "Rscript -e '" + rcmd + "'";
}
exports.Rscript = Rscript;
console.log(Rcall("fun", [114, 5.14, true, false], { foo: "bar", baz: undefined }));
//# sourceMappingURL=index.js.map