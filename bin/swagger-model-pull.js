const program = require('commander');
const path = require('path');
const filedownload = require('../src/filedownload');
const configuration = require('../src/configuration');

program
    .usage("<url> [options]")
    .option('-o, --output <path>', 'file name')
    .on('--help', function () {
        console.log('$ swagger-model pull');
        console.log('$ swagger-model pull <url>');
        console.log('$ swagger-model pull <url> -o ./apidocs.config.json');
    })
    .parse(process.argv);

const args = program.args;
const [url] = args;
const config = configuration.mergeConfig();
const pullConfig = config.pull;
let filename = pullConfig.output;

if(program.output) filename = program.output;

const remoteUrl = url ? url : pullConfig.docsUrl;

if(remoteUrl) {
    filedownload(path.resolve(`${process.cwd()}/`, filename), url ? url : pullConfig.docsUrl);
}else {
    throw new Error('请填入远程swagger api config地址');
}
