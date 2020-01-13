import * as ArrayHelper from "../helper/array";
import jaWords from "./japanese-words";
import jaEntities from "./japanese-entities";
import saWords from "./sanskrit-words";

export function readMatcingWords(kanji) {
  return matchEntitiesFromData(jaWords, kanji);
}

export function readMatcingNames(kanji) {
  return matchEntitiesFromData(jaEntities, kanji);
}

export function readMatcingSanskritWords(devanagari) {
  return matchEntitiesFromData(saWords, devanagari);
}

function matchEntitiesFromData(data, kanji) {
  return ArrayHelper.findMatches(readEntities(data), kanji);
}

function readEntities(data) {
  return Object.keys(data);
}
