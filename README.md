# r-helper-js

Helper functions for calling R in Node.js

## Demos

## `Rcall()`

Construct a R function call as a string:

```javascript
// construct R function call (as a string) without arguments
Rcall("fun")
// --> fun()

// construct R function call with different primitive types"
Rcall("fun", 114, 5.14, true, false, ["foo", "bar"], ["baz", undefined])
// --> fun(114,5.14,TRUE,FALSE,foo="bar",baz=NA)

// construct nested call
Rcall("foo", 1, Rcall("bar", "two", Rcall("baz", true)))
// --> foo(1,bar("two",baz(TRUE)))
```

### Definition of `Rcall()`

```typescript
Rcall(Rfunction: string, ...Array< args: RArg | RKwarg | RCall >)
```

where:

```typescript
type RCall = string; // matches /.+\(.*\)/
type RArg = string | number | boolean | undefined;
type RKwarg = [string, RArg | RCall];
```

## `Rscript`

Make an Rscript command ready for execution in shell:

```typescript
Rscript(Rcall("foo", 1, Rcall("bar", "two", Rcall("baz", true))))
// Rscript -e 'foo(1,bar("two",baz(TRUE)))'
```
