const program = require('commander');
const child_process = require('child_process');
const path = require('path');
const fs   = require('fs');
const configuration = require('../src/configuration');

const cacheConfigurePath =  __dirname + "/.autorest.json";

program
    .usage("<path>")
    // .option('-o, --output <path>', 'file name')
    .on('--help', function () {
        console.log('$ swagger-model gen-model');
        console.log('$ swagger-model gen-model <path>');
        // console.log('$ swagger-model gen-model <path> -o ./apidocs.config.json');
    })
    .parse(process.argv);


const args = program.args;
const [configPath] = args;

const customConfig = configPath ? configuration.getConfig(configPath) : configuration.mergeConfig().autorest;

fs.writeFile(cacheConfigurePath, customConfig, (error) => {
    if(error){
        console.error(error);
        return false;
    }

    child_process.exec(`autoreset ${cacheConfigurePath}`, () => {
        console.log('model生成成功！');

    })
});
