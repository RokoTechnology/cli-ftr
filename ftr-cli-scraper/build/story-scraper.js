"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStoryHMTL = exports.getStories = exports.scrapeStoriesFromURL = void 0;
const playwright_core_1 = __importDefault(require("playwright-core"));
const getStories = async ({ page, url, verbose, }) => {
    if (verbose) {
        console.log("Scraping stories list");
    }
    await page.goto(url, { waitUntil: "load" });
    const _storiesJSON = await page.evaluate(() => {
        // @ts-ignore
        if (
        // @ts-ignore
        window.CONFIG_TYPE === "DEVELOPMENT" ||
            // @ts-ignore
            window.CONFIG_TYPE === "PRODUCTION") {
            return JSON.stringify(window &&
                window[0] &&
                // @ts-ignore
                window[0].__STORYBOOK_STORY_STORE__ &&
                // @ts-ignore
                window[0].__STORYBOOK_STORY_STORE__.storyIndex &&
                // @ts-ignore
                window[0].__STORYBOOK_STORY_STORE__.storyIndex.stories, null, 2);
        }
        else {
            // @ts-ignore
            return JSON.stringify(window.CONFIG_TYPE);
        }
    });
    return JSON.parse(_storiesJSON);
};
exports.getStories = getStories;
const getStoryHMTL = async ({ page, url, verbose, }) => {
    await page.goto(url, { waitUntil: "load" });
    const storyElement = page.frameLocator("iframe").locator("#root");
    const storyElementHTML = await storyElement.evaluate((node) => node.innerHTML);
    return storyElementHTML;
};
exports.getStoryHMTL = getStoryHMTL;
const scrapeStoriesFromURL = async ({ url, verbose, }) => {
    const browser = await playwright_core_1.default.chromium.launch();
    const page = await browser.newPage();
    const stories = await getStories({
        page,
        url,
        verbose,
    });
    page.on("pageerror", (exception) => {
        if (verbose) {
            console.log(`Uncaught exception loading page: "${exception}"`);
        }
    });
    const storyDetails = [];
    for (const { id, name, title } of Object.values(stories)) {
        if (verbose) {
            console.log(`Scraping story "${title}/${name}"`);
        }
        const html = await getStoryHMTL({
            page,
            url: `${url}/?path=/story/${id}`,
            verbose,
        });
        storyDetails.push({
            id,
            name,
            title,
            html,
        });
    }
    await browser.close();
    return storyDetails;
};
exports.scrapeStoriesFromURL = scrapeStoriesFromURL;
