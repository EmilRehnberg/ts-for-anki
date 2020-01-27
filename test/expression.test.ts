import { Expression } from "../src/expression";

describe("expression", () => {
  var expr = new Expression({ text: "大好物" });

  it("can access text", async () => {
    expect(expr.text).toBe("大好物");
  });

  it("can dottify itself", async () => {
    expect(expr.dottify()).toBe("・・・");
  });
});
