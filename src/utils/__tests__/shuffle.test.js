import shuffle from "../shuffle";

describe("shuffle function", () => {
  test("have same amount of items", () => {
    const items = ["a", "b", "c", "d", "e"];
    const shuffled = shuffle(...items);
    expect(items.length).toBe(shuffled.length);
  });
  test("have same items", () => {
    const items = ["a", "b", "c", "d", "e"];
    const shuffled = shuffle(...items);
    expect(shuffled.includes("a")).toBe(true);
    expect(shuffled.includes("b")).toBe(true);
    expect(shuffled.includes("c")).toBe(true);
    expect(shuffled.includes("d")).toBe(true);
    expect(shuffled.includes("e")).toBe(true);
  });
  test("items are not at same place", () => {
    const items = ["a", "b", "c", "d", "e"];
    const shuffled1 = shuffle(...items);
    const shuffled2 = shuffle(...items);
    expect(items).not.toEqual(shuffled1);
    expect(shuffled1).not.toEqual(shuffled2);
    expect(shuffled2).not.toEqual(items);
  });
});
