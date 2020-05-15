# font-ligatures-examples

From a font file, generate a string array of ligatures.

## Examples

See [`src/withFontkit.js`](src/withFontkit.js)

```js
const fontkit = require('fontkit');
const getLigatures = (font) => { ... };
const font = fontkit.openSync('matIconFont.woff');
console.log(getLigatures(font).join(", "));
// [3d_rotation, 360, desktop_access_disabled, domain_verification, ...]
});
```

## Why?

If you're creating design systems, you may have a component specifically for rendering icons, and that component may depend on a font file that uses ligatures to display icons.

You may want to create a TypeScript interface of the union of all possible ligatures for your font, providing intelliense and a generally superior developer experience to the consumers of your design system.
