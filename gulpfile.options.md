### SASS Options Object

| Option     | Type    | Default | Description                       |
| ---------- | ------- | ------- | --------------------------------- |
| src        | array   | []      | list of scss input file           |
| watch      | array   | []      | list of file that will be watched |
| distFolder | string  | ""      | destination for output bundle     |
| minify     | boolean | false   | whether use minify or not         |
| sourcemap  | boolean | false   | whether use sourcemap or not      |

> ##### Note:
>
> Browser Support defined in [`.browserslistrc`](.browserslistrc)

##### Example SASS Options

```javascript
module.exports = {
    sass: {
        src: [
            "./assets/css/src/wp-admin.scss",
            "./assets/css/src/wp-login.scss",
            "./assets/css/src/styles.scss"
        ],
        watch: [
            "./assets/css/src/**/*.scss",
            "!./assets/css/src/not-watch.scss"
        ],
        distFolder: "./assets/css/dist",
        minify: true,
        sourcemap: true
    }
};
```

### Javascript Options Object

| Option     | Type                       | Default | Description                       |
| ---------- | -------------------------- | ------- | --------------------------------- |
| list       | array of [jslist](#jslist) | []      | list of bundle                    |
| watch      | array                      | []      | list of file that will be watched |
| distFolder | string                     | ""      | destination for output bundle     |
| minify     | boolean                    | false   | whether use minify or not         |
| sourcemap  | boolean                    | false   | whether use sourcemap or not      |

> ##### Note:
>
> Browser Support defined in [`.browserslistrc`](.browserslistrc)

<h5 id="jslist">JS List Object</h5>

| Key  | Type   | Default | Description                       |
| ---- | ------ | ------- | --------------------------------- |
| name | string | ""      | Name for output bundle file       |
| src  | array  | []      | List of input file for the bundle |

##### Example Javascript Options

```javascript
module.exports = {
    javascript: {
        list: [
            {
                name: "themes",
                src: [
                    "./assets/js/src/themes/home.js",
                    "./assets/js/src/themes/about.js"
                ]
            },
            {
                name: "single-file",
                src: ["./assets/js/src/single-file.js"]
            },
            {
                name: "vendors",
                src: [
                    "./node_modules/jquery/dist/jquery.js",
                    "./assets/js/src/vendors/jquery-ui.js"
                ]
            }
        ],
        watch: ["./assets/js/src/**/*.js", "!./assets/js/src/not-watch.js"],
        distFolder: "./assets/js/dist",
        minify: true,
        sourcemap: true
    }
};
```

### BrowserSync Options Object

| Option | Type                                                            | Default | Description                       |
| ------ | --------------------------------------------------------------- | ------- | --------------------------------- |
| watch  | array                                                           | []      | list of file that will be watched |
| config | [browser-sync options](https://www.browsersync.io/docs/options) |         | browser sync options              |

> #### Note:
>
> You should change `proxy` and `host` options to URL of your local server
