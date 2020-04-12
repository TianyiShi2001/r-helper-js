# r-helper-js

Helper functions for calling R in Node.js

## Installation

```bash
npm i r-helper
```

```typescript
import { Rcall, Rscript } from 'r-helper';
```

## Demos

## `Rcall()`

Construct a R function call as a string:

```javascript
// construct R function call (as a string) without arguments
Rcall("fun")
// --> fun()

// construct R function call with different primitive types"
Rcall("fun", [114, 5.14, true, false], { foo: "bar", baz: undefined })
// --> fun(114,5.14,TRUE,FALSE,foo="bar",baz=NA)

// construct nested call
Rcall("foo", [1, Rcall("bar", ["two", Rcall("baz", [true])])])
// --> foo(1,bar("two",baz(TRUE)))
```

### Signature of `Rcall()`

```typescript
function Rcall(Rfunction, args?: RArgs, kwargs?: RKwargs): RCall {/*...*/}
```

where:

```typescript
type RCall = string; // matches /.+\(.*\)/
type RArg = string | number | boolean | undefined | RCall;
type RArgs = Array<RArg>;
type RKwargs = { [k: string]: RArg };
```

## `Rscript`

Make an Rscript command ready for execution in shell:

```typescript
Rscript(Rcall("foo", [1, Rcall("bar", ["two", Rcall("baz", [true])])]))
// Rscript -e 'foo(1,bar("two",baz(TRUE)))'
```
