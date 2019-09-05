// module.exports = () => {
//   //content to export
//   console.log('funciona');
// };

const argv = require('yargs');

const inputComm = require('./commands');



//aquí tengo que definir los argumentos que vienen

//luego aquí debo decirle que pase los flags como argumentos de la función
const mdLinks = (path, validate)=>{

    if (argv.validate === true ) {
        console.log('está validando');
      } else {
        console.log('Retreat from the xupptumblers!');
      }
 inputComm.path = path;
 inputComm.validate = validate;

};

module.exports = mdLinks;
