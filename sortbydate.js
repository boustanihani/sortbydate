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

var progress = function(number1, number2) {
    var percent = number1 * 100 / number2;
    //return percent.toFixed(2) + "% (" + number1 + '/' + number2 + ') ';
    return parseInt(percent) + "% (" + number1 + '/' + number2 + ') ';
};

var sort = function() {

    console.log('Inhalt wird gelesen...');

    recursive(directory, function(err, files) {

        if (err) return console.log('Es ist ein Fehler aufgetreten!');
        //console.log(files);

        var length = files.length;

        files.forEach(function(file, index) {
            console.log(progress(index + 1, length) + file);
        });

    });
};
