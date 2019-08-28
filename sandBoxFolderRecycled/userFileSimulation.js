//const pathy = require('path');
// const mdLinksImUsing = require('./mdLinks');
// const mdLinksImUsing = require('./index');
const mdLinksImUsing2 = require('./reclycledCodeFolder/mdFunk');
// const fs = require('fs');

// mdLinksImUsing2.validationBool();
// mdLinksImUsing2.pathRetriever();
// mdLinksImUsing2.readDirectory('./node_modules/abab');
// mdLinksImUsing2.findThePath('./node_modules/abab');
// mdLinksImUsing2.findThePath('sandBoxMD.md');
//mdLinksImUsing2.findThePath('./sandBoxFolder');
//  let prueba =['q','a'];
//  let vaya = Array.from(prueba);
//  console.log(vaya.constructor);
mdLinksImUsing2.findThePath('./README_copy.md'); //OJO, AJUSTAR CUANDO NO ES UN DIRECTORIO SINO UN ARCHIVO
// mdLinksImUsing2.readMdFiles([ 'README.md', 'README_copy.md', 'sandBoxMD.md' ]);
//this function must execute at the process climax: pero must be checked if the user is passing a directory or a file path
//mdLinksImUsing2.readInsideFile('./', 'sandBoxMD.md');
//mdLinksImUsing2.readDirItself('./', 'sandBoxMD.md'); 

//console.log(pathy.resolve('README.md'));

// fs.readdir('./node_modules/abab', (err, items) => {
//     console.log(err, items);
//    // items.forEach(checkExtension);
// });