const fs = require('fs');

// Read file async, returns a callback with the data
module.exports = {
    readFile: (filePath, callback = function (data) {}) => {
        try {
            fs.readFile(filePath, 'utf-8', function (err, res) {
                if (err)
                    return callback(false);
                return callback(res);
            });
        } catch (e) {
            return false;
        }
    }
};