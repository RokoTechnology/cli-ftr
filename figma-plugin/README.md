# react-figma boilerplate

A basic template to start working with [react-figma](https://www.npmjs.com/package/react-figma) package

The template includes:

- Basic file structure
- TypeScript configuration
- Webpack configuration

## Quick start

- clone repository from GitHub

  ```
  git clone https://github.com/react-figma/react-figma-boilerplate.git <your project name>
  ```

- install node modules either with `Yarn` or `npm`

  Yarn:

  ```
  cd <your project name>
  yarn
  ```

  npm:

  ```
  cd <your project name>
  npm install
  ```

- run

  Yarn:

  ```
  yarn webpack:watch
  ```

  npm:

  ```
  cd <your project name>
  npm run webpack:watch
  ```

- hot reload

  ```
  brew install modd
  ```

  Then to tell modd what to watch, add modd.conf to your project:

  ```
  ** !dist/** !lib/** !node_modules/** {
      prep: yarn build
      prep: ./applescript.sh
  }
  ```

  The first line is a file matching pattern which says "Hey modd, watch all file except files under dist, lib and node_modules". When modd detects a change, it executes each of the prep command in sequence. The first one runs webpack which bundles our plugin UI js. The second is a shell script which contains an apple script which tells OS X to bring the Figma desktop app to the foreground i.e. activate it and sends it the command + option + p shortcut which tells Figma to re-run the last plugin. There are 2 caveats with the apple script:

  You need to use OS X and give the terminal app security access to accessibility.
  You'll need to run your plugin manually once first otherwise the command+option+p shortcut doesn't have anything to re-run.
  To run modd, just type modd in the terminal. I aliased this as yarn build in my project.

## Export Stories

Go to your storybook project.
Make sure you have built your storybook to `storybook-static` already, or do so.
Then, run:

```
npx -p @storybook/cli@next sb extract
```

This command extracts a stories.json
