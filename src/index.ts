export type RCall = string; // matches /.+\(.*\)/
export type RArg = string | number | boolean | undefined | RCall;
export type RArgs = Array<RArg>;
export type RKwargs = { [k: string]: RArg };
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

export function Rcall(cmd, args?: RArgs, kwargs?: RKwargs): RCall {
  let call = cmd + "(";
  args && (call += args.map((arg) => jsArgTypeToRLiteral(arg)).join(","));
  if (kwargs) {
    args && (call += ",");
    call += Object.keys(kwargs)
      .map((k) => k + "=" + jsArgTypeToRLiteral(kwargs[k]))
      .join(",");
  }
  return call + ")";
}

export function Rscript(rcmd) {
  return `Rscript -e '${rcmd}'`;
}

console.log(Rcall("fun", [114, 5.14, true, false], { foo: "bar", baz: undefined }));
