const getCodes = require('./getCodes');
const path = require('path');
const fs = require('fs');


const source = path.resolve(`${process.cwd()}/src`);
const swaggerRoot = 'swagger';
const serviceRoot = 'services';

const config = {
  root: source,
  operationsPath: `${swaggerRoot}/operations`,
  modelsPath: `${swaggerRoot}/models`,
  serverClientPath: `${serviceRoot}/config/client`,
  isDefaultExport: true,
  importRoot: "@/"
}

if(fs.existsSync(source+"/"+swaggerRoot)){
  getCodes(config).forEach(([name, code]) => {
    fs.writeFile(source + `/${serviceRoot}/${name}`, code, function(error){
      if(error){
        console.error(error);
        return false;
      }
      console.log(name + ' 生成成功！');
    });
  })
} else {

}
