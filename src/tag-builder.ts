import jaWords from "../data/japanese-words.json";
import jaNames from "../data/japanese-entities.json";
import saWords from "../data/sanskrit-words.json";

export function buildAnchor(content: string, url: string) {
  var anchor = builder("a", content)();
  anchor.setAttribute("href", url);
  return anchor;
}

export function buildSpan(content: string): HTMLSpanElement {
  return builder("span", content)();
}

export function buildP(content) {
  return builder("p", content)();
}

function buildDiv() {
  return builder("div")();
}

export function buildDelP(content) {
  var pTag = builder("p", content)();
  return wrapInTag(pTag, "del");
}

export function buildTable() {
  return builder("table")();
}

export function buildTableHeader(content) {
  return builder("th", content)();
}

export function buildTableData(content) {
  return builder("td", content)();
}

export function createCaptionTag(content) {
  return builder("caption", content)();
}

export function builder(tagName: string, content?: string) {
  return function() {
    var tag = document.createElement(tagName);
    if (content) {
      tag.innerHTML = content;
    }
    return tag;
  };
}

export function buildWordDfnTag(word) {
  var dfnTag = builder("dfn")();
  var wordData = jaWords[word];
  if (wordData == undefined) {
    return buildNameDfnTag(word);
  }
  dfnTag.setAttribute("lang", "ja");
  dfnTag.setAttribute("word", word);
  dfnTag.setAttribute("reading", wordData[0]);
  dfnTag.setAttribute("ja", wordData[1]);
  dfnTag.setAttribute("en", wordData[2]);
  return dfnTag;
}

export function buildNameDfnTag(name) {
  var dfnTag = builder("dfn")();
  var nameData = jaNames[name];
  dfnTag.setAttribute("lang", "ja");
  dfnTag.setAttribute("name", name);
  if (nameData == undefined) {
    return builder("dfn", name)();
  }
  dfnTag.setAttribute("reading", nameData[0]);
  dfnTag.setAttribute("ja", nameData[1]);
  dfnTag.setAttribute("tag", nameData[2]);
  dfnTag.className = nameData[3];
  dfnTag.innerHTML = "»" + name;
  return dfnTag;
}

export function buildSanskritDfnTag(word) {
  var dfnTag = builder("dfn")();
  var sanskritWordsData = saWords[word.replace(/ /g, "_")];
  dfnTag.setAttribute("word", word);
  if (sanskritWordsData == undefined) {
    return builder("dfn", word)();
  }
  dfnTag.setAttribute("lang", "sa");
  dfnTag.setAttribute("iast", sanskritWordsData[0]);
  dfnTag.setAttribute("definition", sanskritWordsData[1]);
  dfnTag.setAttribute("etymology", sanskritWordsData[2]);
  dfnTag.className = "sanskrit " + sanskritWordsData[3];
  dfnTag.innerHTML = "›" + word;
  return dfnTag;
}

export function buildWriterSection(id) {
  var writerTag = builder("section")();
  writerTag.id = id;
  return writerTag;
}

export function buildReaderP(id) {
  var pTag = builder("p")();
  pTag.id = id;
  pTag.setAttribute("hidden", "true");
  return pTag;
}

export function buildScript(content) {
  return builder("script", content)();
}

export function buildDetailsTag(detailsText, summaryText, lang = "en") {
  var detailsElement = builder("details", detailsText)();
  if (Boolean(summaryText)) {
    var summaryElement = builder("summary", summaryText)();
    detailsElement.insertAdjacentElement("afterbegin", summaryElement);
  }
  detailsElement.setAttribute("lang", lang);
  return detailsElement;
}

export function buildBr() {
  return builder("br")();
}

function wrapInTag(tag, wrapperTagName) {
  return insertElement(builder(wrapperTagName)(), tag);
}

export function stackBuilder(tags) {
  return tags.reduce(function(divTag, tag) {
    return insertElement(divTag, tag);
  }, buildDiv());
}

export function spaceSpanBuilder() {
  return builder("span", " ")();
}

export function delWrap(content) {
  return content ? ["<del>", content, "</del>"].join("") : content;
}

function insertElement(element, adjacentElement) {
  element.insertAdjacentElement("beforeEnd", adjacentElement);
  return element;
}

export function buildLetter(data) {
  return buildPairs(data).reduce(appendDlPair, builder("dl")());
}

function appendDlPair(dl, pair) {
  if (pair[1]) {
    dl.insertAdjacentElement("beforeEnd", builder("dt", pair[0] + "：")());
    dl.insertAdjacentElement("beforeEnd", builder("dd", pair[1])());
  }
  return dl;
}

function buildTimeMarkUp(time) {
  return ["<time>", time, "</time>"].join("");
}

function buildContentMarkUp(contentArray) {
  return contentArray.join("<br />");
}

function buildPairs(letterData) {
  return [
    ["差出人", letterData.from],
    ["受取人", letterData.to],
    ["日付", buildTimeMarkUp(letterData.time)],
    ["件名", letterData.topic],
    ["送信元", letterData.origin],
    ["内容", buildContentMarkUp(letterData.contents)]
  ];
}
