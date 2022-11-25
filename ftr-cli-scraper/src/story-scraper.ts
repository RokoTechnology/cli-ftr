import playwright from "playwright-core";

export type Story = {
  id: string;
  name: string;
  title: string;
  html: string;
};

export type StoryWithHTML = Story & {
  html: string;
};

/**
 * Get stories
 * Looks at the url of a storybook and grabs a list of all stories from the window object
 * @param page Page – a playwright page
 * @param url string – the url to scrape the stories from
 * @param verbose boolean – output additional information while runnning
 * @returns Promise<{[key: string]: Story}> – a promise of an object of stories
 */

export interface getStoriesProps {
  page: playwright.Page;
  url: string;
  verbose?: boolean;
}

export type getStoriesReturn = Promise<{
  [key: string]: Story;
}>;

const getStories = async ({
  page,
  url,
  verbose,
}: getStoriesProps): getStoriesReturn => {
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
      window.CONFIG_TYPE === "PRODUCTION"
    ) {
      return JSON.stringify(
        window &&
          window[0] &&
          // @ts-ignore
          window[0].__STORYBOOK_STORY_STORE__ &&
          // @ts-ignore
          window[0].__STORYBOOK_STORY_STORE__.storyIndex &&
          // @ts-ignore
          window[0].__STORYBOOK_STORY_STORE__.storyIndex.stories,
        null,
        2
      );
    } else {
      // @ts-ignore
      return JSON.stringify(window.CONFIG_TYPE);
    }
  });

  return JSON.parse(_storiesJSON);
};

/**
 * Get HTML of a single story
 * Looks at the url of a single Storybook storyand grabs the rendered HTML
 * @param page Page – a playwright page
 * @param url string – The url of the page to scrape
 * @param verbose boolean – output additional information while runnning
 * @returns Promise<string> – a promise of a string containing the html of the scraped component
 */

export interface getStoryHTMLProps {
  page: playwright.Page;
  url: string;
  verbose?: boolean;
}

export type getStoryHTMLReturn = Promise<string>;

const getStoryHMTL = async ({
  page,
  url,
  verbose,
}: getStoryHTMLProps): getStoryHTMLReturn => {
  await page.goto(url, { waitUntil: "load" });

  const storyElement = page.frameLocator("iframe").locator("#root");

  const storyElementHTML = await storyElement.evaluate(
    (node: HTMLElement) => node.innerHTML
  );

  return storyElementHTML;
};

/**
 * Scrape stories from a Storybook
 * Loads the initial Storybook page and grabs a list of all stories, then sequentially loads the stories and scrapes the HTML, returns it as an array
 * @param url string – The url of the page to scrape
 * @param verbose boolean – output additional information while runnning
 * @returns Promise<StoryWithHTML[]> - a promise of an array of stories with HTML
 */

export interface scrapeStoriesFromURLProps {
  url: string;
  verbose?: boolean;
}

export type scrapeStoriesFromURLReturn = Promise<StoryWithHTML[]>;

const scrapeStoriesFromURL = async ({
  url,
  verbose,
}: scrapeStoriesFromURLProps): scrapeStoriesFromURLReturn => {
  const browser = await playwright.chromium.launch();
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

  const storyDetails: StoryWithHTML[] = [];

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

export { scrapeStoriesFromURL, getStories, getStoryHMTL };
