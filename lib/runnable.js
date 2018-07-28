const files = require('../lib/files');
const inquirer = require('../lib/inquirer');
const fileParser = require('./fileParser');
require('./consoller');

//Aysnchronous function, executes the whole program
// Every function has a callback with the results
async function runnable(){
    printModifiedToConsole("GitHub HarrysAsi ");
    const menuChoice = await inquirer.menu();
    let choiceNum = menuChoice.menuChoice;

    if (choiceNum[0] === 1) {
        const cred = await inquirer.fileInput();
        let filePath = cred.FilePath;
        try {
            files.readFile(filePath, function (data) {
                if (data === false) {
                    printToConsole("Cannot Open File !!!", true);
                } else {
                    printToConsole("Im reading your damn bad formatted file...");
                    fileParser(data);
                }
                printToConsole("Im done with you and your bad projects");
                printModifiedToConsole("Done ..|..");
            });
        } catch (e) {
            printToConsole("NVM, YOU ARE BAD, IM QUITTING...", );
        }
    } else {
        printToConsole("NVM, YOU ARE STUPID, IM QUITTING...", true);
    }
    setTimeout(function(){
        printToConsole("Terminator, aaa i mean, terminating...");
    }, 5000);
};

module.exports = runnable;