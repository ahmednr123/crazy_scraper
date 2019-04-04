// Data Manager

/*

.dm_meta [FORMAT]
0: [total_handles]
1..n: [handle_name] [handle_meta (with spaces)]

*/

const fs = require('fs');

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

const d_data = '/data'
const d_dm_meta = d_data + "/.dm_meta"

if (!fs.existsSync(__dirname + d_data))
    fs.mkdirSync(__dirname + d_data);

const _meta_data = fs.readFileSync(__dirname + d_dm_meta).split('\n');

const _meta = {}
_meta.handles = _meta_data[0]
_meta.handles_meta_raw = _meta_data.slice(1, _meta.length)

_meta.handles_meta = _meta.handles_meta_raw.map((line) => {
    line = line.split(" ")

    let json = {}
    json.name = line[0]
    json.meta = line.slice(1, line.length)

    return json;//line.split(' ')[0];
})

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

const dm = {};

dm.createHandle = (name, meta) => {

    let found = _meta.handles_meta.find((json) => {
        return json.name == name;
    })

    if (found) {
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

    new_handle.name = name;
    new_handle.meta = meta;

    this.handle_name = new_handle.name;

    let new_handle_raw = new_handle.name + ' ' + new_handle.meta.join(" ")
    _meta.handles_meta_raw.push(new_handle_raw);
    _meta.handles_meta.push(new_handle);

    if (fs.existsSync(`${d_data}/${handle}.dm`))
        rmDir(`${d_data}/${handle}.dm`, false);
    else 
        fs.mkdirSync(`${d_data}/${handle}.dm`);

    fs.writeFile(`${d_data}/${handle}.dm/.meta`, "0 0", (err) => {
        if (err) throw err;
    })

    fs.appendFile(d_dm_meta, '\n' + new_handle_raw, (err) => {
        if (err) throw err;
    });

}

dm.select = (handle) => {
    if (!handle) {
        logger.err('Empty [handle_name] field');
        return;
    }

    this.handle_name = handle
}

dm.addData = (data) => {

    let handle = this.handle;

    if (!handle) {
        logger.err('No handle selected');
    }

    if (!found) {
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
    let handle_meta = d_meta.handles_meta[]
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