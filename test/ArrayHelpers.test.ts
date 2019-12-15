import * as ArrayHelpers from "../src/ArrayHelpers";

describe("array helpers", () => {
  it("concatinate elements", async () => {
    expect(ArrayHelpers.concat([1, 2], 3)).toStrictEqual([1, 2, 3]);
    expect(ArrayHelpers.concat(["a", "b"], "c")).toStrictEqual(["a", "b", "c"]);
  });

  it("finds matching elements", async () => {
    expect(
      ArrayHelpers.findMatches(["zhengzhi1", "zhengzhi2", "tongyi"], "zhengzhi")
    ).toStrictEqual(["zhengzhi1", "zhengzhi2"]);
  });

  it("inserts seperators", async () => {
    expect(
      ArrayHelpers.insertSeparators(["kuzi", "xuezi", "shenchan"], () => "he")
    ).toStrictEqual(["kuzi", "he", "xuezi", "he", "shenchan"]);
  });

  it("removes elements", async () => {
    expect(ArrayHelpers.rmElements([1, 2, 3, 4, 3, 2], [2, 3])).toStrictEqual([
      1,
      4
    ]);
  });
});
