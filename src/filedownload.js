const http = require('http');
const https = require('https');
const fs = require('fs');
const { isHttp, isHttps } = require('../src/utils');

module.exports = function (filename, url) {
    let request = null;
    if(isHttp(url)) request = http;
    else if(isHttps(url)) request = https;
    else {
        console.error('Must be http/https');
        return Promise.reject();
    }

    const file = fs.createWriteStream(filename);

    return new Promise((resolve, reject) => {
        request.get(url, (response) => {
            const result = response.pipe(file)
    
            resolve(result);
        }).on('error', reject);
    })
}
