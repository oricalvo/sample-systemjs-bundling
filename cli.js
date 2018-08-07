const path = require("path");
const {run} = require("build-utils/process");

main();

async function main() {
    console.log("Compiling build scripts");

    await run("node_modules/.bin/tsc -p ./build/tsconfig.json");

    const build = require("./build_out/main.js");
    const command = process.argv[2];
    if(!command) {
        console.log("Missing command to execute");
        return;
    }

    const func = build[command];
    if(!func) {
        console.log("Function named " + command + " was not found");
        return;
    }

    func();
}
