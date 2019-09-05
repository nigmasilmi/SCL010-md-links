// mdLinks Fcn modular functions
const pathCore = require('path');
const fs = require('fs');
const getURLs = require('get-urls');
// const stats = require('fs.Stats');

const mdLinkHelpers = {

    targetDirectory : '',

    interestFiles: [],

    urlsFoundArrays:[],

    foundAndCleanedArr:[],

    finalResult:[],

    isFolderOrFile:(pathOption)=>{
        if( fs.stats.isDirectory(pathOption)){
            console.log('debemos ahora buscar en el directorio');
        }else if ( fs.stats.isFile(pathOption)){
            console.log('aquí ejecutamos la función de buscar links');
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
        if(mdLinkHelpers.interestFiles.length === 1){
            if (mdLinkHelpers.interestFiles[0] === undefined) {
                console.log('There are no MarkDown files in the requested directory');
            }else{
                console.log('This is the only element in the array: ', mdLinkHelpers.interestFiles[0]);
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
        //mdLinkHelpers.findAsocText();
     },

     generateObjs:()=>{
        mdLinkHelpers.foundAndCleanedArr.forEach((url)=>{
            let finalObjs = [];
            let linkObjLit = {};
            linkObjLit.href = url;
            linkObjLit.text = 'still needed';
            linkObjLit.dir = mdLinkHelpers.targetDirectory;
            finalObjs.push(linkObjLit);
            mdLinkHelpers.finalResult = finalObjs;
        });
        console.log(mdLinkHelpers.finalResult);
     },

     findAsocText:()=>{
         let finalArr = mdLinkHelpers.foundAndCleanedArr;
         for(let i=0; i<finalArr.length; i++){
             console.log('entra al for');
             console.log(finalArr[i]);
             for(let f=0; f<finalArr[i].length; f++){
                console.log(finalArr[i][f]);
                if(finalArr[i][f]==='h'){
                    if(finalArr[i][f+1] === 't'){
                        console.log('found');
                        //
                    }
                }
             }
         }
         
     }

    
};

// mdLinkHelpers.findThePath('./sandBoxFolderRecycled');
// mdLinkHelpers.isFolderOrFile('./sandBoxFolderRecycled');
module.exports = mdLinkHelpers;