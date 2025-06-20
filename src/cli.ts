import * as fs from "fs";
import * as csv from "csv-stream";
import * as fastCsv from "fast-csv";
import { Transform } from "stream";
import { rotateTable } from "./rotateTable";

const filePath = process.argv[2];
if (!filePath) {
  console.error("Error: Please provide a path to an input CSV file.");
  console.error("Usage: node cli.js <path/to/input.csv>");
  process.exit(1);
}

const rotateTransform = new Transform({
  objectMode: true,
  transform(row: any, _, callback) {
    try {
      const result = rotateTable(row);
      callback(null, result);
    } catch (err) {
      callback(err as Error);
    }
  },
});

const input = fs.createReadStream(process.argv[2]);
const parser = csv.createStream({ enclosedChar: '"' });
const formatter = fastCsv.format({
  headers: ["id", "json", "is_valid"],
  quoteColumns: { id: false, json: true, is_valid: false },
  quoteHeaders: false,
});

[input, parser, rotateTransform, formatter].forEach((stream) =>
  stream.on("error", (err) => {
    console.error("Stream error:", err.message);
    process.exit(1);
  }),
);

input.pipe(parser).pipe(rotateTransform).pipe(formatter).pipe(process.stdout);
