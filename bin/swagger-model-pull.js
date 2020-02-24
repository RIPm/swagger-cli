const program = require('commander');
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
const pullConfig = configuration.defaultConfig.pull;

if(!url) {
    const {output: filename, docsUrl} = pullConfig;

    filedownload(filename, docsUrl);
}else {
    let filename = pullConfig.output;
    if(program.output) filename = program.output;

    filedownload(filename, url);
}
