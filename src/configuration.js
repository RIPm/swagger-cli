const yaml = require('js-yaml');
const fs   = require('fs');
const path = require('path');
const R    = require('ramda');

const defaultOutputSwaggerConfigFilename = './apidocs.config.json';
const autoresetConfigTemplatePath = __dirname + "/templates/swagger-gen.yml";
const defaultConfig = {
    pull: {
        docsUrl: '',
        output: defaultOutputSwaggerConfigFilename
    },
    autorest: getAutoresetConfig(autoresetConfigTemplatePath),
    service: {
        swaggerRoot: 'swagger',
        file: 'services',
        root: path.resolve(`${process.cwd()}/src`)
    }
}

function getAutoresetConfig(path) {
    return yaml.safeLoad(fs.readFileSync(path, 'utf-8'));
}

function isJs(text) {
    return /\.(j|t)s$/.test(text);
}

function isJson(text) {
    return /\.json$/.test(text);
}

function isYaml(text) {
    return /\.y(a)?ml$/.test(text);
}

function getConfig(path) {
    if(fs.existsSync(path)) {
        if(isJson(path)) {
            return JSON.parse(fs.readFileSync(path, 'utf-8'));
        }else if(isJs(path)) {
            return require(path);
        }else if(isYaml(path)) {
            return getAutoresetConfig(path);
        }else {
            return {}
        }
    }else {
        return {}
    }
}

function mergeConfig() {
    const config = getConfig(path.resolve(`${process.cwd()}/swagger-cli.json`));

    return R.mergeDeepLeft(config, defaultConfig);
}

exports.defaultConfig = defaultConfig;
exports.getConfig = getConfig;
exports.mergeConfig = mergeConfig;
