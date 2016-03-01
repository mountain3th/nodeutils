var fs = require('fs');

function recursivelyReadDir(path, floor, handler) {
    floor += 1;
    fs.readdir(path, function(err, files) {
        if(err) {
            console.log('read ' + path + ' error');
        } else {
            files.forEach(function(item) {
                var tmpPath = path + '/' + item;
                fs.stat(tmpPath, function(err1, stats) {  
                    if(err1) {
                        console.log('stats ' + tmpPath + ' error');
                    } else {
                        if(stats.isDirectory()) {
                            recursivelyReadDir(tmpPath, floor, handler);
                        } else {
                            handler(tmpPath);
                        }
                    }
                });
            });
        }
    });
}

function findModule(file, module) {
    var data = fs.readFileSync(file, 'utf-8');
    if(data.indexOf(module) > 0) {
        console.log(file);
    }
}

function usage() {
    console.log('usage: node detect.js {rootpath} {strings to detect}');
}

var arguments = process.argv.splice(2);
if(arguments.length > 0) {
    recursivelyReadDir(arguments[0], 5, (file)=>(findModule(file, arguments[1])));
} else {
    usage();
}
