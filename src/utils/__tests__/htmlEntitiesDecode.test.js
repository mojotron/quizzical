import htmlEntitiesDecode from "../htmlEntitiesDecode";

describe("htmlEntitiesDecode function", () => {
  test("return same string when there are no entities", () => {
    expect(htmlEntitiesDecode("hello, world")).toBe("hello, world");
  });
  test("returns valid string", () => {
    expect(htmlEntitiesDecode("&quot;hello world&quot;")).toBe('"hello world"');
  });
  test("returns valid string only entities", () => {
    expect(htmlEntitiesDecode("&lt;&#38;&pound;&#174;")).toBe("<&£®");
  });
});
