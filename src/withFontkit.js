const fontkit = require("fontkit");
const path = require("path");

const getLigatures = (font) => {
  const {
    coverage: { rangeRecords },
    ligatureSets,
  } = font.GSUB.lookupList.toArray()[0].subTables[0];

  const leadingChars = rangeRecords.reduce(
    (acc, { start, end }) => [
      ...acc,
      ...Array.from(Array(end - start + 1), (_, x) => x + start).map(
        (i) => font.stringsForGlyph(i)[0]
      ),
    ],
    []
  );

  return ligatureSets.toArray().reduce(
    (acc, ligatureSet, index) => [
      ...acc,
      ...ligatureSet.reduce((acc, ligature) => {
        return [
          ...acc,
          leadingChars[index] +
            ligature.components.map((x) => font.stringsForGlyph(x)[0]).join(""),
        ];
      }, []),
    ],
    []
  );
};

const fontPath = path.resolve(__dirname, "../fonts/matIconFont.woff2");
fontkit.open(fontPath, (err, font) => {
  console.log(getLigatures(font).join(", "));
});
