const program = require('commander');

program
    .usage('<command> [options]')
    .command('pull <url>', 'Download swagger config')
    .command('gen-model [otherParams...]', 'Create swagger model by autoreset')
    .command('gen-service [otherParams...]', 'Create service by swagger model')
    .parse(process.argv);