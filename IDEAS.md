# Ideas

I think a bidirectional connection of a Storybook and a Figma component library with a shared underlying design tokens would be ideal.

Let's break that down.

## Design Tokens

Design Tokes define all basic properties of the design system, such as colors, sizes, spacings, radii, borders, shadows, fonts, etc.

## Storybook

## Figma

## Flow: Figma Components -> Design Tokens -> Storybook Components

I highly doubt this flow can be fully automated in the near future.
The implementation of components in code (in this case React) is very complex, as UI logic, states, interfaces/properties etc. have to be considered. Even if the visual parts can be generated from a Figma file, a lot of manual development work is necessary to turn it into robust components that integrate into the existing component library.

Rough flow:

- Tokens
  - Generate Style Dictionary from tokens in Figma
  - Convert Style Dictionary to Tailwind config (UI)
- Components
  - Assist in adding components taht are not present in Storybook

## Flow: Storybook Components + Design Tokens -> Figma Components

This – in theory - can be created automagically.

Rough multistep flow:

- Tokens:
  - Grab the Tailwind config for underlying tokens and convert those into a Style Dictionary
  - Update Figmas tokens from underlying Style Dictionary (via UI)
- Components
  - Traverse the Storybook stories for components. Only what is defined in storybook can be used in Figma.
  - Traverse Figma for existing components to determine CRUD.
  - Add components missing in Figma
    - Traverse the DOM of the individual component (HTML plus css)
    - Build Figma component based on DOM nesting and Tailwind classes
  - Remove components not in Storybook anymore
  - Update components where there are changes
- Linter
  - Check for inconsistencies
  - Resolve inconsistencies

A good set of general rules regarding CRUD would be essential, along the lines of "Don't remove components on either side" or "Ask before overwriting tokens" etc.
