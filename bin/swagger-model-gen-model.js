const program = require('commander');
const child_process = require('child_process');
const path = require('path');
const fs   = require('fs');
const jsonfile = require('jsonfile');
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
const config = configuration.mergeConfig();

const autorestConfig = configPath ? configuration.getConfig(configPath) : config.autorest;

autorestConfig['output-folder'] = path.resolve(`${process.cwd()}/${autorestConfig['output-folder']}`);
autorestConfig['input-file'] = path.resolve(`${process.cwd()}/${autorestConfig['input-file'] ? autorestConfig['input-file'] : config.pull.output}`) ;

function genModel(configPath) {
    child_process.exec(`npx autorest ${cacheConfigurePath}`, (error, stdout, stderr) => {
        if(error) {
            console.error('error: ' + error);
            return;
        }
        console.log(stdout);

        console.log('model生成成功！');

    })
}

jsonfile.writeFile(cacheConfigurePath, autorestConfig, (error) => {
    if(error){
        console.error(error);
        return false;
    }

    if(!fs.existsSync(autorestConfig['input-file'])) {
        console.log('尚未拉取swagger api config');
        console.log('自动拉取中...');

        child_process.exec(`npx swagger-cli pull -o ${autorestConfig['input-file']}`, (error, stdout, stderr) => {
            if(error) {
                console.error('error: ' + error);
                return;
            }
            console.log(stdout);

            console.log('拉取成功');
            console.log('正在生成model');

            genModel(cacheConfigurePath);
        })
    }else {
        genModel(cacheConfigurePath);
    }
});
