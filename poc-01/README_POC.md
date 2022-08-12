# Proof Of Concept 01

Based on the ideas from:
https://medium.com/storybookjs/building-a-front-end-project-with-react-tailwindcss-and-storybook-742bdb1417da

## Installation

### Create React App:

```
npx create-react-app poc-01 --template typescript
cd poc-01
```

### Install Tailwind

```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Install a Tailwind based UI library

```
npm install daisyui react-daisyui
```

### Update tailwind.config.js

```
module.exports = {
  content: [
    "node_modules/daisyui/dist/**/*.js",
    "node_modules/react-daisyui/dist/**/*.js",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
```

### Update CRA styles

I deleted the initial css files and created /src/styles/styles.css with this content:

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Install Storybook

```
npx sb init
```

### Run CRA

```
npm run start
```

### Run Storybook

```
npm run storybook
```
