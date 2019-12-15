import * as DataReader from "./data/Reader";
import * as DomReader from "./dom/Reader";
import * as DomWriter from "./dom/Writer";
import * as ArrayHelper from "./helper/Array";
import * as TagBuilder from "./TagBuilder";

var jaWriterId = "definitions-writer";
var namaeWriterId = "namae-writer";
var eigoWriterId = "eigo-writer";
var chigaiWriterId = "chigai-writer";
var baseWriterId = "base-data-writer";
var wagoReaderId = "wago-reader";
var kangoReaderId = "kango-reader";
var supplementaryReaderId = "corresponding-reader";
var namaeReaderId = "namae-reader";

DomWriter.writeTagsFromBuilderSets(buildSimpleContent());
DomWriter.readWordsWriteDfnTags(buildWordSets());
insertKanjiMatchingExpressions();

function insertKanjiMatchingExpressions() {
  var entityMap = buildEntityMap(readKanji());
  writeEntityMapToPlaceHolders(entityMap);
}

function buildEntityMap(kanji) {
  return idDataPairs(kanji).reduce(function(entityMap, pair) {
    entityMap[pair.id] = pair.data;
    return entityMap;
  }, {});
}

function readWords(kanji) {
  var words = DataReader.readMatcingWords(kanji);
  return ArrayHelper.rmElements(words, listedWords());
}

function readNames(kanji) {
  return DataReader.readMatcingNames(kanji);
}

function writeEntityMapToPlaceHolders(entityMap) {
  Object.keys(entityMap).forEach(function(id) {
    DomWriter.appendTextToElement(id, entityMap[id].join(","));
  });
}

function listedWords() {
  return DomReader.readWords([wagoReaderId, kangoReaderId]);
}

function readKanji() {
  return DomReader.readTagContents("kanji-reader");
}

function idDataPairs(kanji) {
  return [
    {
      id: supplementaryReaderId,
      data: readWords(kanji)
    },
    {
      id: namaeReaderId,
      data: readNames(kanji)
    }
  ];
}

function buildSimpleContent() {
  return {
    radical: {
      readerId: "radical-reader",
      writerId: baseWriterId,
      builder: TagBuilder.buildP
    },
    ja: {
      tagId: jaWriterId,
      writerId: baseWriterId,
      builder: TagBuilder.buildWriterSection
    },
    jaOldWago: {
      readerId: "old-wago-reader",
      writerId: baseWriterId,
      builder: TagBuilder.buildP
    },
    jaOldKango: {
      readerId: "old-kango-reader",
      writerId: baseWriterId,
      builder: TagBuilder.buildP
    },
    namae: {
      tagId: namaeWriterId,
      writerId: baseWriterId,
      builder: TagBuilder.buildWriterSection
    },
    chigai: {
      tagId: chigaiWriterId,
      writerId: baseWriterId,
      builder: TagBuilder.buildWriterSection
    },
    chigaiOld: {
      readerId: "old-chigai-reader",
      writerId: baseWriterId,
      builder: TagBuilder.buildDelP
    },
    story: {
      readerId: "story-reader",
      writerId: baseWriterId,
      builder: TagBuilder.buildP
    },
    eigo: {
      tagId: eigoWriterId,
      writerId: "aux-data-writer",
      builder: TagBuilder.buildWriterSection
    },
    audio: {
      readerId: "audio-reader",
      writerId: baseWriterId,
      builder: TagBuilder.buildP
    },
    supplementary: {
      tagId: supplementaryReaderId,
      writerId: "bottom",
      builder: TagBuilder.buildReaderP
    }
  };
}

function buildWordSets() {
  return {
    wago: {
      readerId: wagoReaderId,
      writerId: jaWriterId,
      seperator: TagBuilder.buildBr
    },
    kango: {
      readerId: kangoReaderId,
      writerId: jaWriterId,
      seperator: TagBuilder.buildBr
    },
    namae: {
      readerId: "namae-reader",
      writerId: namaeWriterId,
      seperator: TagBuilder.buildBr
    },
    eigoWago: {
      readerId: wagoReaderId,
      writerId: eigoWriterId,
      seperator: TagBuilder.buildBr
    },
    eigoKango: {
      readerId: kangoReaderId,
      writerId: eigoWriterId,
      seperator: TagBuilder.buildBr
    },
    chigai: {
      readerId: "chigai-reader",
      writerId: chigaiWriterId
    },
    supplementary: {
      readerId: supplementaryReaderId,
      writerId: jaWriterId
    },
    supplementaryEn: {
      readerId: supplementaryReaderId,
      writerId: eigoWriterId,
      seperator: TagBuilder.spaceSpanBuilder
    }
  };
}
