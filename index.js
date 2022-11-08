let cp = require('child_process');
const fs = require('fs');
const path = require('path');
const glob = require("glob");
const plist = require('plist');
const cp_maxBuffer = 1024 * 1024 * 30;


function npmI(installFolder) {
    console.log('npm i');

    if (typeof installFolder === "undefined") {
        throw new Error("not set installFolder ");
    }

    process.chdir(installFolder);

    return runNpmCommand(['i']);
}

function runNpmCommand(npmCommandList) {
    let build = cp.spawn(getNpm(process.platform), npmCommandList);
    return setProcessPromise(build);
}

// TODO 改名
function deleteFolderRecursive(directory) {
    if (fs.existsSync(directory)) {

        fs.rmdirSync(directory, { recursive: true, force: true });
        console.log('deleteFolderRecursive success, path => ', directory);
    }

    fs.mkdirSync(directory);
}


// noReject: boolean
function setProcessPromise(build, noReject) {

    if (typeof build === "undefined") {
        throw new Error("not set build ");
    }

    if (typeof noReject === "undefined") {
        noReject = false;
    }

    return new Promise((resolve, reject) => {

        build.stdout.on('data', function (data) {
            process.stdout.write(data);
        });

        build.stderr.on('data', function (data) {
            process.stdout.write(data);
        });

        build.on('exit', function (code) {

            if (noReject) {
                return resolve();
            }

            if (code == 0) {
                return resolve();
            } else {
                return reject('error in child_process');
            }
        });
    });
}


function getNpm(process_platform) { // process.platform

    if (typeof process_platform === "undefined") {
        throw new Error("not set process_platform ");
    }

    if (process_platform === 'win32') {
        return 'npm.cmd';
    } else {
        return 'npm';
    }
}


module.exports = {
    deleteFolderRecursive,
    npmI,
    setProcessPromise, // for test
    getNpm
};