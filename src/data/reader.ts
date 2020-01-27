import * as ArrayHelper from "../helper/array";
import jaWords from "../../data/japanese-words.json";
import jaEntities from "../../data/japanese-entities.json";
import saWords from "../../data/sanskrit-words.json";

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
