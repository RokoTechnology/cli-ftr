import fs from "fs";
import yargs from "yargs";
import { scrapeStoriesFromURL } from "./story-scraper";

interface Arguments {
  uri: string;
  output: string;
  verbose?: boolean;
}

const uriOption: yargs.Options = {
  type: "string",
  describe: "The uri of the storybook. Can be a dev or prod storybook.",
  demand: true,
  alias: "u",
};

const outputOption: yargs.Options = {
  type: "string",
  describe: "The file to write the json output to.",
  demand: false,
  alias: "o",
  default: "stories.json",
};

const verboseOption: yargs.Options = {
  type: "boolean",
  describe: "Log additional information.",
  demand: false,
  alias: "v",
  default: false,
};

const argv = yargs(process.argv.slice(2))
  .usage("ftr-cli -u http://localhost:6006 -o stories.json")
  .options({
    uri: uriOption,
    output: outputOption,
    verbose: verboseOption,
  })
  .help()
  .parseSync() as Arguments;

const main = async () => {
  let start: number = 0;
  let end: number = 0;

  if (argv.verbose) {
    start = new Date().getTime();
    console.log("Scraping stories from", argv.uri);
    console.log("Saving stories to", argv.output);
    console.log("---");
  }

  const storyDetails = await scrapeStoriesFromURL({
    url: argv.uri,
    verbose: argv.verbose,
  });
  await fs.promises.writeFile(
    argv.output,
    JSON.stringify(storyDetails, null, 2)
  );

  if (argv.verbose) {
    end = new Date().getTime();
    const d = new Date(Date.UTC(0, 0, 0, 0, 0, 0, end - start)),
      parts = [d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds()],
      formatted = parts.map((s) => String(s).padStart(2, "0")).join(":");
    console.log("---");
    console.log("Time spent scraping:", formatted);
    console.log("Output saved to", argv.output);
  }
};

main();
