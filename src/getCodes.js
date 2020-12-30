const fs = require('fs');
const path = require('path');

const firstUpperCase = ([first, ...rest]) => first.toUpperCase() + rest.join('');

function findFilesByOperations(operationsPath) {
    const files = fs.readdirSync(operationsPath);

    return files.filter(v => !/^index.(j|t)s$/.test(v));
}

function findOperationMapperFiles(modelsPath) {
    const files = fs.readdirSync(modelsPath);

    return files.filter(v => /^([\s\S].*)Mappers.(j|t)s$/.test(v));
}


module.exports = function getCodes(options) {
    const root = options.root + '/';
    const importRoot = options.importRoot;

    const serverClientPath = options.serverClientPath;
    const operationFileList = findFilesByOperations(root + options.operationsPath);
    const operationMapperFiles = findOperationMapperFiles(root + options.modelsPath);

    const templatePath = options.templatePath;
    const transformToCode = options.transformer;
    const extraData = options.extraData;

    return operationFileList.map(file => {
        const operationName = file.replace(/\.(j|t)s$/, "");

        const operationMapperName = operationMapperFiles
              .find(v => v.replace(/Mappers.(j|t)s$/, "") === operationName).replace(/\.(j|t)s$/, "");

        return [
            file,
            transformToCode(templatePath)({
                importRoot,
                operationsPath: options.operationsPath,
                operationClass: firstUpperCase(operationName),
                clientName: options.extraData.isDefaultExport ? null : operationName,
                operationMapperPath: options.modelsPath + "/" + operationMapperName,
                serverClientPath: serverClientPath,
                ...extraData
            })
        ];
    })
}
