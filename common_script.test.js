let common_script = require('./index');
let cp = require('child_process');

jest.setTimeout(180000);

test('test run fail', async () => {

    let build = cp.spawn('bash', ['exit', '1']);
    try {
        await common_script.setProcessPromise(build);
        expect(true).toBe(false);
    } catch (err) {
        expect(true).toBe(true);
    }
});

test('test noReject', async () => {

    let build = cp.spawn('bash', ['exit', '1']);
    try {
        await common_script.setProcessPromise(build, true);
        expect(true).toBe(true);
    } catch (err) {
        expect(true).toBe(false);
    }
});


test('getNpm', () => {
    let npm_win = common_script.getNpm('win32');
    expect(npm_win).toBe('npm.cmd');

    let npm = common_script.getNpm('linux');
    expect(npm).toBe('npm');
})


