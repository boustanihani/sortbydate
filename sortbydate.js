console.log('Starting...\n');

var fs = require("fs");
var recursive = require('recursive-readdir');

var myArgs = process.argv.slice(2);
//console.log(myArgs);

var directory = myArgs[0];
console.log('Ausgewählt: ' + directory + '\n');

fs.stat(directory, function(err, stats) {
    if (err) return console.log('Kein gültiger Pfad!');

    if (stats.isDirectory()) {
        console.log('Pfad ist gültig!');
        sort();
    } else {
        console.log('Pfad ist kein Verzeichnis!');
    }
});

var sort = function() {

    console.log('Inhalt wird gelesen...');

    recursive(directory, function(err, files) {

        if (err) return console.log('Es ist ein Fehler aufgetreten!');
        //console.log(files);

        files.forEach(function(file, index) {
            console.log(file);
        });

    });
};
