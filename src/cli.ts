import * as fs from "fs";
import * as csv from "csv-stream";
import * as fastCsv from "fast-csv";
import { Transform } from "stream";
import { rotateTable } from "./rotateTable";

const rotateTransform = new Transform({
  objectMode: true,
  transform(row: any, _, callback) {
    const result = rotateTable(row);
    callback(null, result);
  },
});

fs.createReadStream(process.argv[2])
  .pipe(csv.createStream({ enclosedChar: '"' }))
  .pipe(rotateTransform)
  .pipe(
    fastCsv.format({
      headers: ["id", "json", "is_valid"],
      quoteColumns: { id: false, json: true, is_valid: false },
      quoteHeaders: false,
    }),
  )
  .pipe(process.stdout);
