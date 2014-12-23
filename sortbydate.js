console.log('Starting...\n');

var fs = require("fs");
var path = require('path');
var recursive = require('recursive-readdir');
var moment = require('moment');
var mkdirp = require('mkdirp');

var myArgs = process.argv.slice(2);
//console.log(myArgs);

var directory = path.normalize(myArgs[0]);
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

    var directoryName = path.basename(directory);
    var parentDir = path.dirname(directory);
    console.log('parentDir=' + parentDir + ' && directoryName=' + directoryName);

    var outputDir = path.join(parentDir, directoryName + '-sorted');
    console.log('outputDir=' + outputDir + '\n\n');

    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

    recursive(directory, function(err, files) {

        if (err) return console.log('Es ist ein Fehler aufgetreten!');
        //console.log(files);

        var length = files.length;

        files.forEach(function(file, index) {
            console.log(progress(index + 1, length) + file);

            // http://www.unixtutorial.org/2008/04/atime-ctime-mtime-in-unix-filesystems/
            var stats = fs.statSync(file);
            var date = stats.mtime;
            //console.log(date);
            var destination = moment(date).format('YYYY/MM/DD');
            var destinationPath = path.join(outputDir, destination);
            var fileName = path.basename(file);

            console.log('Moving "' + fileName + '" to ' + destinationPath);
            if (!fs.existsSync(destinationPath)) mkdirp.sync(destinationPath);

        });
        console.log('\n\noutputDir=' + outputDir + '\n');
    });
};
