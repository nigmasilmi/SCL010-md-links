const yargs = require('yargs');
const theHelpers = require('./mdFunk');

yargs.command({
    command: 'md-links',
    describe: 'executes MarkDown package',
    builder: {
        path: {
            describe: 'file path or folder to execute the md-links search',
            demandOption: true,
            type: 'string',
        },
        validate: {
            describe: 'object with a boolean property to determine if the links should be validated or not',
            type: 'boolean'
        },
    },
    handler: (argv) => {
        if (argv.path) {
            let inputPath = argv.path;
            //ejecuta la entrada a md-links con la función que recibe el path
            theHelpers.findThePath(inputPath);
            console.log('this is inputPath', inputPath);
        }
        console.log('placeholder for md-links execution');
        // debugger
        console.log('path', argv.path);
        console.log('validate', argv.validate);
    },


});

yargs.parse();
// console.log(yargs.arv);
