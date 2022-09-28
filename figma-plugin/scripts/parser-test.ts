import cheerio from "cheerio";
import fs from "fs";
import { Component, processNode } from "../src/helpers/process-node";

const loadJSON = (path) => JSON.parse(fs.readFileSync(path).toString());

const mockData = loadJSON("./src/data/mockStories.json");

export interface Page {
  title: string;
  components: Component[];
}

mockData.forEach(([s]) => {
  const $ = cheerio.load(s.html);
  const nodes = processNode($("body").children()[0], `${s.title}-${s.name}`, $);
  console.log(nodes);
});
