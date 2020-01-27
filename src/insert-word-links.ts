import * as DomReader from "./dom/reader";
import * as DomWriter from "./dom/writer";
import * as ArrayHelper from "./helper/array";
import * as StringHelper from "./helper/string";
import * as TagBuilder from "./tag-builder";

function mkWordATags(words) {
  return words.map(buildAnchor);
}

function buildAnchor(word) {
  return TagBuilder.buildAnchor(word, wordDictUrl(word));
}

function wordDictUrl(expression) {
  var parsedExpression = StringHelper.rmDigits(expression);
  return [
    "http://dictionary.goo.ne.jp/srch/all",
    parsedExpression,
    "m0u/"
  ].join("/");
}

var outId = "word-links-writer";
var articleId = "auxiliary";

var wordElementsIds = DomReader.readWords(["link-reader-ids"]);
var words = DomReader.readWords(wordElementsIds);

if (words.length != 0) {
  var wordATags = mkWordATags(words);
  var detailsElement = TagBuilder.buildDetailsTag("", "単語リンク");
  detailsElement.id = outId;
  DomWriter.appendTags(articleId, [detailsElement]);

  var tags = ArrayHelper.insertSeparators(
    wordATags,
    TagBuilder.builder("span", " ")
  );
  DomWriter.appendTags(outId, tags);
}
