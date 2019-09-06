// mdLinks Fcn modular functions
const pathCore = require('path');
const fs = require('fs');
const getURLs = require('get-urls');
// const stats = require('fs.Stats');
const checkLinks = require('check-links');

const mdLinkHelpers = {

    targetDirectory : '',

    interestFiles: [],

    urlsFoundArrays:[],

    foundAndCleanedArr:[],

    finalResult:[],

    statusResulTemp:'',

    isFolderOrFile:(pathOption)=>{
        if(fs.statSync(pathOption).isDirectory()){
            console.log('debemos ahora buscar en el directorio');
            mdLinkHelpers.findThePath(pathOption);
        }else if (fs.statSync(pathOption).isFile()){
            mdLinkHelpers.readDirectoryContent(pathOption);
        }else{
            console.log('generar un mensaje al usuario');
        }
    },

    findThePath: (pathOrFileName) => {
        //finds the path from relative to absolute
        let currentPathOfInterest = pathCore.resolve(pathOrFileName);
        mdLinkHelpers.targetDirectory = currentPathOfInterest;
        console.log('this is the ABSOLUTE path of interest: ', currentPathOfInterest);
        mdLinkHelpers.readDirectoryContent(currentPathOfInterest);
    },

    readDirectoryContent: (pathInput) => {
        fs.readdir(pathInput, (err, items) => {
            console.log('This is the content of the Directory of interest: ', items);
            items.forEach((item)=>{
                let itemSpliced = item.split('.');
                if (itemSpliced[1] === 'md') {
                    mdLinkHelpers.interestFiles.push(item);
                }
            });
            mdLinkHelpers.checkTheArray();
        });
        // and checks the file type
    },
    //output to the user if there are no md files
    checkTheArray: () => {
        if( !Array.isArray(mdLinkHelpers.interestFiles) || !mdLinkHelpers.interestFiles.length){
           console.log('es falsy este array');
            if (mdLinkHelpers.interestFiles[0] === undefined) {
                console.log('este es el length del array', mdLinkHelpers.interestFiles.length);
                console.log('There are no MarkDown files in the requested directory');
            }

        }
        else {
            //let the user know which are the files that are going to be analized
            console.log('esto es mdLinkHelpers.interestFiles: ', mdLinkHelpers.interestFiles);
        }
        mdLinkHelpers.readMdFiles();
    },

    readMdFiles: () => {
        let interestFiles = mdLinkHelpers.interestFiles;
        let currentTargetDirectory = mdLinkHelpers.targetDirectory;
         console.log('directoryMdArchives es: ', interestFiles);
         for (let a = 0; a < interestFiles.length; a++) {
             fs.readFile(`${currentTargetDirectory}\\${interestFiles[a]}`, 'utf8', (error, data) => {
                 if (error) {
                     console.log('I could not read the file, so sorry...', error.message);
                 } else {
                    // console.log('I have read this: ', data);
                     mdLinkHelpers.httpDetective(data);
                 }
             });
         }
     },

    
     httpDetective: (incomingData) => {
        //console.log('this is incomingData', incomingData);
        let urlsFound = getURLs(incomingData);
        // getURLs arroja una colección del tipo Set, la convertimos en un array:
        let urlsFoundArray = Array.from(urlsFound);
        mdLinkHelpers.urlsFoundArrays = urlsFoundArray;
        console.log('this is urlsFoundArray', urlsFoundArray);
        mdLinkHelpers.cleaningUrls();
     },

     cleaningUrls:()=>{
        let theStuffToClean = mdLinkHelpers.urlsFoundArrays;
        let cleanedLinkArr = [];
        theStuffToClean.forEach((item)=>{
            let lastIndex = item.length-1;
            if(item[lastIndex]===')'){
                let cleanedItem = item.slice(0,-1);
                cleanedLinkArr.push(cleanedItem);
            }else if(item[lastIndex]!==')' ){
                cleanedLinkArr.push(item);
            }else{
                console.log('this url is clean');
                cleanedLinkArr.push(item);
            }
        });
        console.log('This is cleanedLinkArr: ',cleanedLinkArr);
        mdLinkHelpers.foundAndCleanedArr = cleanedLinkArr;
        mdLinkHelpers.generateObjs();
        // mdLinkHelpers.checkStatus();

        //mdLinkHelpers.findAsocText();
     },

    

     findAsocText:()=>{
        console.log('todavía falta el cuerpo de esta función');
         
     },

     checkStatus: (theLink)=>{
         new Promise(resolve => {
            setTimeout(() => {
              resolve();
            }, 100);
          });
         async function f1() {
            mdLinkHelpers.statusResulTemp = await checkLinks(theLink);
         console.log('mdLinkHelpers.statusResulTemp',mdLinkHelpers.statusResulTemp);
        }
         f1();
     },

     generateObjs:()=>{
        mdLinkHelpers.foundAndCleanedArr.forEach((url)=>{
            console.log('these are the urls',url);
            let finalObjs = [];
            let linkObjLit = {};
            linkObjLit.href = url;
            linkObjLit.status = mdLinkHelpers.checkStatus(linkObjLit.href);
            linkObjLit.text = 'still needed';
            linkObjLit.dir = mdLinkHelpers.targetDirectory;
            finalObjs.push(linkObjLit);
            mdLinkHelpers.finalResult = finalObjs;
        });
        console.log(mdLinkHelpers.finalResult);
     },

     showStats : ()=>{
         //muestra la longitud del array de urls
         let urlsFoundCount = mdLinkHelpers.foundAndCleanedArr.length;
         console.log(`There are ${urlsFoundCount} urls in the file or folder`);
     }



    
};

// mdLinkHelpers.findThePath('./sandBoxFolderRecycled');
mdLinkHelpers.isFolderOrFile('./sandBoxFolderRecycled/recycledCodeFolder');
module.exports = mdLinkHelpers;