// module.exports = () => {
//   //content to export
//   console.log('funciona');
// };

const mdLinkHelpersIn = require('./mdFunk');

const mdLinks = (path, options) => {
    //llamar al helper que recibe el path y hace algo con ello
    mdLinkHelpersIn.pathRetriever();

};


module.exports = mdLinks;
