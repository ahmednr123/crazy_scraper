// Data Manager

/*

.dm_meta [FORMAT]
0: [total_handles]
1..n: [handle_name] [handle_meta (with spaces)]

*/

const fs = require('fs');

const logger = require('./logger');

var rmDir = function(dir, rmSelf) {
    var files;
    rmSelf = (rmSelf === undefined) ? true : rmSelf;
    dir = dir + "/";
    try { files = fs.readdirSync(dir); } catch (e) { console.log("!Oops, directory not exist."); return; }
    if (files.length > 0) {
        files.forEach(function(x, i) {
            if (fs.statSync(dir + x).isDirectory()) {
                rmDir(dir + x);
            } else {
                fs.unlinkSync(dir + x);
            }
        });
    }
    if (rmSelf) {
        // check if user want to delete the directory ir just the files in this directory
        fs.rmdirSync(dir);
    }
}
// Example rmDir("file1") => delete directory with all files || rmDir("file1", false) => delete just the files in the directory

const d_data = __dirname + '/data'
const d_dm_meta = d_data + "/.dm_meta"

if (!fs.existsSync( d_data)){
    fs.mkdirSync(d_data);
    fs.writeFile(d_data, "0\n")
}

let _meta_data = fs.readFileSync(d_dm_meta).toString()
_meta_data = _meta_data.split('\n');
console.log(JSON.stringify(_meta_data));

const _meta = {}
_meta.handles = parseInt(_meta_data[0])

_meta.handles_meta_raw = []
_meta.handles_meta = []

if (_meta.handles > 0) {
    // Removing extra \r\n
    _meta.handles_meta_raw = _meta_data.slice(1, _meta_data.length).map((el) => {
        return el.replace(/(\r\n|\n|\r)/gm, "");
    })

    _meta.handles_meta = _meta.handles_meta_raw.map((line) => {
        line = line.split(" ")

        let json = {}
        json.name = line[0]
        json.meta = line.slice(1, line.length)

        return json;
    })
}


console.log(_meta.handles)
console.log(_meta.handles_meta_raw)
console.log(_meta.handles_meta)

function compare_array(arr1, arr2) {
    if (arr1.length != arr2.length) return false;

    for (let i = 0; i < arr1.length; i++)
        if (!arr2.contains(arr1[i]))
            return false;

    return true;
}

function keys(json) {
    let _keys = [];
    for (let key in json)
        _keys.push(key);
    return _keys;
}

function getdmRaw () {
    let out = _meta.handles;

    for (let i = 0; i < _meta.handles_meta_raw.length; i++) 
        out += '\n' + _meta.handles_meta_raw[i];

    return out;
}

const dm = {};

dm.handleExists = (handle) => {
    let found = _meta.handles_meta.find((json) => {
        return json.name == handle;
    })

    return found;
}

dm.createHandle = (handle, meta) => {

    if (dm.handleExists(handle)) {
        logger.err('Data Handle name already exists');
        return;
    }

    if (!meta) {
        logger.err('Meta data is required');
        return;
    }

    // Check if meta data is Array
    if (meta.constructor !== [].constructor) {
        logger.err('Meta data must be an array: [data_one_name, data_two_name, ...]');
        return;
    }

    let new_handle = {name: '', meta: []};

    new_handle.name = handle;
    new_handle.meta = meta;

    this.handle = new_handle.name;

    let new_handle_raw = new_handle.name + ' ' + new_handle.meta.join(" ")
    _meta.handles_meta_raw.push(new_handle_raw);
    _meta.handles_meta.push(new_handle);
    _meta.handles++;

    console.log(new_handle_raw);

    if (fs.existsSync(`${d_data}/${new_handle.name}.dm`))
        rmDir(`${d_data}/${new_handle.name}.dm`, false);
    else 
        fs.mkdirSync(`${d_data}/${new_handle.name}.dm`);

    fs.writeFile(`${d_data}/${new_handle.name}.dm/.meta`, "0 0", (err) => {
        if (err) throw err;
    })

    fs.writeFile(d_dm_meta, getdmRaw(), (err) => {
        if (err) throw err;
    });
    
}

dm.select = (handle) => {
    if (!handle) {
        logger.err('Empty [handle_name] field');
        return;
    }

    this.handle = handle
}

dm.addData = (data) => {

    let handle = this.handle;

    if (!handle) {
        logger.err('No handle selected');
    }

    if (!dm.handleExists(handle)) {
        logger.err('Data Handle doesnt exist');
        return;
    }

    if (data.constructor != {}.constructor) {
        logger.err('Data must be a JSON Object');
        return;
    }

    let handle_meta = {}
    
    handle_meta.id = (fs.readFileSync(`${d_data}/${handle}.dm/.meta`))[0]
    handle_meta.records = (fs.readFileSync(`${d_data}/${handle}.dm/.meta`))[1]

    let handle_index = d_meta.handles_meta.findIndex((json) => {
        //return line.split(' ')[0] == handle;
        return json.name == handle;
    });

    let meta = keys(data);
    //let handle_meta = []//d_meta.handles_meta[]
    //let handle_meta = JSON.parse(d_meta.handles_meta[handle_index].split(' ')[1]);

    if (!compare_array(handle_meta, meta)) {
        logger.err('The data fields dont match the meta data of handle');
        logger.err('For Handle=' + handle + ' Required data fields: ' + handle_meta);
        return;
    }

    let _data = [];
    for (let i = 0; i < handle_meta.length; i++) {
        _data.push(data[handle_meta[i]]);
    }

    if (!fs.existsSync(__dirname + '/data/' + handle + '.dm')) {
 
    }

}

// CLAUSE: [name]=[value] | [name]=[value] & [name]=[value]
dm.findId = (clause) => {
    
}

dm.getData = (id, data_field) => {
    
}

module.exports = dm