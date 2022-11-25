# ftr-cli

Figma <-> Tailwind <-> React

Scrapes stories from a running storybook instance and exports them to json. The output can be used by the `ftr-figma-plugin` to import stories (using tailwind for styling) as components to figma.

---

## Warning:

FTR in its current state is highly experimental. Please don't use the figma plugin with your production files as artboards might get deleted or changed. We recommend using an empty figma file to test this out.

---

## Description

This cli fires up a [playwright instance](https://playwright.dev/) and scrapes the given URL for storybook stories. It navigates to the site, and grabs meta information from the window object to get a list of all stories, then visits the individual story pages and reads the html in the story iframe. The resulting data is then saved in a json file.

## Getting Started

If you want to install (you don't need to) it might be best to install globally:

`npm i -g ftr-cli`

### Running ftr-cli

`npx ftr-cli -u http://localhost:6006 -o stories.json`

If you installed it you can omit the `npx`, yay.

`ftr-cli -u http://localhost:6006 -o stories.json`

### Options

| Name                       | Description                                     |
| :------------------------- | :---------------------------------------------- |
| -u <url>, --uri <url>      | the uri of the storybook that should be scraped |
| -o <file>, --output <file> | the filename of the json file that is saved     |
| -v, --verbose              | turn on verbose logging                         |
| --help                     | show help                                       |
| --version                  | show version                                    |

## Help

🤷‍♂️ Get in touch, open an issue. We'll figure something out.

## Authors

[Shremp](till@eightdaysaweek.cc)

## Version History

- 0.0.1
  - Initial Release

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Acknowledgments

- Based on this [great article](https://medium.com/geekculture/building-a-node-js-cli-with-typescript-packaged-and-distributed-via-homebrew-15ba2fadcb81)
