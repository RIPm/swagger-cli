const program = require('commander');
const path = require('path');
const fs   = require('fs');
const R    = require('ramda');
const getCodes = require('../src/getCodes');
const configuration = require('../src/configuration');
const transformer = require('../src/transformer');

program
// .usage("<path>")
// .option('-o, --output <path>', 'file name')
    .on('--help', function () {
        console.log('$ swagger-model gen-service');
    })
    .parse(process.argv);

const args = program.args;
const config = configuration.mergeConfig();

const serviceConfig = config.service;


const source = serviceConfig.root;
const swaggerRoot = serviceConfig.swaggerRoot;
const serviceRoot = serviceConfig.outputDir;

const transform = serviceConfig.transform;

const genConfig = {
    root: source,
    operationsPath: `${swaggerRoot}/operations`,
    modelsPath: `${swaggerRoot}/models`,
    ...transform
}

if(fs.existsSync(source+"/"+swaggerRoot)){
    const outputDir = source+"/"+serviceRoot;
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    getCodes(genConfig).forEach(([name, code]) => {
        fs.writeFile(`${outputDir}/${name}`, code, function(error){
            if(error){
                console.error(error);
                return false;
            }
            console.log(name + ' 生成成功！');
        });
    })
} else {
    throw new Error('swagger文件不存在，可以使用swagger-cli gen-model进行生成');
}
