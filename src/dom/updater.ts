import * as DomReader from "./reader";
import * as DomWriter from "./writer";
import * as TagBuilder from "../tag-builder";
import { Expression } from "../expression";

export function insertHint(expressionText, fullTextId) {
  var hintId = "hint";
  var expression = new Expression({ text: expressionText });
  replaceClozedWLength(expression);
  buildAndInsertHint(expression, fullTextId, hintId);
}

export function insertWritingHint(expressionText, fullTextId) {
  var hintId = "writing-hint";
  var expression = new Expression({ text: expressionText });
  buildAndInsertHint(expression, fullTextId, hintId);
}

function buildAndInsertHint(expr, fullTextId, hintId) {
  var pHintTag = TagBuilder.buildWriterSection(hintId);

  DomWriter.appendTags(fullTextId, [pHintTag], "afterEnd");
  var wordSet = {
    words: [expr.text],
    writerId: hintId
  };
  DomWriter.writeDfnTags(wordSet);
}

function replaceClozedWLength(expr) {
  [].forEach.call(DomReader.readClozeSpans(), function(span) {
    replaceWithLength(span, expr);
  });
}

export function replaceWithLength(element, expression) {
  element.innerHTML = expression.dottify();
}

export function replaceRomanWord(word, element) {
  var wordRegex = new RegExp(word, "gi");
  element.innerHTML = element.innerHTML.replace(
    wordRegex,
    "<span class='cloze'>＊</span>"
  );
}
