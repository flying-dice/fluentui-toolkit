const jsdoc2md = require("jsdoc-to-markdown");
const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");

const dirs = ["inputs", "dialogs", "pickers", "theming", "logger"];

const template = Handlebars.compile(
  fs.readFileSync(path.resolve(__dirname, "api-template.stories.mdx.hbs")).toString(),
  { noEscape: true }
);

dirs.forEach((group) => {
  let apimd;
  try {
    apimd = fs.readFileSync(path.resolve(__dirname, `../src/${group}/API.md`)).toString();
  } catch (e) {
    apimd = "";
  }
  const data = {
    group,
    apimd,
    jsdocmd: jsdoc2md.renderSync({
      files: path.resolve(__dirname, `../dist/${group}/*`),
    }),
  };

  fs.writeFileSync(path.resolve(__dirname, `../src/${group}/API.stories.mdx`), template(data));
});
