import { Rcall, Rscript } from "../lib/index";

test("Rcall constructs R function call without arguments", () => {
  expect(Rcall("fun")).toBe("fun()");
});

test("Rcall constructs R function call with different primitive types", () => {
  expect(Rcall("fun", 114, 5.14, true, false, ["foo", "bar"], ["baz", undefined])).toBe('fun(114,5.14,TRUE,FALSE,foo="bar",baz=NA)');
});

test("Rcall constructs nested call", () => {
  expect(Rcall("foo", 1, Rcall("bar", "two", Rcall("baz", true)))).toBe('foo(1,bar("two",baz(TRUE)))');
});

test("Rcall constructs nested call", () => {
  expect(Rscript(Rcall("foo", 1, Rcall("bar", "two", Rcall("baz", true))))).toBe(`Rscript -e 'foo(1,bar("two",baz(TRUE)))'`);
});
