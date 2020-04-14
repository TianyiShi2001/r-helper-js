export declare type RCall = string;
export declare type RArg = string | number | boolean | undefined | RCall;
export declare type RArgs = Array<RArg>;
export declare type RKwargs = {
    [k: string]: RArg;
};
export declare function Rcall(cmd: any, args?: RArgs, kwargs?: RKwargs): RCall;
export declare function Rscript(rcmd: any): string;
