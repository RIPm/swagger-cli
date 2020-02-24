const http = require('http');
const https = require('https');
const fs = require('fs');

function isHttps (url) {
    return /^https?:\/\/.+/.test(url)
}

function isHttp (url) {
    return /^http?:\/\/.+/.test(url)
}

module.exports = function (filename, url) {
    let request = null;
    if(isHttp(url)) request = http;
    else if(isHttps(url)) request = https;
    else {
        console.error('Must be http/https');
        return;
    }

    const file = fs.createWriteStream(filename);

    request.get(url, (response) => response.pipe(file));
}
