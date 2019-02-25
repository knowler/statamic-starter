const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');
const glob = require('glob-all');
const PurgecssPlugin = require('purgecss-webpack-plugin');

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
  }
}

/*
|-------------------------------------------------------------------------------
| Base configuration
|-------------------------------------------------------------------------------
|
| Set all your postcss and javascript entries here.
|
*/
mix
  .postCss('src/styles/main.css', 'css', [tailwindcss('tailwind.js')])
  .js('js/scripts/main.js', 'js');

/*
|-------------------------------------------------------------------------------
| Production configuration
|-------------------------------------------------------------------------------
| 
| The following is for production builds.
|
*/
if (mix.inProduction()) {
  mix.webpackConfig({
    plugins: [
      new PurgecssPlugin({
        paths: glob.sync([
          path.join(__dirname, '**/*.html')
        ]),
        extractors: [
          {
            extractor: TailwindExtractor,
            extensions: ['html', 'js', 'php']
          }
        ]
      })
    ]
  });
}
