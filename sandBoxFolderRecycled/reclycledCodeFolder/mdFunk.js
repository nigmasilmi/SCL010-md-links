// mdLinks Fcn modular functions
const pathCore = require('path');
const fs = require('fs');
const getURLs = require('get-urls');

const mdLinkHelpers = {
    //necesito aquí afuera 1) el nombre del archivo 2) el directorio donde se ha buscado 3) validation?
    //user's aiming directory    
    interestDirectories: [],
    //user's file of interest
    interestFiles: [],

    currentPathInput: '',

    finalArrayOfLinks: [],

    finalArrayOfObjects: [],


    //returns the relative path to the user input
    findThePath: (pathOrFileName) => {
        let currentPathOfInterest = pathCore.resolve(pathOrFileName);
        mdLinkHelpers.currentPathInput = currentPathOfInterest;
        mdLinkHelpers.interestDirectories.push(currentPathOfInterest);
        mdLinkHelpers.readDirectoryContent(currentPathOfInterest);
        //return pathCore.resolve(pathOrFileName);
    },

    //returns a mdfiles list in the user's path
    readDirectoryContent: (pathInput) => {
        fs.readdir(pathInput, (err, items) => {
            console.log(err, items);
            items.forEach(mdLinkHelpers.checkExtension);
        });
        // and checks the file type
    },

    checkExtension: (item) => {
        let itemSpliced = item.split('.');
        if (itemSpliced[1] === 'md') {
            mdLinkHelpers.interestFiles.push(item);
        } else {
            console.log('this is not a md file');
        }
        console.log('esto es mdLinkHelpers.interestFiles: ',mdLinkHelpers.interestFiles);
    },
    readMdFiles: () => {
       let interestFiles = mdLinkHelpers.interestFiles;
        console.log('directoryMdArchives es: ', interestFiles);
        for (let a = 0; a < interestFiles.length; a++) {
            fs.readFile(`${mdLinkHelpers.currentPathInput}\\${interestFiles[a]}`, 'utf8', (error, data) => {
                if (error) {
                    console.log('I could not read the file, so sorry...', error.message);
                } else {
                    mdLinkHelpers.httpDetective(data);
                }
            });
        }
    },

    httpDetective: (incomingData) => {
        console.log('this is incomingData', incomingData);
        let urlsFound = getURLs(incomingData);
        // getURLs arroja una colección del tipo Set, la convertimos en un array:
        let urlsFoundArray = Array.from(urlsFound);
        console.log('this is urlsFoundArray', urlsFoundArray);

        //TODO arroja los urls con caracteres especiales remanentes en el último y penúltimo lugar
        //acción eliminar los últimos caracteres si son: ')', ',' o ' '
        mdLinkHelpers.finalArrayOfLinks = urlsFoundArray;
     
    },

    packUpURL: () => {
        let index = 0;
        let prePackageArray = mdLinkHelpers.finalArrayOfLinks;
        console.log('este es al array que está entrando al pack', prePackageArray);
        prePackageArray.forEach((link) => {
            let linkObjLit = {};
            linkObjLit.href = link;
            linkObjLit.text = 'still needed';
            linkObjLit.dir = mdLinkHelpers.currentPathInput;
            let interestFilesNow = mdLinkHelpers.interestFiles;
            if (Array.isArray(interestFilesNow)) {
                if (interestFilesNow.length === 1) {
                    console.log('entra al primer if');
                    linkObjLit.file = interestFilesNow[0];

                } else {
                    console.log('entra al else');
                    linkObjLit.file = interestFilesNow[index];
                    console.log('suma 1');
                    index++;
                }

            } else {
                console.log('entra al else exterior');
                linkObjLit.file = interestFilesNow;
            }
            console.log('hace push');
            mdLinkHelpers.finalArrayOfObjects.push(linkObjLit);

        });
        console.log('resultado final', mdLinkHelpers.finalArrayOfObjects);
    },



};

module.exports = mdLinkHelpers;