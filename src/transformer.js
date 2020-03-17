const Mustache = require('mustache');
const fs = require('fs');


module.exports = function transformToCodeWithMustache(path) {
    return function (data) {
        return Mustache.render(
            fs.readFileSync(path, "utf-8"),
            data
        )
    }
}
