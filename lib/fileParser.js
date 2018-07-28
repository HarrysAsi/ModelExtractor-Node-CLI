// The File that i want to extract data from, is .sql formatted.
// Everything its stored in memory.

const path = require('path').join(require('os').homedir(), "Desktop\\models");
const fs = require('fs');

module.exports = fileParser = (data) => {
    //Parse the whole file content into an 1D array
    let myFileInArray = data.toString().split('\n');
    //Get only the tables from array
    let allTables = extractTables(myFileInArray);
    //Trying to format each row in a better way
    for (let i = 0; i < allTables.length; i++) {
        allTables[i] = allTables[i].replace(/`/g, "");
    }
    //Getting each table with its attributes into a 2D array
    let twoDArr = extractTableContentsInto2DArray(allTables);
    //Format the attributes, save them to file
    extractAllModelsToFile(twoDArr);

};

//Exctract All Models with the format i want to
//lass Name extends Model {constructor(params){...} toMemory(){} get attributes(){...}}
extractAllModelsToFile = (data) =>{
    for (let ob in data) {
        let fields = data[ob];
        let className = data[ob][0].split(" ")[2];
        let classPreName = className;
        className = className.replaceAt(0, data[ob][0].split(" ")[2].charAt(0).toUpperCase());
        let classStr = "class " + className + "  extends Model {\n"
        let tableSuper = "super(" + data[ob][0].split(" ")[2] + ");\n";
        let constuctorStr = "constructor(";
        let variable = "";
        let toMemory = "";
        let getAttributes = "get attributes() {\n let array = {\n";

        let value = "";
        let visible = "";
        let label = "";
        let type = "";
        let primary = "";

        for (let i = 1; i < fields.length; i++) {

            let field_name = data[ob][i].split(" ")[2];
            let field_type = modifyType(data[ob][i].split(" ")[3].split("(")[0]);

            if (data[ob][i].includes("timestamp")) {
                field_name = data[ob][i].split(" ")[2];
                field_type = modifyType(data[ob][i].split(" ")[3]);
            }


            let field_constructor_assignment = "\"\" ";
            if (field_type !== "string")
                field_constructor_assignment = 0;


            constuctorStr += field_name + " = " + field_constructor_assignment + " ,";
            toMemory = "toMemory() {\n runtime." + classPreName + "[this." + data[ob][1].split(" ")[2] + "] = this; \n";
            variable += "this." + field_name + " = " + field_name + ";\n"

            getAttributes += field_name + ": {\n";
            value = "value: this." + field_name + ",\n";
            visible = "visible: true,\n";
            label = "label: \"" + field_name + "\",\n";
            type = "type: \"" + field_type + "\",\n";
            if (i === 1)
                primary = "primary: true\n";
            else
                primary = "primary: false\n";
            getAttributes += value + visible + label + type + primary + "},\n";
        }
        getAttributes += "}; \n return array;\n}\n";
        constuctorStr = constuctorStr.substring(0, constuctorStr.length - 1);
        constuctorStr += "){\n";

        getAttributes += "\n}";
        classStr += constuctorStr + tableSuper + variable + "}\n" + toMemory + "}\n" + getAttributes;

        let pathToCreate = path;
        let file = path + "\\" + className + ".js";
        console.log(file);
        //D:\Users\Harrys\Desktop\models
        fs.mkdir(pathToCreate, function (err) {
            fs.writeFile(file, classStr, function (err) {
                if (err) {
                    printToConsole("YOU ARE BAD, IM STOPPING THIS DAMN SHIT PROCESS...", true);
                }
            });
        });
    }
};

//Exctract All The Tables and it's rows into an 2D array
extractTableContentsInto2DArray = (table) => {
    let twoDArr = [];
    let twoCtn = 0;
    for (let i = 0; i < table.length; i++) {
        if (table[i].includes("CREATE TABLE")) {
            let found = false;
            let cntI = i;
            twoDArr[twoCtn] = [];
            while (!found) {
                if (table[cntI].includes("CHARSET")) {
                    found = true;
                } else {
                    twoDArr[twoCtn].push(table[cntI]);
                }
                cntI++;
            }
            twoCtn++;
        }
    }
    return twoDArr;
};

//Extract all the tables in .sql file
extractTables = (array) =>{
    let cnt = 0;
    let allTables = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i].includes("CREATE TABLE")) {
            let found = false;
            let cnt = i;
            while (!found) {
                if (array[cnt].includes(";")) {
                    allTables.push(array[cnt]);
                    found = true;
                } else {
                    allTables.push(array[cnt]);
                    cnt++;
                }
            }
        }
    }
    return allTables;
};

//Helper function to modify the type of an attribute
function modifyType(field_type) {
    switch (field_type) {
        case "int":
            return "number";
        case "varchar":
            return "string";
        case "date":
            return "date";
        case "timestamp":
            return "date";

    }
}

//
String.prototype.replaceAt = function (index, char) {
    let a = this.split("");
    a[index] = char;
    return a.join("");
};