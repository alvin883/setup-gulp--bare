require("dotenv").config();

const gulp = require("gulp");
const gulpPlumber = require("gulp-plumber");
const gulpAutoprefixer = require("gulp-autoprefixer");
const gulpSass = require("gulp-sass");
const gulpRename = require("gulp-rename");
const gulpUglify = require("gulp-uglify-es").default;
const gulpSourcemaps = require("gulp-sourcemaps");
const gulpNotify = require("gulp-notify");
const gulpIf = require("gulp-if");
const browsersync = require("browser-sync");
const browserSync = browsersync.create();
const eventStream = require("event-stream");
const gulpOptions = require("./gulpfile.options");
const gulpBabel = require("gulp-babel");
const gulpConcat = require("gulp-concat");
const path = require("path");

/**
 * Will be inserted as ptions for node-sass
 * @link https://github.com/sass/node-sass#options
 */
const sassOptions = {
    errLogToConsole: true,
    precision: 8,
    noCache: true
};

/**
 * SASS Compiler, without watcher
 */
gulp.task("compile-sass", function() {
    const { sourcemap, minify, src } = gulpOptions.sass;
    const _sassOptions = {
        ...sassOptions,
        outputStyle: minify ? "compressed" : "nested"
    };
    const onSuccess = gulpNotify({
        title: "SASS",
        message: "All Compiled!",
        onLast: true
    });

    return gulp
        .src(src)
        .pipe(gulpIf(minify, gulpRename({ suffix: ".min" })))
        .pipe(gulpSourcemaps.init())
        .pipe(gulpPlumber())
        .pipe(gulpSass(_sassOptions))
        .pipe(gulpAutoprefixer())
        .pipe(gulpIf(sourcemap, gulpSourcemaps.write(".")))
        .pipe(gulp.dest(gulpOptions.sass.distFolder))
        .pipe(onSuccess);
});

/**
 * SASS Watcher
 * it will run compiler first and then watch for file changes
 */
gulp.task("watch-sass", function() {
    gulp.watch(gulpOptions.sass.watch, gulp.series("compile-sass"));
});

/**
 * JS Watcher
 * it will run compiler first and then watch for file changes
 */
gulp.task("watch-js", function() {
    const { watch } = gulpOptions.javascript;
    gulp.watch(watch, gulp.series("compile-js"));
});

/**
 * JS Compile, without watcher
 */
gulp.task("compile-js", function() {
    let { list, minify, distFolder, sourcemap } = gulpOptions.javascript;
    const onSuccess = gulpNotify({
        title: "Javascript",
        message: "All Compiled!",
        onLast: true
    });

    let stream = list.map(item => {
        let name, src;
        let isPolyfill = true;
        let polyfill = "./node_modules/@babel/polyfill/dist/polyfill.min.js";

        // Check whether a single file or an object
        if (typeof item === "string") {
            let extension = path.extname(item);
            name = path.basename(item, extension);
            src = [item];
        } else {
            let issetPolyfill = typeof item.polyfill !== "undefined";
            name = item.name;
            src = item.src;
            if (issetPolyfill) isPolyfill = item.polyfill;
        }

        // Check polyfill option
        if (isPolyfill) {
            src = [polyfill, ...src];
        }

        return gulp
            .src(src, { since: gulp.lastRun("watch-js"), allowEmpty: true })
            .pipe(gulpSourcemaps.init())
            .pipe(gulpConcat(name + ".js"))
            .pipe(gulpIf(sourcemap, gulpRename({ suffix: ".min" })))
            .pipe(gulpBabel())
            .pipe(gulpIf(minify, gulpUglify()))
            .pipe(gulpIf(sourcemap, gulpSourcemaps.write(".")))
            .pipe(gulp.dest(distFolder));
    });

    return eventStream.merge(stream).pipe(onSuccess);
});

/**
 * Browsersync
 * Reload browser on file changes
 */
gulp.task("browser-sync", function() {
    browserSync.init(
        gulpOptions.browserSync.watch,
        gulpOptions.browserSync.config
    );
    gulp.watch(gulpOptions.browserSync.watch).on("change", function() {
        browserSync.reload();
    });
});

/**
 * Default gulp command
 */
gulp.task(
    "default",
    gulp.parallel([
        gulp.series("watch-sass"),
        gulp.series("watch-js"),
        gulp.series("browser-sync")
    ])
);
