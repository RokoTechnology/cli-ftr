"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const yargs_1 = __importDefault(require("yargs"));
const story_scraper_1 = require("./story-scraper");
const uriOption = {
    type: "string",
    describe: "The uri of the storybook. Can be a dev or prod storybook.",
    demand: true,
    alias: "u",
};
const outputOption = {
    type: "string",
    describe: "The file to write the json output to.",
    demand: false,
    alias: "o",
    default: "stories.json",
};
const verboseOption = {
    type: "boolean",
    describe: "Log additional information.",
    demand: false,
    alias: "v",
    default: false,
};
const argv = (0, yargs_1.default)(process.argv.slice(2))
    .usage("ftr-cli -u http://localhost:6006 -o stories.json")
    .options({
    uri: uriOption,
    output: outputOption,
    verbose: verboseOption,
})
    .help()
    .parseSync();
const main = async () => {
    let start = 0;
    let end = 0;
    if (argv.verbose) {
        start = new Date().getTime();
        console.log("Scraping stories from", argv.uri);
        console.log("Saving stories to", argv.output);
        console.log("---");
    }
    const storyDetails = await (0, story_scraper_1.scrapeStoriesFromURL)({
        url: argv.uri,
        verbose: argv.verbose,
    });
    await fs_1.default.promises.writeFile(argv.output, JSON.stringify(storyDetails, null, 2));
    if (argv.verbose) {
        end = new Date().getTime();
        const d = new Date(Date.UTC(0, 0, 0, 0, 0, 0, end - start)), parts = [d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds()], formatted = parts.map((s) => String(s).padStart(2, "0")).join(":");
        console.log("---");
        console.log("Time spent scraping:", formatted);
        console.log("Output saved to", argv.output);
    }
};
main();
