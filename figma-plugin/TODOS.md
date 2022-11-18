# TODOS

In general all components are built with [react-figma](https://react-figma.dev/docs/API). All the things here have the same limitations the react-figma components have. On top of that we parse Tailwind Classes to Figma compatible styles. This creates a second layer of things that can break. A lot of the things that are not as expected are fixable, though. This document serves as a list of things that don't work as expected and should be fixed.

## Things that are currently not working:

### Style attributes are ignored.

Currently only tailwind classes are evaluated. Mixing tailwind and style will not work as expected.

**Possible solution:**

- Get the computed style of elements, rather than parsing tw classes.

```
<!-- This is an arrow styled with css -->
<div
  class="border-bw-8 dark:border-bw-2"
  style="border-top-width: 1.5rem; border-right-width: 1.5rem; border-bottom: none; border-left-width: 1.5rem; height: 0px; width: 0px; border-left-color: transparent; border-right-color: transparent;"
/>
```

### Media directives and pseudo-classes are ignored.

Tailwind media directives such as `xs:`, `md:` or `dark:` are not respected.

**Possible solution:**

- Unclear, probably variants?

```
<!-- This is a text with different font-sizes based on screen size -->
<div class="flex flex-row flex-wrap items-center flex-1 px-6 py-2 text-bw-3 xs:text-sm sm:text-base">
  Alert! Something important.
</div>
```

### Custom values from a tailwind.config.js file

Manually created values and customizations of the stock tailwind config are not respected currently.

**Possible solution:**

- Get the computed style of elements, rather than parsing tw classes
- Parse the tailwind.config.js as well and append it to the cheatsheet for style conversion.

```
<!-- The min-height value used here is custom -->
<div id="csui-alert" class="flex flex-row bg-red-300 min-h-16">
  Content
</div>
```

### Margins are ignored

Margins are not a thing in Figma. Paddings are. So it's generally easier to work with paddings.

**Possible solution:**

- Replace something like `marginRight: 12px` with `paddingRight: 12px`. This might break in certain situations.#
- Use spacers

```
<!-- The icon has a margin on the right side -->
<div id="csui-alert" class="flex flex-row bg-red-300 min-h-16">
  <div class="flex flex-col flex-1">
    Text
  </div>
  <div class="flex flex-col items-center justify-center ml-auto mr-3">
    Icon
  </div>
</div>

```

### Using `currentColor` in SVGs does not work.

**Possible solution:**

- Detect the occurence of `currentColor` in the SVG and set the corresponding colors for fill/stroke based on the nearest text color.

```
<!-- The stroke color is set through a combination of text-bw-3 and currentColor here -->
<div class="flex flex-row w-6 h-6 cursor-pointer text-bw-3 hover:text-primary">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="2"
    stroke="currentColor"
    aria-hidden="true"
    class="w-full h-full"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M6 18L18 6M6 6l12 12"
    ></path>
  </svg>
</div>
```

### Resizing SVGs using the size of the parent element does not work.

**Possible solutions:**

- Resize the SVG frame based on the parent object's size if the parent has w-[n] or h-[n] classes.

```
<!-- The SVG should be 12px * 12px but is rendered at 24px * 24px -->
<div class="w-3 h-3">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="w-full h-full">
    ...
  </svg>
</div>
```

### Fonts are likely wrong

Figma uses Inter as it's default font family. If you are using a different font it will not be used currently.

**Possible solution:**

- There is a high likelihood that the font is already installed on the user's system and just a proper `fontFamily` value is needed.
- [Figma has a menas of loading fonts](https://dev.to/laurilllll/figma-plugin-api-how-to-load-and-use-fonts-bj2)

### FontWeight for text is cannot be set

Don't know why this does not work. Might be related to the fontFamily.

---

## Fixed:

### ~~Heavily nested cascading styles might not work.~~

For example `color` definitions higher up in the tree are not picked up on the text node.

**Possible solition:**

- Concatenate all parent styles hierarchically

```
<!-- The text "Blue Badge" will be rendered black, not blue -->
<div class="flex flex-row px-3 py-1 text-sm text-blue-800 bg-blue-100 rounded-full whitespace-nowrap dark:bg-blue-800 dark:text-blue-200">
  <div class="flex flex-col">
    Blue Badge
  </div>
  <div class="...">
    <svg>...</svg>
  </div>
</div>
```
