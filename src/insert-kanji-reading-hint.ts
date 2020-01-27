import * as TagBuilder from "./tag-builder";
import * as DomReader from "./dom/reader";
import * as DomWriter from "./dom/writer";

var kanjiReaderId = "kanji-reader";
var wagoReaderId = "wago-reader";
var kangoReaderId = "kango-reader";
var chigaiReaderId = "chigai-reader";
var oldWagoReaderId = "old-wago-reader";
var oldKangoReaderId = "old-kango-reader";
var oldChigaiReaderId = "old-chigai-reader";
var wagoNumId = "wago-number-reader";
var kangoNumId = "kango-number-reader";
var writerId = "kanji-data-writer";

DomWriter.appendTags(writerId, [buildKanjiHintSpan()]);

function buildKanjiHintSpan() {
  var wagoHint = buildHint(wagoSymbolSpan(), wagoNumId, wagoIsPresent());
  var kangoHint = buildHint(kangoSymbolSpan(), kangoNumId, kangoIsPresent());
  var hints = [wagoHint, kangoHint].filter(Boolean).join(delAnd());
  if (hints == "") {
    return TagBuilder.buildSpan("");
  }
  return TagBuilder.buildSpan([delLeftPara(), hints, delRightPara()].join(""));
}

function buildHint(readingSymbol, numId, isPresent) {
  var hintNum = readContents(numId);
  if (hintNum) {
    return readNumSpan(hintNum) + readingSymbol;
  }
  return isPresent ? readingSymbol : "";
}

function readNumSpan(num) {
  return buildSpanString(num, "class='reading-no'");
}

function wagoSymbolSpan() {
  return buildSpanString("訓", "id='kunyomi'");
}

function kangoSymbolSpan() {
  return buildSpanString("音", "id='onyomi'");
}

function buildSpanString(content, extra) {
  var attributes = extra ? extra : "";
  return ["<span ", attributes, ">", content, "</span>"].join("");
}

function wagoIsPresent() {
  return readingIsAvailable(wagoReaderId, oldWagoReaderId);
}

function kangoIsPresent() {
  return readingIsAvailable(kangoReaderId, oldKangoReaderId);
}

function readingIsAvailable(readerId, oldReaderId) {
  var reading = readContents(readerId);
  var oldReading = readContents(oldReaderId);
  return [reading, oldReading].filter(Boolean).length > 0;
}

function delAnd() {
  return TagBuilder.delWrap("と");
}

function delLeftPara() {
  return TagBuilder.delWrap("(");
}

function delRightPara() {
  return TagBuilder.delWrap(")");
}

function readContents(id) {
  return DomReader.readTagContents(id);
}
