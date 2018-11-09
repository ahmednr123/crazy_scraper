// Data Manager

const fs = require('fs');

if (!fs.existsSync(__dirname + '/data'))
    fs.mkdirSync(__dirname + '/data');

const _meta = fs.readFileSync('.dm_meta').split('\n');
const handles_meta = _meta.slice(1, _meta.length);
const handles = handles_meta.map((line) => {
    return line.split(' ')[0];
})

function compare_array(arr1, arr2) {
    if (arr1.length != arr2.length) return false;

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i])
            return false;
    }

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

    let found = handles.find((handle) => {
        return handle == name;
    })

    if (found) {
        logger.err('Data Handle name already exists')
        return;
    }

    if (!meta) {
        logger.err('Meta data is required');
        return;
    }

    if (meta.constructor !== [].constructor) {
        logger.err('Meta data must be an array: [data_one_name, data_two_name, ...]');
        return;
    }

    handles_meta.push(name + ' ' + JSON.stringify(meta));
    handles.push(name);

    fs.writeFile('.dm_meta', handles_meta.join('\n'), (err) => {
        if (err)
            console.log(err);
    });

}

dm.addData = (handle, data) => {
    let found = handles.find((handle) => {
        return handle == name;
    })

    if (!found) {
        logger.err('Data Handle doesnt exist')
        return;
    }

    let handle_index = handles_meta.findIndex((line) => {
        return line.split(' ')[0] == handle
    });

    let meta = keys(data);
    let handle_meta = JSON.parse(handle_meta[handle_index].split(' ')[1]);

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