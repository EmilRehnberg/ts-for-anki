import * as StringHelper from "./helper/string";

export class Expression {
  length: number;
  text: string;

  constructor(spec) {
    this.text = spec.text;

    var initialNum = StringHelper.readInitialDigits(this.text);
    if (initialNum > 0) {
      this.length = initialNum;
      this.text = StringHelper.rmDigits(this.text);
    } else {
      this.length = StringHelper.rmDigits(this.text).length;
    }
  }

  dottify() {
    return StringHelper.nDots(this.length);
  }
}
