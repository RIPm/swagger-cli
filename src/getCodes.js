const fs = require('fs');
const path = require('path');
const Mustache = require('mustache');


const firstUpperCase = ([first, ...rest]) => first.toUpperCase() + rest.join('');

function transformToCodeWithMustache(data) {
  return Mustache.render(
    fs.readFileSync(__dirname + "/templates/service-template.mustache", "utf-8"),
    data
  )
}

function findFilesByOperations(operationsPath) {
  const files = fs.readdirSync(operationsPath);

  return files.filter(v => !/^index.(j|t)s$/.test(v));
}

function findOperationMapperFiles(modelsPath) {
  const files = fs.readdirSync(modelsPath);

  return files.filter(v => /^([\s\S].*)Mappers.(j|t)s$/.test(v));
}


module.exports = function getCodes(options) {
  const source = options.root + '/';
  const importRoot = options.importRoot;

  const serverClientPath = options.serverClientPath;
  const operationFileList = findFilesByOperations(source + options.operationsPath);
  const operationMapperFiles = findOperationMapperFiles(source + options.modelsPath);

  return operationFileList.map(file => {
    const operationName = file.replace(/\.(j|t)s$/, "");

    const operationMapperName = operationMapperFiles
          .find(v => v.replace(/Mappers.(j|t)s$/, "") === operationName).replace(/\.(j|t)s$/, "");

    return [
      file,
      transformToCodeWithMustache({
        operationsPath: importRoot + options.operationsPath,
        operationClass: firstUpperCase(operationName),
        clientName: options.isDefaultExport ? null : operationName,
        operationMapperPath: importRoot + options.modelsPath + "/" + operationMapperName,
        serverClientPath: importRoot + serverClientPath
      })
    ];
  })
}
