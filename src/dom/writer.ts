import * as DomReader from "./reader";
import * as ArrayHelper from "../helper/array";
import * as ObjectHelper from "../helper/object";
import * as TagBuilder from "../tag-builder";

export function appendTags(id, tags, position?: string) {
  var element = DomReader.readElement(id);
  if (element == undefined) {
    return;
  }
  tags.forEach(appendTagToElementBuilder(element, position));
}

function appendTagToElementBuilder(element, position?: string) {
  return function(tag) {
    var relPosition = position ? position : "beforeend";
    element.insertAdjacentElement(relPosition, tag);
  };
}

export function appendToFirstArticle(element) {
  var lastArticle = DomReader.readFirstArticle();
  lastArticle.insertAdjacentElement("beforeend", element);
}

export function appendToBody(element) {
  DomReader.readBody().insertAdjacentElement("beforeend", element);
}

export function writeLetter(contentsMap) {
  appendToBody(TagBuilder.buildLetter(contentsMap));
}

export function writeTagsFromBuilderSets(builderSets) {
  ObjectHelper.forEach(builderSets, writeTagFromBuilderSet);
}

function writeTagFromBuilderSet(set) {
  var tag = buildContentOrPlaceHolderTag(set.builder, set.readerId, set.tagId);
  appendTags(set.writerId, [tag]);
}

function buildContentOrPlaceHolderTag(tagBuilder, readerId, tagId) {
  if (tagId) {
    return tagBuilder(tagId);
  } else {
    var content = DomReader.readTagContents(readerId);
    return tagBuilder(content);
  }
}

export function readWordsWriteDfnTags(wordSets) {
  ObjectHelper.forEach(wordSets, readWriteFromSet);
}

function readWriteFromSet(set) {
  set.words = readWords(set);
  if (set.words.length == 0) {
    return;
  }
  writeDfnTags(set);
}

export function writeDfnTags(wordSet) {
  var writerId = wordSet.writerId;
  var wordTags = buildWordTags(wordSet);
  var tagStack = TagBuilder.stackBuilder(wordTags);
  appendTags(writerId, [tagStack]);
}

function buildWordTags(wordSet) {
  var wordTags = wordSet.words.map(TagBuilder.buildWordDfnTag);
  insertSeparators(wordSet, wordTags);
  return wordTags;
}

function insertSeparators(wordSet, wordTags) {
  var seperator = wordSet.seperator;
  if (seperator) {
    ArrayHelper.insertSeparators(wordTags, seperator);
  }
}

function readWords(wordSet) {
  var readerId = wordSet.readerId;
  return DomReader.readWords([readerId]);
}

// export function writeTemplates(readerId, writerId) {
//   var templates = DomReader.readWords([readerId]);
//   templates.forEach(writeTemplateTags(writerId));
// }

// function writeTemplateTags(writerId) {
//   return function(template) {
//     var templatePath = ["_tmpl-", template].join("");
//     require([templatePath], function(tags) {
//       appendTags(writerId, tags);
//     });
//   };
// }

export function insertNameDfnToPlaceHolders(names) {
  names.forEach(findNameClassesAndInsertDfnTags);
}

function findNameClassesAndInsertDfnTags(name) {
  var placeHolders = DomReader.readClassNameElements(name);
  [].forEach.call(placeHolders, insertNameDfnToPlaceHolder(name));
}

function insertNameDfnToPlaceHolder(name) {
  return function(placeHolder) {
    var dfnTag = TagBuilder.buildNameDfnTag(name);
    placeHolder.insertAdjacentElement("beforeend", dfnTag);
  };
}

export function insertSanskritDfnToPlaceHolders(words) {
  words.forEach(findSanskritClassesAndInsertDfnTags);
}

function findSanskritClassesAndInsertDfnTags(word) {
  var placeHolders = DomReader.readClassNameElements(word.replace(" ", "_"));
  [].forEach.call(placeHolders, insertSanskritDfnToPlaceHolder(word));
}

function insertSanskritDfnToPlaceHolder(word) {
  return function(placeHolder) {
    var dfnTag = TagBuilder.buildSanskritDfnTag(word);
    placeHolder.insertAdjacentElement("beforeend", dfnTag);
  };
}

export function appendTextToElement(id, text) {
  DomReader.readElement(id).insertAdjacentText("beforeend", text);
}
