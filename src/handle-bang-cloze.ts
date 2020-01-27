import * as DomReader from "./dom/reader";
import * as DomUpdater from "./dom/updater";

var readerId = "text-reader";

var bangHint = DomReader.readBangHint();
if (bangHint) {
  DomUpdater.insertHint(bangHint, readerId);
}
