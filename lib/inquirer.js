const inquirer = require('inquirer');
const files = require('./files');

module.exports = {
    fileInput: () => {
        const information = [
            {
                name: 'FilePath',
                type: 'input',
                message: "Insert File's Path (.sql): ",
                validate: function (val) {
                    if (val.length) {
                        return true;
                    } else {
                        return "Please Give Me Everything I Need!!!";
                    }
                }
            }
        ];
        return inquirer.prompt(information);
    },
    menu : () => {
        const info = [
            {
                name: 'menuChoice',
                type: 'checkbox',
                message: "Choose something brah: ",
                choices: [ { name: 'Front End Models Extractor',   short: 'Extractor', value: 1, checked: true },],
            }
        ]
        return inquirer.prompt(info);
    }
};