const path = require('path');

module.exports = {
  entry: './src/script.js',
  target: "web",
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: "development"
};