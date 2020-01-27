import * as DomWriter from "./dom/writer";
import * as TagBuilder from "./tag-builder";

var wordSets = {
  imi: {
    readerId: "imi-reader",
    writerId: "definitions-writer",
    seperator: TagBuilder.buildBr
  },
  yomi: {
    readerId: "yomi-reader",
    writerId: "reading-writer"
  },
  namae: {
    readerId: "namae-reader",
    writerId: "namae-writer"
  },
  eigo: {
    readerId: "imi-reader",
    writerId: "eigo-writer",
    seperator: TagBuilder.buildBr
  }
};

DomWriter.readWordsWriteDfnTags(wordSets);
