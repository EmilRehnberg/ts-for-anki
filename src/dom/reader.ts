export function readWords(ids) {
  var seperator = ",";
  var wordsString = readIdsInnerHtml(ids, seperator);
  return wordsString.split(seperator).filter(Boolean);
}

function readIdsInnerHtml(ids, seperator) {
  return ids.map(readTagContents).join(seperator);
}

export function readTagContents(id: string): string {
  var element = id ? readElement(id) : undefined;
  return element ? element.innerHTML : undefined;
}

export function readClozeSpans(): HTMLCollectionOf<Element> {
  return readClassNameElements("cloze");
}

export function readClassNameElements(
  className: string
): HTMLCollectionOf<Element> {
  return document.getElementsByClassName(className);
}

export function readAnchorContent(): string {
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

export function readHintReader(): Element {
  var spans = readClassNameElements("hint-reader");
  var hint = readHintsFromSpans(spans)[0];
  return hint;
}

function readBangHintsFromSpans(
  spans: HTMLCollectionOf<Element>
): HTMLCollectionOf<Element> {
  return [].map.call(spans, readBangHintFromSpan).filter(Boolean);
}

function readHintsFromSpans(
  spans: HTMLCollectionOf<Element>
): HTMLCollectionOf<Element> {
  return [].map.call(spans, readHintFromSingleSpan).filter(Boolean);
}

function readBangHintFromSpan(span: Element) {
  var content = span.innerHTML;
  if (content == undefined) {
    return;
  }
  if (hasClozedBangHint(content)) {
    return readClozedBangHint(content);
  }
}

function readHintFromSingleSpan(span: HTMLElement): string {
  return span.innerHTML;
}

function hasClozedBangHint(content): Boolean {
  return content[1] == "!";
}

function readClozedBangHint(content: string): string {
  return content.slice(2, -1);
}

export function readFirstArticle(): Element {
  return readTags("article")[0];
}

export function readMain(): Element {
  return readTags("main")[0];
}

function readTags(name: string): HTMLCollectionOf<any> {
  return document.getElementsByTagName(name);
}

export function readElement(id: string): HTMLElement {
  return document.getElementById(id);
}

export function readBody(): HTMLElement {
  return document.body;
}
