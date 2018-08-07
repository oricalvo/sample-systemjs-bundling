import * as Builder from 'systemjs-builder';
import {copyAssets, deleteDirectory, ensureDirectory} from "build-utils/fs";
import {run} from "build-utils/process";
import * as opener from "opener";
import {promisify} from "util";
import * as fs from "fs";
const rename = promisify(fs.rename);

const port = 8080;

export async function dev() {
    console.log("Copying assets");

    await compileApp();

    await copyAppAssets(true);

    await runWebServer();

    await runBrowser();
}

async function compileApp() {
    await run("node_modules/.bin/tsc -p ./app/tsconfig.json");
}

async function copyAppAssets(watch: boolean) {
    await copyAssets([
        {source: "app_out/*.js", target: "dist/app"},
        {source: "app/*.html", target: "dist/app"},
        {source: "app/*.css", target: "dist/app"},
    ], watch);
}

async function runWebServer() {
    console.log("Running web server");
    run(`node_modules/.bin/http-server -p ${port}`);
}

async function runBrowser() {
    console.log("Openning brower");
    opener(`http://localhost:${port}`);
}

export async function prod() {
    console.log("Cleaning directories");
    await deleteDirectory("./dist");

    await compileApp();

    await copyAppAssets(false);

    console.log("Bundling for production");
    await ensureDirectory("./dist-prod");
    var builder = new Builder('./', './system.config.js');
    await builder.bundle('app/main.js', 'dist-prod/app.bundle.js');

    console.log("Cleaning");
    await deleteDirectory("./dist");
    await rename("./dist-prod", "./dist");

    await runWebServer();

    await runBrowser();
}
