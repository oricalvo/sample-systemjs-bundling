System.config({
    baseURL: "",
    buildCSS: true,
    separateCSS: true,
    transpiler: false,
    meta: {
        '*.css': {loader: 'css'},
        '*.html': {loader: 'text'},
        angular: {
            format: 'global',
            exports: 'angular',
        }
    },
    map: {
        "angular": "node_modules/angular/angular.js",
        "text": "node_modules/systemjs-plugin-text/text.js",
        "css": "node_modules/systemjs-plugin-css/css.js",
        "app": "dist/app",
    },
    packages: {
        "app": {
            defaultExtension: 'js',
            main: 'main.js',
        }
    }
});
