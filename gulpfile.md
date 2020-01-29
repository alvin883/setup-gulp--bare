## Setup

1. `npm install` or `yarn install`
2. Configure [`gulpfile.options.js`](./gulpfile.options.js) (see: [Gulp options documentation](./gulpfile.options.md))
3. Configure [`.browserslistrc`](./.browserslistrc)
4. Set babel env by creating [`.babelrc`](./.babelrc) (optional)
    ```javascript
    {
        "presets": [
            ["@babel/preset-env", { "useBuiltIns": "entry", "corejs": "2.0.0" }]
        ]
    }
    ```

## Here's some command that you can use:

1. `gulp`

    This is the default command for development.

    - Watch for `.scss`, `.js`, `.php` and recompile if there's some changes
    - Compile `.scss` and `.js`
    - Reload browser automatically if there's a change

2. `gulp watch-js`

    Watch for `.js` and recompile if there's some changes

3. `gulp compile-js`

    Compile javascript file

4. `gulp watch-sass`

    Watch for `.sass` and recompile if there's some changes

5. `gulp compile-sass`

    Compile SASS/SCSS file

6. `gulp browser-sync`

    Will reload browser automatically if there's a change

## Features

-   Support ES6 to all browsers (except import/export module)
-   Automatic prefixer for SCSS

## Disabling notifications

Make `.env` file, and insert :

```javascript
DISABLE_NOTIFIER = true;
```
