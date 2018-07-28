const chalk = require('chalk');
const figlet = require('figlet');

module.exports = printModifiedToConsole = (message, color = "yellow") => {
    switch (color) {
        case "yellow":
            console.log(chalk.yellow(
                figlet.textSync(message, {horizontalLayout: 'full'})
            ));
            break;
        case "red":
            console.log(chalk.red(
                figlet.textSync(message, {horizontalLayout: 'full'})
            ));
            break;
    }
};

module.exports = printToConsole = (message, error) => {
    if(error) {
        console.log(chalk.red(message));
    } else {
        console.log(chalk.yellow(message));
    }
};
