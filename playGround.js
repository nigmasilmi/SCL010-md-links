// const argv = require('yargs').argv;

// if (argv.ships > 3 && argv.distance < 53.5) {
//   console.log('Plunder more riffiwobbles!');
// } else {
//   console.log('Retreat from the xupptumblers!');
// }

// const fs = require('fs');

// console.log(fs.statSync('./test').isDirectory());

// const http = require('http');



// http.get('http://nodejs.org/dist/index.json', (res) => {
//   const { statusCode } = res;
//   const contentType = res.headers['content-type'];

//   let error;
//   if (statusCode !== 200) {
//     error = new Error('Request Failed.\n' +
//                       `Status Code: ${statusCode}`);
//   } else if (!/^application\/json/.test(contentType)) {
//     error = new Error('Invalid content-type.\n' +
//                       `Expected application/json but received ${contentType}`);
//   }else{
//       console.log(statusCode);
//   }
//   if (error) {
//     console.error(error.message);
//     // Consume response data to free up memory
//     res.resume();
//     return;
//   }
// });

// const links =   [
// 'https://otra-cosa.net/algun-doc.html',
// 'https://docs.npmjs.com/cli/install',
// 'https://github.com/Laboratoria/course-parser' ];

// http.get('http://nodejs.org/dist/index.json', (req, res) => {
//     // console.log(res.statusCode);
//     console.log(req.statusCode);
// });

// links.forEach(link=>{   
//     http.get(link, (req, res)=>{
//         console.log(req.statusCode);
//     });
// });


//get no soporta el protocolo https
// http.get('http://nodejs.org/dist/index.json', (req, res) => {
//     // console.log(res.statusCode);
//     console.log(req.statusCode);
// });

const checkLinks = require('check-links');
 
// const results = await checkLinks([
//   'https://foo.com',
//   'https://404.com',
// ]);

// results['https://foo.com']; // { status: 'alive', statusCode: 200 }
// results['https://404.com'];

// results();

function resolveAfter2Seconds() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 100);
    });
   }async function f1() {
    const results = await checkLinks([
      'https://www.google.com',
      'https://404.com',
    ]);
    console.log(results);
   }
   f1();