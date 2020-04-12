type RCall = string; // matches /.+\(.*\)/
type RArg = string | number | boolean | undefined;
type RKwarg = [string, RArg | RCall];
function jsArgTypeToRLiteral(arg) {
  switch (typeof arg) {
    case "string":
      return arg.match(/^.+\(.*\)$/) ? arg : `"${arg}"`;
    case "number":
      return arg;
    case "boolean":
      return arg ? "TRUE" : "FALSE";
    case "undefined":
      return "NA";
  }
}

export function Rcall(cmd, ...args: Array<RArg | RKwarg | RCall>): RCall {
  return cmd + "(" + args.map((arg) => (Array.isArray(arg) ? `${arg[0]}=${jsArgTypeToRLiteral(arg[1])}` : `${jsArgTypeToRLiteral(arg)}`)).join(",") + ")";
}

export function Rscript(rcmd) {
  return `Rscript -e '${rcmd}'`;
}
