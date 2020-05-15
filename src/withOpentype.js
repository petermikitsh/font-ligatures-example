const opentype = require("opentype.js");
const path = require("path");

const getLigatures = (font) => {
  const { glyphIndexMap } = font.tables.cmap;
  const glyphs = Object.entries(glyphIndexMap).reduce((obj, [key, value]) => {
    return {
      ...obj,
      [value]: key,
    };
  }, {});
  const { ligatureSets, coverage } = font.tables.gsub.lookups[0].subtables[0];
  const ligatures = ligatureSets.reduce((acc, set, index) => {
    const firstChar = String.fromCharCode(glyphs[coverage.glyphs[index]]);
    return [
      ...acc,
      ...set.map((ligature) => {
        const name = ligature.components
          .map((component) => String.fromCharCode(glyphs[component]))
          .join("");
        return firstChar + name;
      }),
    ];
  }, []);
  return ligatures;
};

(async () => {
  const fontPath = path.resolve(__dirname, "../fonts/singleGlyph.woff");
  const font = await opentype.load(fontPath);
  console.log(getLigatures(font).join(", "));
})();
