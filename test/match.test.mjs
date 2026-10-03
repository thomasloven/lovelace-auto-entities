import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

const source = await readFile(new URL("../src/match.ts", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
});
const { matcher } = await import(
  `data:text/javascript,${encodeURIComponent(outputText)}`
);

for (const operator of ["!=", "!"]) {
  test(`${operator} excludes numerically equal values`, async () => {
    const match = await matcher(`${operator} 12`);
    for (const value of [12, "12", "12.0", "12.00"]) {
      assert.equal(match(value), false, `should exclude ${JSON.stringify(value)}`);
    }
    for (const value of [11, "11", 13, "13"]) {
      assert.equal(match(value), true, `should include ${JSON.stringify(value)}`);
    }
  });

  test(`${operator} compares zero, negative and fractional values`, async () => {
    for (const value of [0, -2, 1.25]) {
      const match = await matcher(`${operator}${value}`);
      assert.equal(match(String(value)), false);
      assert.equal(match(String(value + 1)), true);
    }
  });
}

for (const [operator, expected] of [
  ["<", [true, false, false]],
  ["<=", [true, true, false]],
  [">", [false, false, true]],
  [">=", [false, true, true]],
  ["=", [false, true, false]],
  ["==", [false, true, false]],
]) {
  test(`${operator} keeps its numeric comparison`, async () => {
    const match = await matcher(`${operator} 12`);
    assert.deepEqual(["11", "12", "13"].map(match), expected);
  });
}

test("literal and regular-expression filters still match strings", async () => {
  const literal = await matcher("12");
  assert.equal(literal("12"), true);
  assert.equal(literal("12.0"), false);
  const regex = await matcher("/^sensor\\.demo_/");
  assert.equal(regex("sensor.demo_one"), true);
  assert.equal(regex("sensor.other"), false);
});
