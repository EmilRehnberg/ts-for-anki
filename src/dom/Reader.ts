export function readWords(ids) {
  var seperator = ",";
  var wordsString = readIdsInnerHtml(ids, seperator);
  return wordsString.split(seperator).filter(Boolean);
}

function readIdsInnerHtml(ids, seperator) {
  return ids.map(readTagContents).join(seperator);
}

export function readTagContents(id) {
  var element = id ? readElement(id) : undefined;
  return element ? element.innerHTML : undefined;
}

export function readClozeSpans() {
  return readClassNameElements("cloze");
}

export function readClassNameElements(className) {
  return document.getElementsByClassName(className);
}

export function readAnchorContent() {
  var anchorList = readTags("a");
  if (anchorList.length != 0) {
    return anchorList[0].text;
  }
}

export function readBangHint() {
  var spans = readClozeSpans();
  var bangHints = readBangHintsFromSpans(spans);
  if (bangHints.length != 0) {
    return bangHints[0];
  }
}

export function readHintReader() {
  var spans = readClassNameElements("hint-reader");
  var hint = readHintsFromSpans(spans)[0];
  return hint;
}

function readBangHintsFromSpans(spans) {
  return [].map.call(spans, readBangHintFromSpan).filter(Boolean);
}

function readHintsFromSpans(spans) {
  return [].map.call(spans, readHintFromSingleSpan).filter(Boolean);
}

function readBangHintFromSpan(span) {
  var content = span.innerHTML;
  if (content == undefined) {
    return;
  }
  if (hasClozedBangHint(content)) {
    return readClozedBangHint(content);
  }
}

function readHintFromSingleSpan(span) {
  return span.innerHTML;
}

function hasClozedBangHint(content) {
  return content[1] == "!";
}

function readClozedBangHint(content) {
  return content.slice(2, -1);
}

export function readFirstArticle() {
  return readTags("article")[0];
}

export function readMain() {
  return readTags("main")[0];
}

function readTags(name) {
  return document.getElementsByTagName(name);
}

export function readElement(id) {
  return document.getElementById(id);
}

export function readBody() {
  return document.body;
}
