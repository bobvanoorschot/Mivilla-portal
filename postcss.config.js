const postcssPresetEnv = require('postcss-preset-env');
const postCssImport = require('postcss-import');
const postCssNested = require('postcss-nested');
const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    postcssPresetEnv(),
    postCssImport(),
    postCssNested(),
    autoprefixer()
  ],
};
