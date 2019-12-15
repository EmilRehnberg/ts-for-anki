import * as ArrayHelper from "../helper/Array";
import jaWords from "./japaneseWords";
import jaEntities from "./japaneseEntities";
import saWords from "./sanskritWords";

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
